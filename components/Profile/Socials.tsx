import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { LinkIcon } from 'components/logos';
import { socialsArrayAtom } from 'core/atoms';
import SocialLink from './SocialLink';
import { capFirstLetter, getIconColor, withHttps } from 'core/utils';
import { ObjectItem } from 'types';
import AnimateScale from 'components/animate/AnimateScale';

interface Props {
  json: any;
  color?: string;
  title?: string;
  onlyIcons?: boolean;
}

export default function Socials({ json, color, onlyIcons, title }: Props) {
  const [socialsArray, setSocialsArray] = useState<ObjectItem[]>([]);
  const _onlyIcons = onlyIcons ? onlyIcons : false;

  useEffect(() => {
    let _socials: ObjectItem[] = [];
    for (const k in json.socials) {
      json.socials[k] && _socials.push({ key: k, value: json.socials[k] });
    }

    if (_socials.length !== socialsArray.length) {
      // console.log(_socials);
      setSocialsArray(_socials);
    }
    // console.log(_socials);
  }, []);

  return (
    <>
      <Flex flexDirection={_onlyIcons ? 'row' : 'column'} gap={2}>
        {socialsArray.map(
          (item,ind) =>
            item.key && (
              <AnimateScale delay={(ind * 0.2) + 1}>
              <SocialLink
                key={`item-${item.key}-${title}`}
                title={capFirstLetter(item.key)}
                onlyIcon={_onlyIcons}
                color={color ? color : undefined}
                url={String(item.value)}
              />
              </AnimateScale>
            )
        )}
      </Flex>
    </>
  );
}
