import type { NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  SITE_URL,
  SITE_TITLE,
  VENOMSCAN_NFT
} from 'core/utils/constants';


interface Attribute {
    trait_type:string;
    value:string;
}
const LinkPage: NextPage = () => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
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
  const router = useRouter();
  const name = router.query.name ? String(router.query.name) : '';
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;

  async function getInfoByName(_name: string) {
    try {
        //const res = await axios.get(SITE_PROFILE_URL + 'api/name/?name=' + _name);
        return await fetch('/api/name/?name=' + _name)
        .then((res) => res.json())
        .then((jsonData) => {
          return 'https://ipfs.io/ipfs/'+ jsonData.nftJson.attributes?.find((att:Attribute) => att.trait_type === 'DATA')?.value;
        }).catch((e)=> {
            console.log(e);
            return 'error';
        })
      } catch (e) {
        console.log('error loading name');
        setIsLoading(false);
        return 'error';
      }
  }

  useEffect(() => {
    async function getProfileJson() {
      setIsLoading(true);
      const jsonUrl = await getInfoByName(name);
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
    if(name.length > 2){
        getProfileJson();
    }
  }, [name]);
  return (
    <>
      <Head>
        <title>
          {json !== undefined && !isLoading && json.name != '' ? json.name : SITE_TITLE}
        </title>
        <meta
          name="description"
          content={`${
            json !== undefined && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION
          }`}
        />
        <link
          rel="icon"
          href={json !== undefined && !isLoading && json.avatar !== '' ? json.avatar : '/logos/vidicon.svg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={json !== undefined && !isLoading && json.name != '' ? json.name : SITE_TITLE} />
        <meta name="twitter:description" content={json !== undefined && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION} />
        <meta name="twitter:image" content={json !== undefined && !isLoading && json.avatar !== '' ? json.avatar : `${origin}/vidog.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      <Container
        as="main"
        maxW="container.sm"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
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
