import { createEvent, Event, sample, Unit } from "effector";

export function sampleTo<S, R>(source: Unit<S>, target: Unit<R>): Event<R>;
export function sampleTo<S, A, R>(
  source: Unit<S>,
  handler: (s: S, arg: A) => R,
  target?: Unit<R>
): Event<A>;
export function sampleTo<S, R>(source: any, fn: any, target?: any) {
  const clock = createEvent();
  sample({ target, clock, source, fn });
  return clock;
}
