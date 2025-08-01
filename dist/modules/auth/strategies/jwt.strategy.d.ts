import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        id: string;
        email: string;
    }): Promise<{
        userId: string;
        email: string;
    }>;
}
export {};
