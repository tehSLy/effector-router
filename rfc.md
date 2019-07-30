Usage with React

```js
  const [matched, params] = useRoute(routes.main);
```


Routes definition
```ts
  type RouteInfo = string | [string, {}]


	//new RFC
  {
    main: "/main",
    contacts: ["/contacts", {
		 id: "/:id"
	 }]
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

3 ways of router definition:
 + No definition (Singletone instance will be used)
 + Define with Provider component (router from context will be used)
 + Define directly in hooks (router from argument will be used)


Hook usage with `Route` 
```js
	const paths = createRoutes({
		contacts: {
			path: "/contacts",
			nested: {

			}
		}
		users: "/users",

	})

	const Component = () => {
		const [match, params] = useRoute(paths.contacts)

		//...
	}
```

```js
	const Component = () => {
		const [match, params] = useRoute(paths.contacts)

		//...
	}
```