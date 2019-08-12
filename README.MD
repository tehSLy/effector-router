## Effector-Router
### Manage routing state with ease!

Provides convinient API on top of `effector` state-manager.
Feautures:
 + Nested routes
 + Exact matches
 + Named Parameters
 + Unnamed Parameters
 + Parameters modifiers
 + Custom Parameters matching
 + Implicit router included

Roadmap:
 + 404
 + SSR Tests


### API

#### `Route`
```js
type Route = {
	watch(): UnregisterCallback
	path(...args: any[] | {}): string
	match
	matcher
	normalizedPath
	// + nested routes keys
}
```

#### `createRouter(history?: History) => Router`
This method creates router - root abstraction on routing. It provides API for history management, and reacting on history change events.
It's fully optional, to explicitly define router!

```js
	const router = createRouter();
	const route = router.match("/contacts/:id"); // => Store<{match: boolean; params: {}}>
	route.watch(console.log);

	router.pushPath("/contacts/123"); 
		// => {match: true, params: {id: 123}}


```

#### `createRoutes(schema: RoutesSchema, router?: Router) => RoutesObject`

```js
	const router = createRouter();

	const routes = createRoutes({
		about: "/about",
		contacts: ["/contacts", { //refers to `/contacts`, non-exact (matches `/contacts/123`)
			id: "/:id" //refers to `/contacts/:id`,
			add: "/add", //refers to `/contacts/add`
			help: "/help" //refers to `/contacts/help`
		}],
		products: {//refers to `/products`, exact match (doesnt match `/products/123`)
			exact: true,
			path: "/products",
			nested: {
				id: "/:id", //refers to `/products/:id`
				help: ["/help", { //refers to `/products/help`
					section: "/:section" //refers to `/products/help/:section`
				}]
			}
		}
	}, router);

	const unwatchProducts = routes.products.watch(console.log);

	router.pushPath(routes.products.id.path(12))
		 // => `/products/12`
		 // => {matched: false, params: {}}
		
	router.pushPath(routes.products.path())
		 // => `/products/`
		 // => {matched: true, params: {}}
	unwatchProducts();

	const unwatchContacts = routes.contacts.watch(console.log);
	router.pushPath(routes.contacts.help.path())
```