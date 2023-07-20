import React from 'react'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SOCIAL_TWITTER, SITE_FULL_DESCRIPTION } from 'core/utils/constants'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;
  return (
    <DefaultSeo
      title={SITE_TITLE}
      defaultTitle={SITE_TITLE}
      titleTemplate={`%s | ${SITE_DESCRIPTION}`}
      description={SITE_FULL_DESCRIPTION}
      canonical={origin}
      themeColor={'#101212'}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={600}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: origin,
        description: SITE_FULL_DESCRIPTION,
        defaultImageHeight:600,
        defaultImageWidth:1200,
        title:SITE_TITLE,
        images: [
          {
            url: `${origin}/vidog.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `/logos/vidicon.png`,
        },
        {
          rel: 'apple-touch-icon',
          href: `/logos/vidicon.png`,
          sizes: '76x76'
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
      ]}
    />
  )
}
