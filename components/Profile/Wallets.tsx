import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { LinkIcon } from 'components/logos';
import {
  addressAtom,
  walletsArrayAtom,
} from 'core/atoms';
import WalletLink from './WalletLink';
import { capFirstLetter } from 'core/utils';
import { ObjectItem } from 'types';

interface Props {
  json: any;
  color?: string;
  onlyIcons?: boolean;
}

export default function Wallets({ json, color, onlyIcons }: Props) {
  const [walletsArray, setWalletsArray] = useAtom(walletsArrayAtom);
  const _onlyIcons = onlyIcons ? onlyIcons : false;
  const venom = useAtomValue(addressAtom)

  useEffect(() => {
    let _wallets: ObjectItem[] = [];
    for (const key in json.wallets) {
      json.wallets[key] && _wallets.push({ key: key, value: json.wallets[key] });
    }

    if (_wallets.length === 0) {
      _wallets.push({ key: 'venom', value: venom });
    }

    if (_wallets.length !== walletsArray.length) {
      // console.log(_wallets);
      setWalletsArray(_wallets);
    }
    // console.log(_wallets);
  }, []);

  return (
    <>
      <Flex my={2} flexDirection={_onlyIcons ? 'row' : 'column'} gap={2} w={'100%'}>
        {walletsArray.map(
          (item) =>
            item.key && (
              <WalletLink
                key={`item-${item.key}`}
                title={capFirstLetter(item.key)}
                onlyIcon={_onlyIcons}
                color={color ? color : undefined}
                url={String(item.value)}
              />
            )
        )}
      </Flex>
    </>
  );
}
