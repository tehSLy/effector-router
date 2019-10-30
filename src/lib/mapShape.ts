import { Store } from "effector";

export const mapShape = <S, R extends { [key: string]: (s: S) => any }>(
  $store: Store<S>,
  shape: R
): { [key in keyof R]: Store<ReturnType<R[key]>> } => {
  const result: any = {};

  for (const key in shape) {
    const mapper = shape[key];
    result[key] = $store.map(mapper);
  }

  return result;
};
