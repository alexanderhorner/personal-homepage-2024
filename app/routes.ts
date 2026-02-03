import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_home-layout.tsx", [
    index("routes/_home-layout._index.tsx"),
    route(":articleID", "routes/_home-layout.$articleID.tsx"),
  ]),
];
