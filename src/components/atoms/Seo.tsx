import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'

export default function Seo({
  title,
  description,
  uri
}: {
  title?: string
  description?: string
  uri: string
}): ReactElement {
  const { siteTitle, siteTagline, siteUrl, siteImage } = useSiteMetadata()

  // Remove trailing slash from all URLs
  const canonical = `${siteUrl}${uri}`.replace(/\/$/, '')

  const titleTemplate = uri === '/' ? siteTitle : `%s — ${siteTitle}`

  return (
    <Helmet
      defaultTitle={`${siteTitle} — ${siteTagline}`}
      titleTemplate={titleTemplate}
      title={title}
    >
      <html lang="en" />

      <link rel="canonical" href={canonical} />

      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta
        name="image"
        content={`${siteUrl}${siteImage.childImageSharp.original.src}`}
      />
      <meta
        property="og:image"
        content={`${siteUrl}${siteImage.childImageSharp.original.src}`}
      />

      <meta property="og:site_name" content={siteTitle} />
      <meta name="twitter:site" content="@deltaDAO" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
