import Link from './Link';
import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { SocialIcon } from 'components/logos';
import { linksArrayAtom } from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { CustomLink } from 'types';

interface Props {
  json: any;
}

export default function Links({ json }: Props) {
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);

  useEffect(() => {
    let _links: CustomLink[] = [];
    if (json?.links) {
      json?.links.map((link:CustomLink) => {
        _links.push({
          type: link.type,
          title: link.title,
          url: link.url,
          image: link.image,
          content: link.content,
        });
      });
    }
    setLinksArray(_links);
  }, [json]);

  return (
    <>
      <Stack my={10} gap={2}>
        {linksArray.map((item, index) => (
          <Link
            key={`item-${item.type}-${item.title}`}
            title={capFirstLetter(item.title)}
            url={String(item.url)}
            type={item.type}
            image={item.image}
            content={item.content}
          />
        ))}
      </Stack>
    </>
  );
}
