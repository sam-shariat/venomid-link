import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  SimpleGrid,
  Center,
  Box,
  Spinner,
  Stack,
  Image,
  HStack,
  Tooltip,
  Link,
} from '@chakra-ui/react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ethAtom, lightModeAtom } from 'core/atoms';
import { capFirstLetter, sleep, truncAddress } from 'core/utils';
import { LinkIcon } from 'components/logos';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { BaseNftJson, getAddressesFromIndex, getNftByIndex, saltCode } from 'core/utils/nft';
import {
  AVATAR_API_URL,
  ETHERSCAN_URLS,
  MARKETPLACE_URLS,
  OPENSEA_URL,
  VENOMART_NFT,
  VENTORY_NFT,
  ZERO_ADDRESS,
} from 'core/utils/constants';
import { Avatar } from 'components/Profile';
import { RiCloseLine, RiExternalLinkLine, RiRestartLine } from 'react-icons/ri';
import axios from 'axios';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';

interface Props {
  defaultType: string;
  key?: string;
}

export default function NftGallery() {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<BaseNftJson[] | undefined>(undefined);
  const [nftjson, setNftJson] = useState<BaseNftJson | undefined>(undefined);
  const eth = useAtomValue(ethAtom);
  const lightMode = useAtomValue(lightModeAtom);

  function fullScreen(index: number) {
    setNftJson(nftjsons && nftjsons[index]);
    onModalOpen();
  }

  const loadNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);

      if (!provider?.isInitialized) return;
      setNftJsons([]);
      setIsLoading(true);
      const saltedCode = await saltCode(provider, String(account?.address), ZERO_ADDRESS);
      // Hash it
      const codeHash = await provider.getBocHash(String(saltedCode));
      if (!codeHash) {
        setIsLoading(false);
        return;
      }
      // Fetch all Indexes by hash
      const indexesAddresses = await getAddressesFromIndex(codeHash, provider);
      if (!indexesAddresses || !indexesAddresses.length) {
        //if (indexesAddresses && !indexesAddresses.length) setListIsEmpty(true);
        setIsLoading(false);
        return;
      }
      // Fetch all nfts
      indexesAddresses.map(async (indexAddress) => {
        try {
          const _nftJson = await getNftByIndex(provider, indexAddress);
          setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
        } catch (e: any) {
          // console.log('error getting nft ', indexAddress);
        }
      });

      if (eth.length > 32) {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        await fetch(
          'https://eth-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'ethereum',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://arb-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log(response);
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'arbitrum',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://polygon-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'polygon',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));

        await fetch(
          'https://opt-mainnet.g.alchemy.com/nft/v3/k1sdbc-1ghcYlc8lhbbDu1e3j7kPMC74/getNFTsForOwner?owner=' +
            eth +
            '&withMetadata=true&pageSize=100',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            response?.ownedNfts.map((nft: any) => {
              let thumbnailUrl = nft.image.thumbnailUrl
                ? nft.image.thumbnailUrl
                : nft.image.cachedUrl;
              const _nftJson = {
                name: nft.name,
                tokenId: nft.tokenId,
                collectionName: nft.contract.name,
                address: nft.contract.address,
                network: 'optimism',
                metadata: nft.raw.metadata,
                preview: {
                  source: thumbnailUrl,
                  mimetype: nft.image.contentType,
                },
                files: [
                  {
                    source: nft.image.cachedUrl,
                    mimetype: nft.image.contentType,
                  },
                ],
              };
              nft.name !== null && setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
            });
          })
          .catch((err) => console.error(err));
      }

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const onDrawerClose = () => {
    onClose();
  };

  useEffect(() => {
    async function getNfts() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          // console.log('provider not ready');
          await sleep(1000);
          getNfts();
          return;
        }
      }
      if (isOpen && !loaded) {
        loadNFTs();
      }
    }
    if (isOpen) {
      getNfts();
    }
  }, [isOpen]);

  return (
    <>
      <Button
        size={'lg'}
        bg={'blackAlpha.300'}
        color={lightMode ? 'var(--dark1)' : 'var(--white)'}
        onClick={() => {
          onOpen();
        }}>
        NFT Gallery
      </Button>
      <Drawer onClose={onDrawerClose} isOpen={isOpen} size={'full'} placement="bottom">
        <DrawerOverlay />
        <DrawerContent bg={lightMode ? 'whitesmoke' : 'var(--dark)'}>
          <DrawerHeader gap={3} display={'flex'} flexDirection={notMobile ? 'row' : 'column'}>
            <HStack gap={2} flexGrow={1}>
              <Text flexGrow={1}>NFT Gallery</Text>
              <Button aria-label="reload-nfts" onClick={loadNFTs} gap={2}>
                <RiRestartLine size={'24'} />
              </Button>
              <Button aria-label="close-nfts-modal" onClick={onDrawerClose} gap={2}>
                <RiCloseLine size={'24'} />
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box w="100%" maxW="900px" mx="auto" sx={{ columnCount: [1, 2, 3], columnGap: '16px' }}>
              {nftjsons?.map((nft, index) => (
                <Button
                  onClick={() => fullScreen(index)}
                  key={'nft-' + index}
                  borderRadius={12}
                  width={'100%'}
                  p={0}
                  h={'auto'}
                  minH={'200px'}
                  mb={4}>
                  <Center
                    width={'100%'}
                    key={'nft-div-' + index}
                    flexDirection={'column'}
                    gap={2}
                    background={colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'}
                    borderRadius={12}>
                    <Box position={'absolute'} right={3} top={3} opacity={0.5} zIndex={900}>
                      <LinkIcon type={String(nft.network)} line />
                    </Box>
                    <Flex
                      key={nft.name + ' name' + index}
                      gap={2}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Box>
                        {String(nft.preview?.mimetype).includes('mp4') ? (
                          <Center>
                            <ThirdwebNftMedia
                              metadata={nft.metadata}
                              width={'100%'}
                              controls={false}
                              height={'250px'}
                              style={{ position: 'relative', borderRadius: 12 }}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            position={'relative'}
                            width={'100%'}
                            height={'auto'}
                            transition={'ease'}
                            transitionDuration={'1000'}
                            alt={nft.name}
                            textAlign={'center'}
                            src={
                              String(nft.name).slice(-4).toLowerCase() === '.vid'
                                ? AVATAR_API_URL +
                                  String(nft.name).slice(0, -4).toLowerCase() +
                                  '&var=' +
                                  Math.round(Math.random() * 10000)
                                : nft.files && nft.files[0]?.source !== ''
                                ? String(nft.files[0]?.source)
                                : String(nft.preview?.source)
                            }
                          />
                        )}
                      </Box>
                      {/* <Text
                        fontWeight={'bold'}
                        fontSize={
                          listView
                            ? String(nft.name).length > 15
                              ? String(nft.name).length > 18
                                ? 'xs'
                                : 'sm'
                              : 'md'
                            : 'lg'
                        }>
                        {listView
                          ? String(nft.name).length > 18
                            ? String(nft.name).slice(0, 18) + '...'
                            : String(nft.name)
                          : String(nft.name).length > 23
                          ? String(nft.name).slice(0, 23) + '...'
                          : String(nft.name)}
                      </Text> */}
                    </Flex>
                  </Center>
                </Button>
              ))}
            </Box>

            <Modal isOpen={isModalOpen} onClose={onModalClose} size={'full'}>
              <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
              <ModalContent bg={lightMode ? 'whitesmoke' : 'var(--dark)'}>
                <ModalHeader
                  gap={2}
                  display={'flex'}
                  justifyContent={notMobile ? 'center' : 'left'}
                  alignItems={'center'}>
                  <LinkIcon type={String(nftjson?.network)} />
                  {nftjson?.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack gap={4}>
                    <Flex
                      key={nftjson?.name + ' key'}
                      gap={4}
                      flexDirection={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Center width={'100%'}>
                        {String(nftjson?.preview?.mimetype).includes('mp4') ? (
                          <Center>
                            <ThirdwebNftMedia
                              metadata={nftjson?.metadata}
                              width={notMobile ? 'auto' : '100%'}
                              controls={false}
                              height={notMobile ? '80vh' : 'auto'}
                              style={{ position: 'relative', borderRadius: 12 }}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            position={'relative'}
                            width={notMobile ? 'auto' : '100%'}
                            height={notMobile ? '80vh' : 'auto'}
                            alt={nftjson?.name}
                            textAlign={'center'}
                            src={
                              String(nftjson?.name).slice(-4).toLowerCase() === '.vid'
                                ? AVATAR_API_URL +
                                  String(nftjson?.name).slice(0, -4).toLowerCase() +
                                  '&var=' +
                                  Math.round(Math.random() * 10000)
                                : nftjson?.files && nftjson?.files[0]?.source !== ''
                                ? String(nftjson?.files[0]?.source)
                                : String(nftjson?.preview?.source)
                            }
                          />
                        )}
                      </Center>
                      <Stack gap={4} w={notMobile ? 'md' : '100%'}>
                        <Text textAlign={'center'}>
                          {nftjson?.network?.includes('venom')
                            ? nftjson.description
                            : nftjson?.metadata?.description}
                        </Text>
                        <Link
                          href={
                            ETHERSCAN_URLS[String(nftjson?.network).replace(' ', '')] +
                            nftjson?.address
                          }
                          target="_blank">
                          <Flex opacity={0.5} gap={2} fontSize={'md'} justify={'center'}>
                            <LinkIcon type={String(nftjson?.network)} line={false} />
                            {truncAddress(String(nftjson?.address))}
                          </Flex>
                        </Link>
                        <Link
                          href={
                            MARKETPLACE_URLS[String(nftjson?.network).replace(' ', '')] +
                            String(nftjson?.address)
                          }
                          target="_blank"
                          id={`venom-id-${nftjson?.name}-link`}>
                          <Button
                            width={'100%'}
                            rightIcon={<RiExternalLinkLine />}
                            backgroundColor={
                              colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'
                            }>
                            View On Marketplace
                          </Button>
                        </Link>
                      </Stack>
                    </Flex>
                  </Stack>
                </ModalBody>
                <ModalFooter />
              </ModalContent>
            </Modal>

            {isLoading && (
              <Center width={'100%'} height={150}>
                <Spinner size="lg" />
              </Center>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
