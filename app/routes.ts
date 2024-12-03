import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/HomeLayout.tsx", [
    index("routes/HomeIndex.tsx"),
    route(":articleID", "routes/ArticlePage.tsx"),
  ]),
] satisfies RouteConfig;
