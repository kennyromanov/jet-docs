import { nanoid } from 'nanoid';
import { Obj, Storable, Serializable, MaybePromise, Auth, Session, BreakerHandler } from '@/types';
import { BaseError, PotentialLoopWarning } from '@/errors';
import store from '@/pinia/store';


// Third-parties

const appStore = store.useApp();

const cacheStore = store.useCache();


// Constants

export const DEFAULT_STORAGE_PREFIX = 'jetedit';

export const DEFAULT_SESSION_EXPIRATION_PERIOD = 30 * 24 * 60 * 60 * 1000;

export const DEFAULT_TIMEOUT = 30 * 1000;

export const DEFAULT_TICK = 500;


// Classes

export class Storage {
    public static prefix: string = DEFAULT_STORAGE_PREFIX;

    public static fullKey(name: string): string {
        return this.prefix + '__' + name;
    }

    public static shortKey(name: string): string {
        const fullKey = this.fullKey('');

        return name.slice(fullKey.length);
    }

    public static keys(): string[] {
        const prefix = this.fullKey('');
        const fullKeys = Object.keys(localStorage);
        const result: string[] = [];

        for (const fullKey of fullKeys)
            if (fullKey.startsWith(prefix))
                result.push(this.shortKey(fullKey));

        return result;
    }

    public static get(name: string): Storable | null {
        const key = this.fullKey(name);
        let result: Storable | null = localStorage.getItem(key);


        // Doing some checks

        if (!result) return null;


        // If the value is a JSON

        const obj = unserialize(result, false);

        if (obj !== null) return obj;


        // If the value is a number

        const isNum = isNumber(result);

        if (isNum) return Number(result);


        return result;
    }

    public static set(name: string, value: Storable): void {
        const key = this.fullKey(name);
        let result: string = String(value);


        // If the value is an object

        const isObj = isObject(value);

        if (isObj) {
            const obj = serialize(value, false);

            if (isset(obj)) result = obj;
        }


        localStorage.setItem(key, result);
    }

    public static del(name: string): void {
        const key = this.fullKey(name);

        localStorage.removeItem(key);
    }
}

export class Cache {
    public static get(name: string): any {
        return cacheStore.get(name) ?? Storage.get(name);
    }

    public static set(name: string, value: any, keep: boolean = false): void {
        cacheStore.set(name, value);


        // Store the data in ROM immediately

        if (keep) {
            Storage.set(name, value);
            return;
        }


        // Otherwise - move the data to RAM

        Storage.del(name);
    }

    public static del(name: string): void {
        cacheStore.del(name);
        Storage.del(name);
    }

    public static store(value: any, keep: boolean = false): string {
        const id = nanoid();

        this.set(id, value, keep);

        return id;
    }
}


// System Functions

export function audit(val: any): string {
    switch (typeof val) {
        case 'string':
            return `'${val}'`;
        case 'object':
            return JSON.stringify(val);
        default:
            return String(val);
    }
}

export async function auth(val: Auth): Promise<void> {

    // If the auth was not successful

    const isSuccessful = !!val?.isSuccessful;

    if (!isSuccessful) {
        const reason = val?.reason ?? 'Unknown Reason';
        throw new BaseError(`Unable to authenticate: The Sign In failed: ${reason}`);
    }


    // Parsing the login

    const userId = val?.userId ?? null;
    const firstName = val?.username ?? '-';
    const lastName = val?.username ?? '-';
    const fullName = val?.username ?? '-';
    const phone = val?.username ?? null;
    const token = val?.token ?? null;
    const permissions = [ 'documents.view', 'documents.create' ];
    const expiresAt = new Date(time() + DEFAULT_SESSION_EXPIRATION_PERIOD);


    // Doing some checks

    const bad = (param: string) => new BaseError(`TCT: Unable to authenticate: The '${param}' param is not set: ${audit(val)}`);

    if (!userId)
        throw bad('userId');

    if (!phone)
        throw bad('username');

    if (!token)
        throw bad('token');


    // Getting the session

    const session: Session = { userId, firstName, lastName, fullName, phone, token, permissions, expiresAt };


    // Setting the session

    appStore.setSession(session);

    Cache.set('session', session, true);
}


