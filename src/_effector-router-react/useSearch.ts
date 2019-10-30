import { useStore } from "effector-react";
import { getInstance } from "../_effector-router/getInstance";

export function useSearch<S>(): S {
  return useStore(getInstance().$search as any);
}
