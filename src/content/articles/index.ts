import type { ComponentType } from 'react'
import * as ThisPortfolio from './this-portfolio.mdx'
import * as Portfolio2022 from './portfolio-2022.mdx'
import * as WggHomepage from './wgg-homepage.mdx'
import * as DentistryHomepage from './dentistry-homepage.mdx'
import * as InteractiveEducation from './interactive-education.mdx'
import * as Resume from './resume.mdx'
import * as AboutMe from './about-me.mdx'
import * as AiNovelViewSynthesis from './ai-novel-view-synthesis.mdx'
import * as Privacy from './privacy.mdx'

interface ArticleModule {
  default: ComponentType
  id: string
  title: string
  description: string
  img: string | null
}

function defineArticle(article: ArticleModule) {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    img: article.img,
    Component: article.default,
  }
}

export const projects = [
  defineArticle(ThisPortfolio as ArticleModule),
  defineArticle(AiNovelViewSynthesis as ArticleModule),
  defineArticle(WggHomepage as ArticleModule),
  defineArticle(Portfolio2022 as ArticleModule),
  defineArticle(DentistryHomepage as ArticleModule),
  defineArticle(InteractiveEducation as ArticleModule),
] as const

export const articles = [
  ...projects,
  defineArticle(Resume as ArticleModule),
  defineArticle(AboutMe as ArticleModule),
  defineArticle(Privacy as ArticleModule),
]

export function getArticleById(articleId: string) {
  return articles.find((article) => article.id === articleId)
}

export function getArticleMetadataById(articleId: string) {
  const article = getArticleById(articleId)

  if (!article) {
    return undefined
  }

  return {
    id: article.id,
    title: article.title,
    description: article.description,
    img: article.img,
  }
}
