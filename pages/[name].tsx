import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
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
  Stack,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar, Socials, ProfileSkeleton } from 'components/Profile';
import {
  bioAtom,
  btcAtom,
  lightModeAtom,
  ethAtom,
  avatarAtom,
  nameAtom,
  jsonAtom,
  socialsArrayAtom,
  nftContractAtom,
  linksArrayAtom,
  useLineIconsAtom,
  titleAtom,
  subtitleAtom,
  horizontalSocialAtom,
  addressAtom,
  socialButtonsAtom,
  isConnectedAtom,
  bgColorAtom,
  connectedAccountAtom,
  ipfsGatewayAtom,
  walletsArrayAtom,
  jsonHashAtom,
  walletButtonsAtom,
  roundAtom,
  buttonBgColorAtom,
  variantAtom,
  fontAtom,
  tourStepAtom,
  nftJsonAtom,
  avatarShapeAtom,
  colorModeAtom,
} from 'core/atoms';
import {
  SITE_DESCRIPTION,
  SITE_PROFILE_URL,
  SITE_TITLE,
  IPFS_URLS,
  BUTTON_BG_COLORS,
  BUTTON_ROUNDS,
  BUTTON_VARIANTS,
  BG_COLORS,
  FONTS,
  SITE_URL,
  SITE_CLAIM_URL,
} from 'core/utils/constants';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Links from 'components/Profile/Links';
import { NextSeo } from 'next-seo';
import Wallets from 'components/Profile/Wallets';
import Footer from 'components/Layout/Footer';
import { capFirstLetter } from 'core/utils';

interface Attribute {
  trait_type: string;
  value: string;
}

interface LinkPageProps {
  name: string;
  nftJson: any;
  title: string;
  description: string;
  avatar: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  let _name = query.name ? String(query.name) : '';
  const name = _name.toLowerCase().includes('.vid') ? _name.slice(0,-4) : _name;
  let _title = capFirstLetter(name + '.vid');
  let _description = SITE_DESCRIPTION;
  let _avatar = 'https://venomid.link/logos/vidicon.png';

  const res = await fetch(SITE_URL + 'api/name/?withDetails=1&name=' + name);
  const nftJson = await res.json();
  let _nftJson = nftJson.nftDetails;
  if (_nftJson) {
    if (_nftJson.title && _nftJson.title.length > 2) {
      _title = _nftJson.title;
    }

    if (_nftJson.subtitle && _nftJson.subtitle.length > 1) {
      _title += ' | ' + _nftJson.subtitle;
    }

    if (_title.indexOf('|') < 0 && _nftJson.bio && _nftJson.bio.length > 1) {
      //console.log('adding bio')
      _title += ' | ' + _nftJson.bio;
    }

    if (_nftJson.bio && _nftJson.bio.length > 1) {
      _description = _nftJson.bio;
    }

    if (_nftJson.avatar && _nftJson.title.avatar > 10) {
      _avatar = _nftJson.avatar;
    }

  }

  _title += ' | ' + SITE_TITLE;

  const title = _title;
  const description = _description;
  const avatar = _avatar;



  return {
    props: {
      name,
      nftJson,
      title,
      description,
      avatar
    },
  };
}

