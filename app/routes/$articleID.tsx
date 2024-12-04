import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, json, useParams } from "@remix-run/react";
import { articles } from "~/content/articles";
import { getOpengraphMetaTags } from "~/utils/getOpengraphMetaTags";
import { MetaBaseTitle, MetaDefaultOgImage } from "./_index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

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

const Header = () => {
  return (
    <div className="sticky inset-0 bottom-auto h-20 article-header">
      <div className="flex items-center justify-left gap-4 px-5 py-6 md:px-6 lg:px-8">
        
        <Link to="/" className="text-orange-600 mr-auto font-display font-medium drop-shadow-sm text-shadow-for-visibility">
          Alexander Horner
        </Link>
        
        <Link 
          to="https://www.linkedin.com/in/alexander-horner-5ba3a31a0"
          aria-label="LinkedIn of Alexander Horner" 
          className="text-gray-800 transition-opacity hover:opacity-60 text-2xl w-7 h-7 grid place-items-center"
        >
          <FontAwesomeIcon icon={faLinkedin} className=""/>
          {/* LinkedIn */}
        </Link>

        <Link 
          to="https://github.com/alexanderhorner"
          aria-label="GitHub of Alexander Horner"
          className="text-gray-800 transition-opacity hover:opacity-60 text-2xl w-7 h-7 grid place-items-center"
        >
          <FontAwesomeIcon icon={faGithub} className=""/>
          {/* GitHub */}
        </Link>

      </div>
    </div>
  )
}

export default function ArticlePage() {
  const { default: ArticleContent } = useArticle();
  
  return (
    <div>
      <Header/>
      <div className="prose prose-orange md:prose-lg p-12">
        <ArticleContent />
      </div>
    </div>
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

  const ogImageUrl = img ? new URL(img, articleUrl) : new URL(MetaDefaultOgImage, articleUrl)


  return [
    { title: `${title} - ${MetaBaseTitle}` },
    ...getOpengraphMetaTags(articleUrl, title, description, ogImageUrl.toString()),
  ];
};
