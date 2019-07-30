import { History, Location, Action, Search, createBrowserHistory } from "history";
import { createStore, createEvent, restore, split, Store } from "effector";
import { sampleTo } from "./sampleTo";
import { createMatcher } from "./createMatcher";

type LocationChanged = {
	location: Location;
	action: Action;
}

type PathInfo = {
	path: string;
}

export type Router = ReturnType<typeof createRouter>

export const createRouter = (history: History = createBrowserHistory()) => {
	const historyChanged = createEvent<LocationChanged>();
	history.listen((location, action) => historyChanged({action, location}));

	const locationChanged = historyChanged.map(({location}) => location);
	const pathChanged = locationChanged.map(({pathname}) => pathname)

	const location = restore(locationChanged, history.location);
	const path = location.map(({pathname}) => pathname);

	const pushLocation = createEvent<Location>();
	pushLocation.watch(history.push);
	
	const pushPath = sampleTo(location, (location, pathname: string) => ({...location, pathname}), pushLocation);
	const pushSearch = sampleTo(location, (location, search: Search) => ({...location, search}), pushLocation);

	const match = (template: string) => {
		const matcher = createMatcher(template);
		return path.map(matcher);
	}

	return {
		location,
		pushPath,
		pushSearch,
		match,
		history,
		path
	}
};
