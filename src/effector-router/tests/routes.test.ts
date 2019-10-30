import { createRouter } from "../createRouter";
import { createRoutes } from "../createRoutes";

it("doing some stuff", () => {
  const router = createRouter();
  const routes = createRoutes(
    {
      path: ["path", {}]
    },
    router
  );

  router.pushPath(routes.path.path());
});
