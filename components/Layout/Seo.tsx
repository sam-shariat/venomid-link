import React from 'react'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SOCIAL_TWITTER, TWITTER_URL } from 'core/utils/constants'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  const origin = SITE_URL;
  return (
    <DefaultSeo
      title={SITE_TITLE}
      defaultTitle={SITE_TITLE}
      titleTemplate={`%s | ${SITE_TITLE}`}
      description={SITE_DESCRIPTION}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={550}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: origin,
        images: [
          {
            url: `${origin}/origin.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${TWITTER_URL +SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
    />
  )
}
