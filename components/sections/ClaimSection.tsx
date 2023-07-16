import {
  Button,
  Container,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  SimpleGrid,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  Flex,
  Link,
  useMediaQuery, useColorMode
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  nameAtom,
  venomContractAtom,
  venomSProviderAtom,
  addressAtom,
  venomContractAddressAtom,
  isConnectedAtom,
} from 'core/atoms';
import VenomAbi from 'abi/Collection.abi.json';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslate } from 'core/lib/hooks/use-translate';
import Venom from 'components/Venom';
import { VENOMSCAN_NFT, SITE_PROFILE_URL } from 'core/utils/constants';
import { Address, Transaction } from 'everscale-inpage-provider';

interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

interface Fee {
  value0: number;
}

export default function ClaimSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const provider = useAtomValue(venomSProviderAtom);
  const venomContract = useAtomValue(venomContractAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const userAddress = useAtomValue(addressAtom);
  const [feeIsLoading, setFeeIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [fee, setFee] = useState<number | null>();
  const [message, setMessage] = useState<Message>({ type: '', title: '', msg: '', link: '' });
  const [nameExists, setNameExists] = useState(false);
  const [claimedName, setClaimedName] = useState('');
  const VenomContractAddress = useAtomValue(venomContractAddressAtom);
  //const [venomContract, setVenomContract] = useState<any>(undefined);
  const minFee = 660000000;
  const [name, setName] = useAtom(nameAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');

  const image = 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd';
  const json = {
    type: 'Basic NFT',
    name: name + '.VID',
    description: name + '.VID, a Venom ID',
    preview: {
      source: image,
      mimetype: 'image/svg',
    },
    files: [
      {
        source: image,
        mimetype: 'image/svg',
      },
    ],
    external_url: SITE_PROFILE_URL + name,
  };

  async function inputChange(e: string) {
    const _name = e;
    setName(_name);
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: 'connect wallet',
        msg: 'please connect your venom wallet',
      });
      return;
    } else if (message.type !== 'error') {
      setMessage({
        type: '',
        title: '',
        msg: '',
      });
    }

    if (_name.length > 2 && venomContract && venomContract?.methods !== undefined) {
      try {
        setFeeIsLoading(true);
        // @ts-ignore: Unreachable code error
        const { value0: _fee } = await venomContract.methods
          .calculateMintingFee({ name: String(_name) })
          .call();
        // @ts-ignore: Unreachable code error
        const { value0: _nameExists } = await venomContract?.methods
          .nameExists({ name: String(_name) })
          .call();
        setNameExists(_nameExists);
        setFee(_fee);
        setFeeIsLoading(false);
      } catch (er) {
        console.log(er);
        return
      }
    } else if (venomContract?.methods === undefined) {
      setMessage({
        type: 'warning',
        title: 'Error connecting to smart contract',
        msg: 'Something goes wrong when trying to get data from the smart contract',
      });
      return;
    }
  }

  async function claimVid(e: string) {
    if (!isConnected) {
      setMessage({
        type: 'info',
        title: 'connect wallet',
        msg: 'please connect your venom wallet',
      });
      return;
    }
    setMessage({ type: '', title: '', msg: '' });
    console.log('before minting');
    if (name.length >= 3 && !nameExists && venomContract?.methods) {
      console.log('minting');
      setIsMinting(true);
      // @ts-ignore: Unreachable code error
      const mintTx = await venomContract?.methods
        .mintNft({ json: JSON.stringify(json), name: name })
        .send({
          amount: String(minFee + Number(fee)),
          bounce: true,
          from: new Address(userAddress),
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsMinting(false);
            return Promise.resolve(null);
          } else {
            setIsMinting(false);
            console.log(e);
            return Promise.reject(e);
          }
        });

      if (mintTx) {
        setClaimedName(name);
        console.log('mint tx : ', mintTx);
        setIsConfirming(true)
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(mintTx)
            .tap((tx_in_tree: any) => {
              console.log('tx_in_tree : ', tx_in_tree);
              if (tx_in_tree.account.equals(VenomContractAddress)) {
                receiptTx = tx_in_tree;
              }
            })
            .finished();

        // Decode events by using abi
        // we are looking for event Game(address player, uint8 bet, uint8 result, uint128 prize);

        let events = await venomContract.decodeTransactionEvents({
          transaction: receiptTx as Transaction,
        });
        console.log(events);
        if (events.length !== 1 || events[0].event !== 'NftCreated') {
          setMessage({
            type: 'error',
            title: 'Error',
            msg: 'Something went wrong, Please try again',
          });
        } else {
          // @ts-ignore: Unreachable code error
          const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
          setMessage({
            type: 'success',
            title: 'Mint Successful',
            msg: 'Venom ID Claimed Successfuly, You can now manage and share your venom profile',
            link: VENOMSCAN_NFT + nftAddress,
          });
        }
        setIsMinting(false);
        setIsConfirming(false);
        console.log(events);
      }
      console.log('mint finished');
    }
  }

  useEffect(() => {
    if (provider?.isInitialized && venomContract !== undefined && isConnected) {
      console.log("venom contract ",venomContract)
    }
  }, [provider]);

  return (
    <Box backgroundColor={colorMode === 'dark' ? 'blackAlpha.200' : 'auto'}>
      <Container
        as="main"
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        <>
          <SimpleGrid columns={[1, 2]} spacing="32px" py={notMobile ? 10 : 4}>
            <Center display="flex" flexDirection="column" pt={4}>
              <Venom srcUrl="/logos/venomid.png" />
            </Center>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading fontWeight="bold" fontSize="6xl">
                {t('title')}
              </Heading>
              <Text fontWeight="bold" fontSize={notMobile ? '4xl' : '2xl'} my={notMobile ? 10 : 4}>
                {t('description')}
              </Text>
            </Box>
          </SimpleGrid>
          {message.msg.length > 0 && (
            <Alert
              flexDirection={notMobile ? 'row' : 'column'}
              alignItems={notMobile ? 'left' : 'center'}
              justifyContent={notMobile ? 'left' : 'center'}
              textAlign={notMobile ? 'left' : 'center'}
              status={message.type}
              gap={2}
              borderRadius={10}>
              <AlertIcon />
              <Box width={'100%'}>
                <AlertTitle>{message.title.toUpperCase()}</AlertTitle>
                <AlertDescription>{message.msg}</AlertDescription>
              </Box>
              {message.link && (
                <Box>
                  <Link href={message.link} target="_blank" id={`venom-id-nft-link`}>
                    <Button m={1} minWidth={120}>
                      View NFT
                    </Button>
                  </Link>
                  
                </Box>
              )}
            </Alert>
          )}
          <Stack direction={['column', 'row']} pb={6} pt={notMobile ? 10 : 6} width="100%">
            <InputGroup size="lg">
              <InputLeftAddon>venomid.link/</InputLeftAddon>
              <Input
                placeholder="samy"
                value={name}
                onChange={(e) => inputChange(e.target.value)}
              />
            </InputGroup>
            <Button
              backgroundColor="var(--venom2)"
              size="lg"
              minWidth="300px"
              disabled={name.length < 3 || nameExists}
              isLoading={feeIsLoading || isMinting}
              loadingText={isMinting && !isConfirming ? 'Claiming ...' : isMinting && isConfirming ? 'Confirming ...' : ''}
              onClick={(e) => claimVid(e.currentTarget.value)}>
              {t('claimButton')}
            </Button>
          </Stack>
          {name.length > 2 && fee !== -1 && venomContract?.methods && (
            <Flex
              width={'100%'}
              borderColor={'whiteAlpha.100'}
              borderWidth={1}
              borderRadius={10}
              justifyContent={'space-between'}
              mb={4}
              p={5}
              bgColor={'blackAlpha.200'}>
              <Text fontWeight={'bold'}>
                Minting Fee : {fee && !feeIsLoading ? `0.00000000${fee}` : 'Calculating'}
              </Text>
              {!feeIsLoading ? (
                <Text fontWeight={'light'} color={nameExists ? 'var(--red1)' : 'var(--venom1)'}>
                  {nameExists ? name + '.VID is Taken' : name + '.VID is Available'}
                </Text>
              ) : (
                <Text fontWeight={'light'}>Checking Availibility</Text>
              )}
            </Flex>
          )}
          <Text fontWeight="light" fontSize={notMobile ? '2xl' : 'xl'} mb={notMobile ? 10 : 6}>
            {t('claimDescription')}
          </Text>
        </>
      </Container>
    </Box>
  );
}
