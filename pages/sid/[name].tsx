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
  SITE_SPACE_ID_URL,
  SPACE_ID_TITLE,
} from 'core/utils/constants';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Links from 'components/Profile/Links';
import { NextSeo } from 'next-seo';
import Wallets from 'components/Profile/Wallets';
import Footer from 'components/Layout/Footer';
import { capFirstLetter } from 'core/utils';
import { createWeb3Name } from '@web3-name-sdk/core';
import { CustomLink } from 'types';

interface Attribute {
  trait_type: string;
  value: string;
}

interface SIDLinkPageProps {
  name: string;
  nftJson: any;
  title: string;
  description: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const name = query.name ? String(query.name).toLowerCase() : '';
  let _title = capFirstLetter(name);
  let _description = SITE_DESCRIPTION;

  const web3Name = createWeb3Name();
  let owner = await web3Name.getAddress(name);
  if(!owner){
    let error = {status: 'error'};
    return {
      props: {
        name,
        error,
        _title,
        _description
      },
    };
  }
  let bio = await web3Name.getDomainRecord({ name: name, key: 'description' });
  let __avatar: string | null | undefined = await web3Name.getDomainRecord({ name: name, key: 'avatar' });
  let avatarShape = 'circle'
  if(!__avatar){
    __avatar = await web3Name.getDomainAvatar({name: name, key: 'avatar'});
    avatarShape = 'round'
  }
  const avatar = __avatar;
  const titleName = await web3Name.getDomainRecord({ name: name, key: 'name' });
  const subtitle = await web3Name.getDomainRecord({ name: name, key: 'location' });
  let url = await web3Name.getDomainRecord({ name: name, key: 'url' });
  let twitter = await web3Name.getDomainRecord({ name: name, key: 'com.twitter' });
  let telegram = await web3Name.getDomainRecord({ name: name, key: 'org.telegram' });
  let github = await web3Name.getDomainRecord({ name: name, key: 'com.github' });
  let discord = await web3Name.getDomainRecord({ name: name, key: 'com.discord' });
  let email = await web3Name.getDomainRecord({ name: name, key: 'email' });
  let symbol = name.slice(-3).toLowerCase();
  let walletName = symbol === 'arb' ? 'arbitrum' : symbol === 'bnb' ? 'binance' : symbol === 'inj' ? 'injective' : symbol === 'eth' ? 'ethereum' : symbol;
  let wallets = [{key : walletName, value: owner}];
  let walletsObj: any = {};
    wallets.map((wallet) => {
      walletsObj[wallet['key']] = wallet['value'];
    });
  const socials = {twitter,telegram,github,discord,email};
  let links: CustomLink[] = [];
  if (url && url.length > 5) {
    links.push({ title: 'Website', url: url, type: 'simple link', image: '', content: '', styles: {size : 'md', icon: 'RiLinksLine'} });
  }

  let _nftDetails = { name, title: titleName, subtitle: subtitle, avatar : avatar, avatarShape, bio : bio, links: links, socials: socials, wallets : walletsObj };
  let _nftJson = { name };
  const nftJson = { owner, nftJson: _nftJson, nftDetails: _nftDetails };
  if (_nftDetails.title && _nftDetails.title.length > 2) {
    _title = _nftDetails.title;
  }

  if (_nftDetails.subtitle && _nftDetails.subtitle.length > 1) {
    _title += ' | ' + _nftDetails.subtitle;
  }

  if (_title.indexOf('|') < 0 && _nftDetails.bio && _nftDetails.bio.length > 1) {
    //console.log('adding bio')
    _title += ' | ' + _nftDetails.bio;
  }

  if (_nftDetails.bio && _nftDetails.bio.length > 1) {
    _description = _nftDetails.bio;
  }

  _title += ' | ' + SPACE_ID_TITLE;

  const title = _title;
  const description = _description;

  return {
    props: {
      name,
      nftJson,
      title,
      description
    },
  };
}

const SIDLinkPage: NextPage<SIDLinkPageProps> = ({ name, nftJson, title, description}) => {
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
      const owner = nftJson.owner;
      const jsonUrl = nftJson.nftDetails;
      if (jsonUrl) {
        try {
          //console.log(jsonUrl);
          const res = { data: jsonUrl };
          setJson(res.data);
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
          setWalletButtons(res.data.waletButtons ?? true);
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
      } else {
        setJson({
          name: nftJson.nftJson.name,
          bnbAddress: owner,
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
        <meta property="og:image" content={`https://venomid.link/api/sidog?name=${name}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta property="twitter:image" content={`https://venomid.link/api/sidog?name=${name}`} />
        {/* <link rel="icon" type="image/png" href="/logos/vidicon.png" /> */}
        <link rel="icon" href={avatar ? avatar : '/logos/vidicon.png'} />
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
        bgPosition={'center'}
        minH="100vh"
        pt={12}>
        {!isLoading && json.name !== '' && !nameDontExist && (
          <>
            <Container
              minH="100vh"
              width={['100%', '100%', 'md', 'lg', 'xl']}
              minWidth={['xs', 'sm', 'md', 'lg', 'xl']}
              display="flex"
              flexDir={'column'}
              gap={4}
              placeContent="center"
              placeItems="center"
              fontFamily={font}
              color={!lightMode ? 'var(--white)' : 'var(--dark1)'}>
              <Flex direction="column" justify={'center'} align={'center'} gap={2} width="100%">
                {!notMobile && (
                  <Stack mt={6} textAlign="center" w={'100%'}>
                    <Heading fontWeight="bold" fontSize="3xl" fontFamily={font}>
                      {json.title}
                    </Heading>
                    <Heading fontWeight="normal" fontSize="xl" fontFamily={font}>
                      {json.subtitle}
                    </Heading>
                  </Stack>
                )}
                <Flex gap={8} mt={notMobile ? 4 : 0} align={'center'} justify={'center'} w={'100%'}>
                  <Box maxW={['200px', '200px', '200px', '220px']}>
                    <Avatar
                      my={6}
                      url={json.avatar}
                      alt={json.name + 'avatar image'}
                      shape={avatarShape}
                      shadow="none"
                    />
                  </Box>
                  {notMobile && (
                    <Stack>
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
                  )}
                </Flex>
                {!notMobile && (
                  <>
                    <Heading fontWeight="bold" fontSize="xl" fontFamily={font}>
                      {json.name}
                    </Heading>
                    {/* <Button
                          borderRadius={'25'}
                          variant={'outline'}
                          leftIcon={<RiMessage3Line />}>
                          Message
                        </Button> */}
                  </>
                )}

                {socialIcons && <Socials json={json} onlyIcons />}

                {walletButtons && <Wallets json={json} />}

                <Stack width={'100%'} gap={2}>
                  {json.bio && json.bio.length > 0 && (
                    <Text
                      fontWeight="normal"
                      fontSize={notMobile ? 'xl' : 'lg'}
                      my={4}
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
            </Container>
          </>
        )}

        {isLoading && (
          <Container width={['100%', '100%', 'md', 'lg', 'xl']} p={4}>
            <ProfileSkeleton notMobile={notMobile} />
          </Container>
        )}

        {nameDontExist && (
          <Center width={'100%'} height={'70vh'} flexDir={'column'} gap={4}>
            Space ID {name} Does Not Exist
            <Button as={Link} href={SITE_SPACE_ID_URL}>
              Claim {name} Now
            </Button>
          </Center>
        )}

        <Footer />
      </Container>
    </>
  );
};

export default SIDLinkPage;
