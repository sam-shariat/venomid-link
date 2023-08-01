import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { SocialIcon } from 'components/logos';
import { socialsArrayAtom } from 'core/atoms';
import SocialLink from './SocialLink';
import { capFirstLetter, withHttps } from 'core/utils';
import { ObjectItem } from 'types';

interface Props {
  json: any;
}

export default function Socials({ json }: Props) {
  const [socialsArray, setSocialsArray] = useAtom(socialsArrayAtom);

  useEffect(() => {
    let _socials: ObjectItem[] = [];
    for (const key in json.socials) {
      json.socials[key] && _socials.push({ key: key, value: json.socials[key] });
    }
    console.log(_socials);
    setSocialsArray(_socials);
  }, [json]);

  return (
    <>
      <Stack my={2}>

        {socialsArray.map(
          (item) =>
            item.key && (
              
                <SocialLink
                  key={`item-${item.key}`}
                  icon={<SocialIcon line={json.lineIcons} name={item.key} />}
                  title={capFirstLetter(item.key)}
                  url={item.key === 'email' ? 'mailto:'+String(item.value) : item.key === 'phone' ? 'tel://'+String(item.value) : withHttps(String(item.value))}
                />
              
            )
        )}
      </Stack>
    </>
  );
}
