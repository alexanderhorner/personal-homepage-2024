declare module "*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export default Component;

  export const id: string;
  export const title: string;
  export const description: string;
  export const date: string | undefined;
  export const img: string | null | undefined;
}
