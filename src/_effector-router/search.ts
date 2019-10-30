import { getInstance } from "./getInstance";

export const setSearch = (search: any) => {
  return getInstance().setSearch(search);
};
