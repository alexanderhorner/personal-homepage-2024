declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export const id: string;
  export const title: string;
  export const description: string;
  export const img: string | null;
  export default MDXComponent;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpeg' { const src: string; export default src; }
