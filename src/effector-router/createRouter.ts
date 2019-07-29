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

export const createRouter = (history: History = createBrowserHistory()) => {
	const historyChanged = createEvent<LocationChanged>();
	history.listen((location, action) => historyChanged({action, location}));

	const locationChanged = historyChanged.map(({location}) => location);
	const pathChanged = locationChanged.map(({pathname}) => pathname)
	const location = restore(locationChanged, history.location);
	const path = location.map(({pathname}) => pathname);

	const pushLocation = createEvent<Location>();
	const pushPath = sampleTo(location, (location, pathname: string) => ({...location, pathname}), pushLocation);
	const pushSearch = sampleTo(location, (location, search: Search) => ({...location, search}), pushLocation);

	const match = (template: string) => {
		const matcher = createMatcher(template);
		return path.map(matcher);
	}

	const createRoutes = <K extends keyof S, S extends {[key: string]: PathInfo}>(schema: S) => {
		const pattern: any = {};
		for(const key in schema){
			const pathInfo = schema[key];
			const matcher = createMatcher(pathInfo.path);
			const mapped = path.map((path) => {
				const result = matcher(path);
				return result.matched ? result : {matched: false, params: null};
			})

			pattern[key] = mapped
		}

		return pattern as {[key in K]: Store<{matched: boolean, params: {}}>};
	}

	return {
		location,
		pushPath,
		pushSearch,
		match,
		createRoutes
	}
};
