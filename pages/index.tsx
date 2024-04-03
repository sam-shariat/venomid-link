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
import { useAtom, useAtomValue } from 'jotai';
import Links from 'components/Profile/Links';
import { NextSeo } from 'next-seo';
import Wallets from 'components/Profile/Wallets';
import AnimateScale from 'components/animate/AnimateScale';
import AnimateOpacity from 'components/animate/AnimateOpacity';

interface Attribute {
  trait_type: string;
  value: string;
}

const HomePage: NextPage = () => {
  const { t } = useTranslate();
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
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [nameDontExist, setNameDontExist] = useState(false);
  const name = 'venomid';
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;

  async function getInfo(_name: string) {
    try {
      //const res = await axios.get(SITE_PROFILE_URL + 'api/name/?name=' + _name);
      await fetch('/api/nft/?nftAddress=' + _name)
        .then((res) => res.json())
        .then((jsonData) => {
          setNftJson(jsonData);
          //console.log(jsonData);
        })
        .catch((e) => {
          //console.log(e);
        });
    } catch (e) {
      //console.log('error loading name');
      setIsLoading(false);
      return 'error';
    }
  }

  useEffect(() => {
    async function getProfileJson() {
      setIsLoading(true);
      await getInfo('0:eb9718b16d39a4001e376b1a677817d9c401f5f3fc84cf8f32033334d3587a4a');
      setIsLoading(false);
    }

    if (name.length > 2) {
      getProfileJson();
    }
  }, [name]);

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

  useEffect(() => {
    async function initUI() {
      //console.log(nftJson);
      if (nftJson?.status === 'error') {
        setNameDontExist(true);
        return;
      }
      const owner = '0:d1785eeee9473196ebd70d5c3469062a2ed0a247bc7033d402ab3486267c99b7';
      const jsonUrl = nftJson.nftJson.attributes?.find(
        (att: Attribute) => att.trait_type === 'DATA'
      )?.value;
      if (jsonUrl) {
        try {
          //console.log(jsonUrl);
          const res = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
          setJson(res.data);
          if (res.data.lightMode) {
            colorMode !== 'light' && toggleColorMode();
          }
          //setName(String(nftJson.name));
          setVenom(owner);
          setTitle(res.data.title ?? '');
          setSubtitle(res.data.subtitle ?? '');
          setBio(res.data.bio);
          setBtc(res.data.btcAddress);
          setEth(res.data.ethAddress);
          setAvatar(res.data.avatar);
          setAvatarShape(res.data.avatarShape ?? 'circle');
          setSocialIcons(res.data.socialIcons ?? true);
          setSocialButtons(res.data.socialButtons ?? true);
          setWalletButtons(res.data.WalletButtons ?? true);
          setBgColor(res.data?.styles?.bgColor ?? BG_COLORS[0].color);
          setLineIcons(res.data?.styles?.lineIcons ?? false);
          setLightMode(res.data?.styles?.lightMode ?? BG_COLORS[0].lightMode);
          setButtonBgColor(res.data?.styles?.buttonBgColor ?? BUTTON_BG_COLORS[0]);
          setRound(res.data?.styles?.round ?? BUTTON_ROUNDS[1]);
          setVariant(res.data?.styles?.variant ?? BUTTON_VARIANTS[0]);
          setFont(res.data?.styles?.font ?? FONTS[0]);
          //console.log(res.data);
          setIsLoading(false);
        } catch (error) {
          //console.log('error getting json file');
          setJson({
            name: nftJson.name,
            venomAddress: connectedAccount,
            btcAddress: '',
            ethAddress: '',
            title: '',
            subtitle: '',
            bio: '',
            avatar: '',
            avatarNft: '',
            lineIcons: false,
            lightMode: BG_COLORS[0].lightMode,
            socialIcons: true,
            socialButtons: false,
            walletButtons: true,
            showAllNfts: false,
            bgColor: BG_COLORS[0].color,
            links: [],
            socials: {},
          });
          setVenom(owner);
          setBio('');
          setBtc('');
          setEth('');
          setAvatar('');
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
        }
      } else {
        setJson({
          name: name,
          venomAddress: owner,
          btcAddress: '',
          ethAddress: '',
          bio: '',
          avatar: nftJson.nftJson.preview.source,
          socials: {},
          links: [],
          lineIcons: false,
        });

        setVenom(owner);
        setBio('');
        setBtc('');
        setEth('');
        setAvatar('');
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
  return (
    <>
      <Head>
        {/* {json !== undefined && !isLoading && (
          <NextSeo
            title={json.name !== '' ? json.name : SITE_TITLE}
            description={json.bio !== '' ? json.bio : SITE_DESCRIPTION}
          />
        )} */}
        <title>{`${SITE_TITLE} | ${SITE_DESCRIPTION}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}logos/vid.png`} />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="og:description" content={SITE_DESCRIPTION} />
        <meta name="og:image" content={`${SITE_URL}logos/vid.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
        <link rel="icon" href={'/logos/vidicon.svg'} />
      </Head>

      <Container
        as="main"
        maxW="100%"
        display="grid"
        placeContent="center"
        placeItems="center"
        bg={bgColor}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        py={12}
        transition={'all ease 1s'}
        bgPosition={'center'}
        minH="100vh">
        {!isLoading && json.name !== '' && !nameDontExist && (
          <>
            <Flex
              minH="100vh"
              width={['100%', '100%', 'md', 'lg', 'xl']}
              display="flex"
              flexDir={'column'}
              gap={4}
              fontSize={['lg','lg','xl']}
              placeContent="center"
              placeItems="center"
              fontFamily={font}
              color={!lightMode ? 'var(--white)' : 'var(--dark1)'}>
              <Flex direction="column" justify={'center'} align={'center'} gap={6} width="100%">
              <Flex gap={[0,0,8]} mt={notMobile ? 4 : 0} align={'center'} justify={'center'} w={'100%'} flexDir={['column','column','row']}>
                <AnimateScale delay={1}>
                  <Box maxW={['200px', '200px', '200px', '220px']}>
                    <Avatar
                      my={6}
                      url={json.avatar}
                      alt={json.name + 'avatar image'}
                      shape={avatarShape}
                      shadow="none"
                    />
                  </Box>
                  </AnimateScale>
                  
                    <Stack textAlign={['center','center','left']}>
                      <AnimateOpacity delay={1}>
                      <Heading fontWeight="bold" fontSize="3xl" fontFamily={font}>
                        {json.title}
                      </Heading>
                      </AnimateOpacity>
                      <AnimateOpacity delay={1.3}>
                      <Heading fontWeight="normal" fontSize="xl" fontFamily={font}>
                        {json.subtitle}
                      </Heading>
                      </AnimateOpacity>
                      <AnimateOpacity delay={1.6}>
                      <Heading fontWeight="bold" fontSize="xl" fontFamily={font}>
                        {json.name}
                      </Heading>
                      </AnimateOpacity>
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
                
                <AnimateOpacity delay={2}>
                {walletButtons && (
                  <Wallets
                    json={json}
                    color={
                      !lightMode ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-800)'
                    }
                  />
                )}
                </AnimateOpacity>
                
                <Stack width={'100%'} gap={2}>
                <AnimateOpacity delay={2.3}>
                  {json.bio && json.bio.length > 0 && (
                    <Text
                      fontWeight="normal"
                      fontSize={notMobile ? 'xl' : 'lg'}
                      my={4}
                      textAlign={'center'}>
                      {json.bio}
                    </Text>
                  )}
                  </AnimateOpacity>
                  
                  <Links
                    json={json}
                    color={
                      !lightMode ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-800)'
                    }
                  />
                  <AnimateOpacity delay={2.8}>
                  {socialButtons && <Socials json={json} />}
                  </AnimateOpacity>
                </Stack>
              </Flex>
            </Flex>
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

export default HomePage;