const LinkPage: NextPage<LinkPageProps> = ({ name, nftJson, title, description, avatar }) => {
  const { t } = useTranslate();
  //console.log(nftJson)
  const [bio, setBio] = useAtom(bioAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [ipfsGateway, setIpfsGateway] = useAtom(ipfsGatewayAtom);
  const [retries, setRetries] = useState<number>(0);
  const connected = useAtomValue(isConnectedAtom);
  const tourStep = useAtomValue(tourStepAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [venom, setVenom] = useAtom(addressAtom);
  const [btc, setBtc] = useAtom(btcAtom);
  const [eth, setEth] = useAtom(ethAtom);
  const links = useAtomValue(linksArrayAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const wallets = useAtomValue(walletsArrayAtom);
  const [lineIcons, setLineIcons] = useAtom(useLineIconsAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  //const [avatar, setAvatar] = useAtom(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const setTitle = useSetAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  //const [nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [nameDontExist, setNameDontExist] = useState(false);
  //const router = useRouter();
  //const name = router.query.name ? String(router.query.name) : '';
  // async function getInfoByName(_name: string) {
  //   try {
  //     //const res = await axios.get(SITE_PROFILE_URL + 'api/name/?name=' + _name);
  //     await fetch('/api/name/?name=' + _name)
  //       .then((res) => res.json())
  //       .then((jsonData) => {
  //         setNftJson(jsonData);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log('error loading name');
  //     setIsLoading(false);
  //     return 'error';
  //   }
  // }

  // useEffect(() => {
  //   async function getProfileJson() {
  //     setIsLoading(true);
  //     await getInfoByName(name);
  //     setIsLoading(false);
  //   }

  //   if (name.length > 2) {
  //     getProfileJson();
  //   }
  // }, [name]);

  useEffect(() => {
    async function initUI() {
      //console.log(nftJson);
      if (nftJson?.status === 'error') {
        setIsLoading(false);
        setLightMode(false);
        setNameDontExist(true);
        return;
      }
      setIsLoading(true);
      const owner = String(nftJson.nftJson.target).includes('not set') ? nftJson.owner : nftJson.nftJson.target;
      console.log(nftJson)
      const jsonUrl = nftJson.nftDetails;
      if (jsonUrl) {
        try {
          //console.log(jsonUrl);
          const res = { data : jsonUrl}
          setJson(res.data);
          //setName(String(nftJson.name));
          setVenom(owner);
          setTitle(res.data.title ?? '');
          setSubtitle(res.data.subtitle ?? '');
          setBio(res.data.bio);
          setBtc(res.data.btcAddress);
          setEth(res.data.ethAddress);
          //setAvatar(res.data.avatar);
          setAvatarShape(res.data.avatarShape ?? 'circle');
          setSocialIcons(res.data.socialIcons ?? false);
          setSocialButtons(res.data.socialButtons ?? false);
          setWalletButtons(res.data.waletButtons ?? false);
          setBgColor(res.data?.styles?.bgColor ?? BG_COLORS[0].color);
          setLineIcons(res.data?.styles?.lineIcons ?? false);
          setLightMode(res.data?.styles?.lightMode ?? BG_COLORS[8].lightMode);
          setButtonBgColor(res.data?.styles?.buttonBgColor ?? BUTTON_BG_COLORS[2]);
          setRound(res.data?.styles?.round ?? BUTTON_ROUNDS[1]);
          setVariant(res.data?.styles?.variant ?? BUTTON_VARIANTS[0]);
          setFont(res.data?.styles?.font ?? FONTS[0]);
          //console.log(res.data);
          setIsLoading(false);
        } catch (error) {
          //console.log('error getting json file');
          setJson({
            name: nftJson.nftJson.name,
            venomAddress: owner,
            btcAddress: '',
            ethAddress: '',
            title: '',
            subtitle: '',
            bio: '',
            avatar: '',
            avatarShape: 'circle',
            lineIcons: false,
            lightMode: BG_COLORS[0].lightMode,
            socialIcons: true,
            socialButtons: false,
            walletButtons: true,
            showAllNfts: false,
            bgColor: BG_COLORS[0].color,
            links: [],
            socials: {},
            styles: {
              lineIcons: false,
              lightMode: BG_COLORS[0].lightMode,
              bgColor: BG_COLORS[0].color,
              buttonBgColor: BUTTON_BG_COLORS[0],
              round: BUTTON_ROUNDS[1],
              variant: BUTTON_VARIANTS[0],
              font: FONTS[0],
            },
          });

          setVenom(owner);
          setBio('');
          setBtc('');
          setEth('');
          //setAvatar('');
          setTitle('');
          setSubtitle('');
          setAvatarShape('circle');
          setSocialIcons(false);
          setSocialButtons(false);
          setWalletButtons(false);
          setBgColor(BG_COLORS[0].color);
          setLineIcons(false);
          setLightMode(BG_COLORS[0].lightMode);
          setButtonBgColor(BUTTON_BG_COLORS[0]);
          setRound(BUTTON_ROUNDS[1]);
          setVariant(BUTTON_VARIANTS[0]);
          setFont(FONTS[0]);
          setIsLoading(false);
        }
      } else {
        setJson({
          name: nftJson.nftJson.name,
          venomAddress: owner,
          btcAddress: '',
          ethAddress: '',
          title: '',
          subtitle: '',
          bio: '',
          avatar: '',
          avatarShape: 'circle',
          lineIcons: false,
          lightMode: BG_COLORS[0].lightMode,
          socialIcons: true,
          socialButtons: false,
          walletButtons: true,
          showAllNfts: false,
          bgColor: BG_COLORS[0].color,
          links: [],
          socials: {},
          styles: {
            lineIcons: false,
            lightMode: BG_COLORS[0].lightMode,
            bgColor: BG_COLORS[0].color,
            buttonBgColor: BUTTON_BG_COLORS[0],
            round: BUTTON_ROUNDS[1],
            variant: BUTTON_VARIANTS[0],
            font: FONTS[0],
          },
        });

        setVenom(owner);
        setBio('');
        setBtc('');
        setEth('');
        //setAvatar('');
        setTitle('');
        setSubtitle('');
        setAvatarShape('circle');
        setSocialIcons(true);
        setSocialButtons(true);
        setWalletButtons(true);
        setBgColor(BG_COLORS[0].color);
        setLineIcons(false);
        setLightMode(BG_COLORS[0].lightMode);
        setButtonBgColor(BUTTON_BG_COLORS[0]);
        setRound(BUTTON_ROUNDS[1]);
        setVariant(BUTTON_VARIANTS[0]);
        setFont(FONTS[0]);
        setIsLoading(false);
      }
    }

    if (nftJson) {
      initUI();
    }
  }, [nftJson]);

  useEffect(() => {
    //console.log(lightMode);
    //console.log(colorMode);
    if (lightMode) {
      if (colorMode === 'dark') {
        toggleColorMode();
      }
    } else {
      if (colorMode === 'light') {
        toggleColorMode();
      }
    }
  }, [lightMode, colorMode]);

  return (
    <>
      <Head>
        {/* {json !== undefined && !isLoading && (
          <NextSeo
            title={json.name !== '' ? json.name : SITE_TITLE}
            description={json.bio !== '' ? json.bio : SITE_DESCRIPTION}
          />
        )} */}
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content={`https://venomid.link/api/og?name=${name}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta property="twitter:image" content={`https://venomid.link/api/og?name=${name}`} />
        {/* <link rel="icon" type="image/png" href="/logos/vidicon.png" /> */}
        <link
          rel="icon"
          href={json && !isLoading && json.avatar !== '' ? json.avatar : '/logos/vidicon.svg'}
        />
      </Head>

      <Flex
        as="main"
        maxW="100%"
        display="flex"
        flexDirection={'column'}
        align={'center'}
        bg={bgColor}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        bgPosition={'center'}
        minH="100vh"
        px={[4,4,0]}
        pt={12}>
        {!isLoading && json.name !== '' && !nameDontExist && (
          <>
            <Flex
              minH="100vh"
              width={['100%', '100%', 'md', 'lg', 'xl']}
              display="flex"
              flexDir={'column'}
              gap={4}
              placeContent="center"
              placeItems="center"
              fontFamily={font}
              color={!lightMode ? 'var(--white)' : 'var(--dark1)'}>
              <Flex direction="column" justify={'center'} align={'center'} gap={6} width="100%">
               
                <Flex gap={[0,0,8]} mt={notMobile ? 4 : 0} align={'center'} justify={'center'} w={'100%'} flexDir={['column','column','row']}>
                  <Box maxW={['200px', '200px', '200px', '220px']}>
                    <Avatar
                      my={6}
                      url={json.avatar}
                      alt={json.name + 'avatar image'}
                      shape={avatarShape}
                      shadow="none"
                    />
                  </Box>
                  
                    <Stack textAlign={['center','center','left']}>
                      <Heading fontWeight="bold" fontSize="3xl" fontFamily={font}>
                        {json.title}
                      </Heading>
                      <Heading fontWeight="normal" fontSize="xl" fontFamily={font}>
                        {json.subtitle}
                      </Heading>
                      <Heading fontWeight="bold" fontSize="xl" fontFamily={font}>
                        {json.name}
                      </Heading>
                      {/* <Button
                            my={1}
                            borderRadius={'25'}
                            variant={'outline'}
                            leftIcon={<RiMessage3Line />}>
                            Message
                          </Button> */}
                    </Stack>
                </Flex>
                {socialIcons && <Socials json={json} onlyIcons />}

                {walletButtons && <Wallets json={json} />}

                <Stack width={'100%'} gap={2}>
                  {json.bio && json.bio.length > 0 && (
                    <Text
                      fontWeight="normal"
                      fontSize={notMobile ? 'xl' : 'lg'}
                      mb={6}
                      textAlign={'center'}>
                      {json.bio}
                    </Text>
                  )}
                  <Links
                    json={json}
                    color={
                      !lightMode ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-800)'
                    }
                  />

                  {socialButtons && <Socials json={json} />}
                </Stack>
              </Flex>
            </Flex>
          </>
        )}

        {isLoading && (
          <Container width={['100%', '100%', 'md', 'lg', 'xl']} p={4}>
            <ProfileSkeleton notMobile={notMobile} />
          </Container>
        )}

        {nameDontExist && (
          <Center width={'100%'} height={'70vh'} flexDir={'column'} gap={4}>
            Venom ID {name} Does Not Exist
            <Button as={Link} href={SITE_CLAIM_URL}>
              Claim {name}.VID Now
            </Button>
          </Center>
        )}

        <Footer />
      </Flex>
    </>
  );
};

export default LinkPage;
