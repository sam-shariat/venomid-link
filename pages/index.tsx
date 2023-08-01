import type { NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import { CollectionContract } from 'abi/CollectionContract';
import React, { useEffect, useState, useContext } from 'react';
import {
  Button,
  Container,
  Heading,
  Text,
  Flex,
  useMediaQuery,
  Center,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { VenomFoundation, BTC, ETH } from 'components/logos';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar, Socials } from 'components/Profile';
import {
  BTCSCAN_ADDRESS,
  ETHERSCAN_ADDRESS,
  SITE_DESCRIPTION,
  SITE_TITLE,
  VENOMSCAN_NFT,
  CONTRACT_ADDRESS,
  SITE_URL,
} from 'core/utils/constants';
import Links from 'components/Profile/Links';

interface Attribute {
  trait_type: string;
  value: string;
}

const LinkPage: NextPage = () => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;

  const [json, setJson] = useState({
    name: '',
    venomAddress: '',
    btcAddress: '',
    ethAddress: '',
    bio: '',
    avatar: '',
    socials: {},
    lineIcons: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  async function getInfoByName(_name: string) {
    try {
      //const res = await axios.get(SITE_PROFILE_URL + 'api/name/?name=' + _name);
      return await fetch('/api/name/?name=' + _name)
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          return (
            'https://ipfs.io/ipfs/' +
            jsonData.nftJson.attributes?.find((att: Attribute) => att.trait_type === 'DATA')?.value
          );
        });
    } catch (e) {
      console.log('error loading name');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getProfileJson() {
      setIsLoading(true);
      const jsonUrl = await getInfoByName('venomid');
      console.log(jsonUrl);
      try {
        const res = await axios.get(String(jsonUrl));
        setJson(res.data);
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log('error getting json file');
        setIsLoading(false);
      }
    }
    getProfileJson();
  }, []);
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${origin}/vidog.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      <Container
        as="main"
        maxW="container.sm"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="95vh">
        {!isLoading ? (
          <>
            <Avatar url={json.avatar} alt={json.name + 'avatar image'} />
            <Heading fontWeight="bold" fontSize="2xl" mt={2}>
              {json.name}
            </Heading>
            <Flex mt={6} direction={notMobile ? 'row' : 'column'} gap={2}>
              <Link href={VENOMSCAN_NFT + json.venomAddress} target="_blank">
                <Button
                  variant="solid"
                  backgroundColor="blackAlpha.300"
                  width={notMobile ? 'auto' : '100%'}>
                  <VenomFoundation /> Venom Address
                </Button>
              </Link>
              {json.btcAddress && (
                <Link href={BTCSCAN_ADDRESS + json.btcAddress} target="_blank">
                  <Button
                    variant="solid"
                    backgroundColor="blackAlpha.300"
                    width={notMobile ? 'auto' : '100%'}>
                    <BTC />
                    BTC Address
                  </Button>
                </Link>
              )}
              {json.ethAddress && (
                <Link href={ETHERSCAN_ADDRESS + json.ethAddress} target="_blank">
                  <Button
                    variant="solid"
                    backgroundColor="blackAlpha.300"
                    width={notMobile ? 'auto' : '100%'}>
                    <ETH />
                    ETH Address
                  </Button>
                </Link>
              )}
            </Flex>
            <Text fontWeight="light" fontSize={notMobile ? 'xl' : 'lg'} my={8} textAlign={'center'}>
              {json.bio}
            </Text>
            <Links json={json} />
            <Socials json={json} />
          </>
        ) : (
          <Center width={'100%'} height={150}>
            <Spinner size="lg" />
          </Center>
        )}
      </Container>
    </>
  );
};

export default LinkPage;
