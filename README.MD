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
 + 


### API

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
			id: "/:id" //refers to `/contacts/:id`
		}],
		products: {//refers to `/products`, exact match (doesnt match `/products`)
			exact: true,
			path: "/products",
			nested: {
				id: "/:id", //refers to `/products/help/:id`
				help: ["/help", { //refers to `/products/help`
					section: "/:section" //refers to `/products/help/:section`
				}]
			}
		}
	}, router);

	const unwatchProducts = routes.products.watch(console.log);

	router.pushPath(routes.products.help.path())
		 // => {matched: false, params: {}}
		
	router.pushPath(routes.products.path())
		 // => {matched: true, params: {}}
	unwatchProducts();

	const unwatchContacts = routes.contacts.watch(console.log);
	router.pushPath(routes.contacts.help.path())
```