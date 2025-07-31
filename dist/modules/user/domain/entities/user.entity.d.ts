export declare class User {
    readonly name: string;
    readonly email: string;
    private _password;
    readonly id?: number | undefined;
    constructor(name: string, email: string, _password: string, id?: number | undefined);
    isPasswordValid(password: string): boolean;
    get password(): string;
}
