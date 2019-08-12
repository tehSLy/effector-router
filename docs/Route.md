

## `Route` 

Basic unit of effector-router workflow. 

API: 
 + [ `watch` ](#watch) `: (fn: Watcher) => UnwatchCallback` 
 + [ `match` ](#match) `: Store<{matched: boolean, params: any}>` 
 + [ `path` ](#path) `: (...args: any[] | [{}]) => string` 

### `watch` 

Effector native watcher, working exactly as it does in effector usual workflow. Shortcut for `route.match.watch(...)`

#### Example

``` js
	const routes = createRoutes({
	    users: ["/users", {
	        id: "/:id"
	    }]
	});

	const unwatch = routes.users.id.watch(({
	    matched,
	    params
	}) => console.log(matched ? `matching, user id is ${params.id}` : `not matching anymore` ));
```
### `match`

Effector store, containing `Match` data. 
