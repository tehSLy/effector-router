import { createEvent, Event, restore, Store } from "effector";
import { History, Location } from "history";
import { mapShape } from "../lib/mapShape";
import { setInstance } from "./getInstance";
import { routes } from "./routesMap";

export type Router = {
  $search: Store<object>;
  $path: Store<string>;
  navigate: Event<NavigateMeta>;
  setSearch: Event<any>;
};

export type NavigateMeta = {
  route: Route<any>;
  args: any[];
  search: any;
};

export const createRouter = (history: History): Router => {
  const locationChanged = createEvent<Location>();
  history.listen(locationChanged);

  const $location = restore(locationChanged, history.location);
  const { $path, $searchString } = mapShape($location, {
    $path: ({ pathname }) => pathname,
    $searchString: ({ search }) => search
  });

  const $search = $searchString.map(searchToObject);
  const navigate = createEvent<NavigateMeta>();

  navigate.watch(({ route, args, search }) => {
    const info = routes.get(route);
    if (!info) {
      throw new Error("Unable to resolve route to navigate");
    }

    const pathname = info.compile(args);

    history.push({
      pathname,
      search
    });
  });

  const setSearch = createEvent<any>();
  setSearch.watch(search =>
    history.push({ search: String(new URLSearchParams(search)) })
  );

  return { $search, $path, navigate, setSearch };
};

const searchToObject = (search: string) => {
  const searchInstance = new URLSearchParams(search);

  return [...searchInstance.keys()].reduce((carry: any, key) => {
    carry[key] = searchInstance.get(key);
    return carry;
  }, {});
};

export const initRouter = (history: History) => {
  setInstance(createRouter(history));
};
