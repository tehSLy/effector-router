export const normalizePath = (...args: string[]) => {
	return args.filter(exists).join("/").replace(slashes, "/");
}

const exists = (v: any) => !!v;

const slashes = /\/+/g;