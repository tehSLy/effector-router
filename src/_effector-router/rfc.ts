declare function createSchema<S extends Schema<S>>( schema: S ): Route<S>;
declare function compile<R extends Route<any>>(
	route: R,
	...args: any[]
): string;
declare function compile<R extends Route<any>>( route: R, config: {} ): string;
declare function navigate<R extends Route<any>>(route: R, ...args: any[]): void;

type Route<S> = {
	[key in keyof S]: S[key] extends Tuple<infer U>
	? Route<U>
	: S[key] extends PathObjectConfig<infer D>
	? Route<D>
	: Route<{}>;
};

type PathSegment<S> = Tuple<Schema<S>> | PathObjectConfig<Schema<S>> | string;

type PathObjectConfig<S extends Schema<any>> = {
	exact: boolean;
	nested: S;
	path: string;
};

type Schema<S> = { [key: string]: PathSegment<S> };

type Tuple<S extends Schema<any>> = [string, S];

const foo = createSchema( {
	bar: [
		"123",
		{
			baz: {
				exact: true,
				path: "2134",
				nested: {
					id: ":id",
					about: [
						"about",
						{
							help: "help!"
						}
					]
				}
			}
		}
	]
} );

const routes = createSchema({
	users: ["users", {
		show: "show/:id",
		friends: "friends/:id",
		chat: "chat/:id"
	}],
	products: ["products", {
		show: "show/:id",
		list: "list",
		edit: "edit/:id",
		create: "add"
	}],
	settings: "settings",
	login: "login",
	logout: "logout"
});

navigate(routes.products.edit, {id: 2})
navigate(routes.users.show, 3);
navigate(routes.users);

























compile( foo.bar.baz.id, {
	id: 1
} ); // -> 123/2134/1

compile( foo.bar.baz.id, {
	name: 1
} ); // -> Error: no specified key `name` in route, available keys: id

compile( foo.bar.baz.id, 1 ); // -> 123/2134/1

/*
//provide api to compose routes

const userRoutes = createSchema({
	show: "show/:id",
	edit: "edit/:id",
	friends: "friends/:id"
})

const productsRoutes = createSchema({
	show: "show/:id",
	buy: "buy/:id"
})

const appRoutes = createSchema({
	users: ["users", userRoutes],
	product: ["products", productRoutes]
})

compile(appRoutes.users.show, 1) // -> users/show/1

*/

/*
 breadcrumbs:
 createBC([
	 [foo, "Foo"],
	 [foo.bar, "Bar menu"],
	 ["foo.bar.baz.id", "Viewing some stuff"]
	 // (Notice the abcense of foo.bar.baz breadcrumb name)
 ])

 mount of `foo.bar.baz.id` with id of 10 -> ["Foo", "Bar menu", "Viewing some stuff"]
*/