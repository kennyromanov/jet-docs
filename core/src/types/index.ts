import { PropType } from 'vue';


// Base Data Types

export type Xml = string;

export type Obj<T = any> = Record<string, T>;

export type Serializable = Obj | any[];

export type Storable = string | number | Serializable | null;

export type Nullable<T> = T | null | undefined;

export type NullablePropType<T> = PropType<T | null | undefined>;


// Base System Types

export type Constructor<T = object> = new (..._args: any[]) => T;

export type MaybePromise<T = any> = T | Promise<T>;


// Base Callable Types

export type Loader<T = any> = () => MaybePromise<T>;

export type BreakerHandler = () => MaybePromise<boolean>;


// Specific Data Types

export type Country = 'us' | 'kz' | 'ru' | 'uz' | string;

export type Locale = 'en-US' | 'kk-KZ' | 'ru-RU' | 'uz-UZ';

export type AuthFailReason = 'incorrectCredentials' | 'unknown';


// Specific Struct Types

export type Auth = {
    isSuccessful: boolean,
    userId?: Nullable<string>,
    username?: Nullable<string>,
    token?: Nullable<string>,
    reason?: Nullable<AuthFailReason>,
};

export type Session = {
    userId: string,
    firstName: string,
    lastName: string,
    fullName: string,
    phone: string,
    token: string,
    permissions: string[],
    expiresAt: Date,
};
