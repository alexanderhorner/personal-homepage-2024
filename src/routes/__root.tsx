import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
import { useState } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '~/global.css'
import { ScrollLockContext } from '~/scrollLockContext'
import { HomePage } from '~/components/HomePage'

config.autoAddCss = false

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
})

function RootComponent() {
  const [scrollLock, setScrollLock] = useState(false)

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className={`font-sans text-gray-900 ${scrollLock ? 'overflow-hidden' : ''}`}>
        <ScrollLockContext.Provider value={{ scrollLock, setScrollLock }}>
          <HomePage />
          <Outlet />
        </ScrollLockContext.Provider>
        <Scripts />
      </body>
    </html>
  )
}
