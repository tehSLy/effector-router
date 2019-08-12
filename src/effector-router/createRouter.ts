import { History, Location, Action, Search, createBrowserHistory, LocationDescriptorObject } from "history";
import { createStore, createEvent, restore, split, Store } from "effector";
import { sampleTo } from "./sampleTo";
import { createMatcher } from "./createMatcher";

type LocationChanged = {
	location: Location;
	action: Action;
}

export type Router = ReturnType<typeof createRouter>

export const createRouter = (history: History = createBrowserHistory()) => {
	const historyChanged = createEvent<LocationChanged>();
	history.listen((location, action) => historyChanged({action, location}));

	const locationChanged = historyChanged.map(({location}) => location);

	const location = restore(locationChanged, history.location);
	const path = location.map(({pathname}) => pathname);

	function push(obj: LocationDescriptorObject): any
	function push(): any{

	}

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