// Checking Functions

export function isNumber(val: any): val is number {
    return !isNaN(val);
}

export function isArray<T>(val: T): val is T & any[] {
    return Array.isArray(val);
}

export function isObject(val: any): boolean {
    return typeof val === 'object' && val !== null;
}

export function isEmpty(val: any[] | object | string): boolean {
    const isEmptyStr = val === '';
    const isEmptyArr = isArray(val) && val.length === 0;
    const isEmptyObj = isObject(val) && Object.keys(val).length === 0;

    return isEmptyStr || isEmptyArr || isEmptyObj;
}


// Framework Functions

export function time(): number {
    return Date.now();
}

export function isset<T>(val: T): val is NonNullable<T> {
    return val !== null && val !== undefined;
}

export function inarr(val: any, ...arr: any): boolean {
    return arr.includes(val);
}

export function has(obj: Obj, key: string): boolean {
    return obj.hasOwnProperty(key);
}

export function matches(arr: any[], arrRef: any[]): boolean {
    for (const item of arrRef)
        if (!arr.includes(item))
            return false;

    return true;
}

export function unslash(path: string): string {
    let result = path;

    if (result?.startsWith('/'))
        result = result.slice(1);

    if (result?.endsWith('/'))
        result = result.slice(0, -1);

    return result;
}

export function slash(path: string): string {
    const result = unslash(path);

    return '/'+result;
}

export function serialize(obj: Storable, logError: boolean = true): string|null {
    let result: string|null = null;

    try {
        result = JSON.stringify(obj);
    } catch (_e: any) {
        if (logError)
            console.error(`Unable to serialize the object: ${audit(obj)}`);
    }

    return result;
}

export function unserialize(val: string, logError: boolean = true): Serializable | null {
    let result: Serializable | null = null;

    try {
        result = JSON.parse(val);
    } catch (_e: any) {
        if (logError)
            console.error(`Unable to unserialize the string: ${audit(val)}`);
    }

    return result;
}

export function base64(val: string): string {
    const array = new TextEncoder().encode(val);
    return btoa(String.fromCharCode(...array));
}

export function encodeBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(String(reader.result));
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

export function decodeBase64(val: string, filename = 'index'): File {
    const [ meta, base64 ] = val?.split(',') ?? '';

    const matches = meta?.match(/data:(.*);base64/);
    const mime = matches ? matches[1] : 'application/octet-stream';

    const bytes = atob(base64);
    const array = Uint8Array.from(bytes, c => c?.charCodeAt(0) ?? 0);


    return new File([ array ], filename, { type: mime });
}

export function ensurePromise<T = any>(val: MaybePromise): () => Promise<T> {
    return new Promise((resolve, reject) => {
        const isAsync = val instanceof Promise;

        if (isAsync)
            val.then(resolve).catch(reject);
        else
            resolve(val);
    }) as any;
}

export function ensureAsync<T = any>(val: any): () => Promise<T> {
    return (...args: any[]) => ensurePromise(val(...args)) as any;
}

export function loop(breaker: BreakerHandler, timeout: number = DEFAULT_TIMEOUT, tick: number = DEFAULT_TICK): Promise<void> {
    return new Promise((resolve, reject) => {
        const end = time() + timeout;

        const wait = setInterval(() => {

            // Doing some checks

            const isTimedOut = time() >= end;

            if (isTimedOut) {
                clearInterval(wait);

                const error = new PotentialLoopWarning('The loop() function has timed out');

                reject(error);
            }


            // Calling the handler

            const result = breaker();
            const isAsync = result instanceof Promise;


            // If the result is async

            if (isAsync) result.then((val) => {
                if (val) resolve();
            });


            // Checking the result

            if (result) {
                clearInterval(wait);
                resolve();
            }
        }, tick);
    });
}


export { nanoid };
