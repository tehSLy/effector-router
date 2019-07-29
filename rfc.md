Usage with React

```js
	const [matched, params] = useRoute(routes.main);
```


Routes definition
```ts
	type RouteInfo = string | {
		path: string;
		nested?: RouteInfo;
	}


	{
		main: {
			path: "/main",
			nested: {
				login: {
					path: "/login", // => /main/login,
				},

			}
		},
		about: "/about",
		contacts: {
			path: "/contacts",
			nested: {
				id: "/:id", // => /contacts/:id,

			},
			filter: $user.map(({isLogged}) => isLogged) //
		}
	}
```

Routes methods and properties
```jsx
	type Match = {
		matched: boolean;
		params: {}
	}

	type Watcher = (match: Match) => any

	type Route = {
		watch(watcher: Watcher): UnregisterCallback;
		path: string;

		compile(param: string): string; // path = "commits/:author/:id" => compile(1) => "commits/1/:id"
		compile(...args: string[]): string; // path = "commits/:author/:id" => compile(1, 2) => "commits/1/2"
		compile(params: {}): string; // path = "commits/:author/:id" => compile({id: 123, author: 321}) => "commits/321/123"
	}


	<Link to={routes.contacts.compile(id)}></Link>
```