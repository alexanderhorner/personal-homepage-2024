import { createFileRoute } from '@tanstack/react-router'
import ModernArchitecture from '~/assets/images/modern-architecture.jpg'
import WebsiteScreenshotOg from '~/assets/images/alexander-horner-com-og-1200.jpg'
import { MetaBaseTitle, MetaDefaultDescription } from '~/lib/site-metadata'
import { getOpengraphMetaTags } from '~/utils/getOpengraphMetaTags'

export const Route = createFileRoute('/')({
  component: () => null,
  head: () => {
    const currentUrl = 'https://alexander-horner.com/'

    return {
      meta: [
        { title: MetaBaseTitle },
        { name: 'description', content: MetaDefaultDescription },
        ...getOpengraphMetaTags(currentUrl, MetaBaseTitle, MetaDefaultDescription, WebsiteScreenshotOg),
      ],
      links: [{ rel: 'preload', href: ModernArchitecture, as: 'image' }],
    }
  },
})
