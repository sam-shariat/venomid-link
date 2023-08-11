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
  useColorMode,
  Box,
  Link,
} from '@chakra-ui/react';
import { VenomFoundation, BTC, ETH } from 'components/logos';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar, Socials, ProfileSkeleton } from 'components/Profile';
import {
  BTCSCAN_ADDRESS,
  ETHERSCAN_ADDRESS,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_CLAIM_URL,
  SITE_TITLE,
  VENOMSCAN_NFT,
} from 'core/utils/constants';
import { useAtom } from 'jotai';
import { jsonAtom, nftJsonAtom, colorModeAtom } from 'core/atoms';
import Links from 'components/Profile/Links';
import { NextSeo } from 'next-seo';

interface Attribute {
  trait_type: string;
  value: string;
}

const LinkPage: NextPage = () => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [json, setJson] = useAtom(jsonAtom);
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [nameDontExist, setNameDontExist] = useState(false);
  const router = useRouter();
  const name = router.query.name ? String(router.query.name) : '';
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;

  async function getInfoByName(_name: string) {
    try {
      //const res = await axios.get(SITE_PROFILE_URL + 'api/name/?name=' + _name);
      await fetch('/api/name/?name=' + _name)
        .then((res) => res.json())
        .then((jsonData) => {
          setNftJson(jsonData);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log('error loading name');
      setIsLoading(false);
      return 'error';
    }
  }

  useEffect(() => {
    async function getProfileJson() {
      setIsLoading(true);
      await getInfoByName(name);
      setIsLoading(false);
    }

    if (name.length > 2) {
      getProfileJson();
    }
  }, [name]);

  useEffect(() => {
    async function initUI() {
      console.log(nftJson);
      if (nftJson?.status === 'error') {
        setNameDontExist(true);
        return;
      }
      const owner = nftJson.nftData.owner;
      const jsonUrl = nftJson.nftJson.attributes?.find(
        (att: Attribute) => att.trait_type === 'DATA'
      )?.value;
      if (jsonUrl) {
        try {
          console.log(jsonUrl);
          const res = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
          setJson(res.data);
          if (res.data.lightMode) {
            colorMode !== 'light' && toggleColorMode();
          }
          console.log(res.data);
          setIsLoading(false);
        } catch (error) {
          console.log('error getting json file');
          setJson({
            name: name,
            venomAddress: owner,
            btcAddress: '',
            ethAddress: '',
            bio: nftJson.nftJson.description,
            avatar: nftJson.nftJson.preview.source,
            socials: {},
            links: [],
            lineIcons: false,
          });
        }
      } else {
        setJson({
          name: name,
          venomAddress: owner,
          btcAddress: '',
          ethAddress: '',
          bio: nftJson.nftJson.description,
          avatar: nftJson.nftJson.preview.source,
          socials: {},
          links: [],
          lineIcons: false,
        });
      }
    }

    if (nftJson) {
      initUI();
    }
  }, [nftJson]);
  return (
    <>
      <Head>
        {/* {json !== undefined && !isLoading && (
          <NextSeo
            title={json.name !== '' ? json.name : SITE_TITLE}
            description={json.bio !== '' ? json.bio : SITE_DESCRIPTION}
          />
        )} */}
        <title>{json !== undefined && !isLoading && json.name !== '' ? json.name : SITE_TITLE} | {json !== undefined && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION}</title>
        <link
          rel="icon"
          href={
            json !== undefined && !isLoading && json.avatar !== ''
              ? json.avatar
              : '/logos/vidicon.svg'
          }
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={json !== undefined && !isLoading && json.name != '' ? json.name : SITE_TITLE}
        />
        <meta
          name="twitter:description"
          content={
            json !== undefined && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION
          }
        />
        <meta name="twitter:image" content={`${SITE_URL}api/avatar?name=${name}`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      <Container
        as="main"
        maxW="container.sm"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="95vh">
        {!isLoading && json.name !== '' && !nameDontExist && (
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
            <Box width={notMobile ? 'md' : '100%'}>
              <Text
                fontWeight="light"
                fontSize={notMobile ? 'xl' : 'lg'}
                my={8}
                textAlign={'center'}>
                {json.bio}
              </Text>
              <Links json={json} />
              <Socials json={json} />
            </Box>
          </>
        )}

        {isLoading && <ProfileSkeleton notMobile={notMobile} />}

        {nameDontExist && (
          <Center width={'100%'} height={150} flexDir={'column'} gap={4}>
            Venom ID {name} Does Not Exist
            <Button as={Link} href={SITE_CLAIM_URL}>
              Claim {name}.VID Now
            </Button>
          </Center>
        )}
      </Container>
    </>
  );
};

export default LinkPage;
