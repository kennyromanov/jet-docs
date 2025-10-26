
// Base Errors

export class BaseThrowable extends Error {
    public name = 'BaseThrowable';

    constructor(message: string, stack: string|null = null) {
        super(message);
        if (stack) this.stack = stack;
    }
}

export class BaseError extends BaseThrowable {
    public name = 'BaseError';
}

export class BaseWarning extends BaseThrowable {
    public name = 'BaseWarning';
}


// Loop Errors

export class LoopWarning extends BaseWarning {
    public name = 'LoopWarning';
}

export class PotentialLoopWarning extends LoopWarning {
    public name = 'PotentialLoopWarning';
}
