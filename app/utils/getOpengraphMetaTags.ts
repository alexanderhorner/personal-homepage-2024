export const getOpengraphMetaTags = (url: string, title: string, description: string, imgUrl: string) => {
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imgUrl },
    { property: "og:type", content: "website" }
  ];
}