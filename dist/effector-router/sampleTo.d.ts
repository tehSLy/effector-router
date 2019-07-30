import { Unit } from "effector";
export declare function sampleTo<S, R>(source: Unit<S>, target: Unit<R>): any;
export declare function sampleTo<S, A, R>(source: Unit<S>, handler: (s: S, arg: A) => R, target?: Unit<R>): any;
