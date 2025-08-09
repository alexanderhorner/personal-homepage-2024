declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const id: string;
  export const img: string;
  export const title: string;
  export const description: string;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
