import React from 'react';
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_TWITTER,
  SITE_FULL_DESCRIPTION,
} from 'core/utils/constants';
import { DefaultSeo } from 'next-seo';

export function Seo() {
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;
  const href =
    typeof window !== 'undefined' && window.location.href ? window.location.href : SITE_URL;
  return (
    <DefaultSeo
      defaultTitle={SITE_TITLE}
      titleTemplate={`%s | ${SITE_DESCRIPTION}`}
      description={SITE_FULL_DESCRIPTION}
      canonical={href}
      themeColor={'#101212'}
      defaultOpenGraphImageWidth={512}
      defaultOpenGraphImageHeight={512}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: origin,
        description: SITE_FULL_DESCRIPTION,
        defaultImageHeight: 512,
        defaultImageWidth: 512,
        title: SITE_TITLE,
        images: [
          {
            url: `${SITE_URL}logos/vid.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
            width: 512,
            height: 512,
            secureUrl: SITE_URL + 'logos/vid.png',
          },
          {
            url: `${SITE_URL}vidog.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
            width: 1200,
            height: 600,
            secureUrl: SITE_URL + 'vidog.png',
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
          sizes: '76x76',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
    />
  );
}
