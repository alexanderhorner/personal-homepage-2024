import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProseArticleModal } from '~/components/ProseArticleModal'
import { getArticleById, getArticleMetadataById } from '~/content/articles'
import { MetaBaseTitle, MetaDefaultOgImage } from '~/lib/site-metadata'
import { getOpengraphMetaTags } from '~/utils/getOpengraphMetaTags'

export const Route = createFileRoute('/$articleId')({
  loader: ({ params }) => {
    const article = getArticleMetadataById(params.articleId)

    if (!article) {
      throw notFound()
    }

    return article
  },
  component: ArticleRoute,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }

    return {
      meta: [
        { title: `${loaderData.title} - ${MetaBaseTitle}` },
        ...getOpengraphMetaTags(
          `https://alexander-horner.com/${loaderData.id}`,
          loaderData.title,
          loaderData.description,
          loaderData.img ?? MetaDefaultOgImage,
        ),
      ],
    }
  },
})

function ArticleRoute() {
  const { articleId } = Route.useParams()
  const article = getArticleById(articleId)

  if (!article) {
    throw notFound()
  }

  const ArticleContent = article.Component

  return (
    <ProseArticleModal>
      <ArticleContent />
    </ProseArticleModal>
  )
}
