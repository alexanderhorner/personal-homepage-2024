import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, json, useParams } from "@remix-run/react";
import { i } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { ProseArticleModal } from "~/components/ProseArticleModal";
import { articles } from "~/content/articles";
import { MetaBaseTitle, MetaDefaultOgImage } from "./_home-layout";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { articleID } = params;

  if (!articleID) {
    throw new Error("No articleID provided");
  }

  const articleUrl = new URL(request.url)

  try {
    getArticle(articleID);
  } catch (error) {
    if (error === ArticleNotFoundError) {
      throw json("Article Not Found", { status: 404 });
    } else {
      throw error;
    }
  }

  return json({ articleUrl });
};

const ArticleNotFoundError = new Error("Article Not Found");

const getArticle = (articleID: string) => {
  const article = articles.find((p) => p.id === articleID);

  if (!article) {
    throw ArticleNotFoundError
  }

  return article;
}

const useArticle = () => {
  const { articleID } = useParams();

  if (!articleID) {
    throw new Error("No articleID provided");
  }

  const article = getArticle(articleID);

  return article;
}

export default function ProjectThisPortfolio() {
  const { default: ArticleContent } = useArticle();
  
  return (
    <ProseArticleModal>
      <ArticleContent />
    </ProseArticleModal>
  )
}


export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  if (!data) {
    throw new Error("No data provided");
  }

  const { articleUrl } = data;

  const { articleID } = params;

  if (!articleID) {
    throw new Error("No articleID provided");
  }

  const { title, description, img } = getArticle(articleID);

  const ogImage = img ? [
    { property: "og:image", content: new URL(img, articleUrl) },
  ] : [
    { property: "og:image", content: new URL(MetaDefaultOgImage, articleUrl) },
  ];


  return [
    { title: `${title} - ${MetaBaseTitle}` },
    { name: "description", content: description },
    ...ogImage,
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: articleUrl },
  ];
};
