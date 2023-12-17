import {
  Button,
  Box,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiCheckLine, RiShuffleLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  buttonBgColorAtom,
  isConnectedAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import { LinkIcon, VenomFoundation } from 'components/logos';
import QRCode from 'react-qr-code';
import { Address } from 'everscale-inpage-provider';
import { useConnect, useSendMessage } from 'venom-react-hooks';
import {
  ConnectWallet,
  useSDK,
  useAddress,
  useConnect as useThirdWebConnect,
  metamaskWallet,
} from '@thirdweb-dev/react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { Styles } from 'types';
import { getColor } from 'core/utils';

const metamaskConfig = metamaskWallet();

interface Props {
  title: string;
  content: string;
  style?: Styles;
}

export default function Pay({ title, content, style }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const venom = style?.venom;
  const eth = style?.eth;
  const btc = style?.btc;
  const success = content;
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [connected, setIsConnected] = useAtom(isConnectedAtom);
  const [autoEth, setAutoEth] = useState(false);
  const [isPaying, setisPaying] = useState(false);
  const [paySuccessful, setpaySuccessful] = useState(false);

  const ethAddressFromWallet = useAddress();
  const connectWithThirdweb = useThirdWebConnect();
  const [_open, _setOpen] = useAtom(openModalAtom);

  useEffect(() => {
    _setOpen(isOpen)
  }, [isOpen]);

  useEffect(() => {
    if (autoEth && ethAddressFromWallet) {
      setAutoEth(false);
    }
  }, [autoEth, ethAddressFromWallet]);

  const [value, setValue] = useState(1);
  const ethuri = `ethereum:${eth}?value=${value * 1e18}&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value}&label=payment`;
  const { login, account } = useConnect();

  const { run, status } = useSendMessage({
    from: new Address(String(account?.address)),
    to: String(venom),
    amount: String(value * 1e9),
  });

  const sdk = useSDK();
  const payVenom = async () => {
    if (!connected) {
      login();
    } else {
      run();
    }
  };
  const payEth = async () => {
    if (sdk?.wallet.isConnected()) {
      try {
        setisPaying(true);
        setpaySuccessful(false);
        const txResult = await sdk.wallet.transfer(String(eth), value);
        if (txResult.receipt.confirmations > 0) {
          setpaySuccessful(true);
          setisPaying(false);
        }
      } catch (e) {
        setpaySuccessful(false);
        setisPaying(false);
      }
    } else {
      await connectWithThirdweb(metamaskConfig);
      setAutoEth(true);
    }
  };

  return (
    <>
      <Button
        size="lg"
        rounded={round}
        variant={variant}
        colorScheme={buttonBg}
        color={getColor(variant, buttonBg, lightMode)}
        minWidth={'100%'}
        gap={2}
        onClick={onOpen}>
        <LinkIcon type="pay" line color={lightMode ? 'var(--dark1)' : 'var(--white)'} />
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant={'soft-rounded'} colorScheme="gray">
              <TabList justifyContent={'center'}>
                <Tab onClick={() => setValue(1)}><Text color={'gray.400'} >Venom</Text></Tab>
                {eth && <Tab onClick={() => setValue(0.001)}><Text color={'gray.400'} >Ethereum</Text></Tab>}
                {btc && <Tab onClick={() => setValue(0.0001)}><Text color={'gray.400'} >Bitcoin</Text></Tab>}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Stack gap={4}>
                    <Text>Enter an amount</Text>
                    <InputGroup size="lg" minWidth="xs" borderColor="gray">
                      <InputLeftAddon>
                        <VenomFoundation />
                      </InputLeftAddon>
                      <Input
                        placeholder={'Enter amount to pay'}
                        value={value}
                        type="number"
                        onChange={(e) => setValue(Number(e.currentTarget.value))}
                      />
                      <InputRightElement width={'110px'} fontWeight={'bold'}>
                        TVENOM
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      onClick={payVenom}
                      isDisabled={value === 0}
                      colorScheme="green"
                      size={'lg'}
                      isLoading={status.isLoading}>
                      Pay
                    </Button>
                    {status.isSent && !status.isLoading && <Text color="green">{success}</Text>}
                    {status.isError && !status.isLoading && (
                      <Text color="red">Error. {status.error.message}</Text>
                    )}
                  </Stack>
                </TabPanel>
                <TabPanel>
                  {eth && (
                    <Stack gap={4}>
                      <Text>Enter an amount</Text>
                      <InputGroup size="lg" minWidth="xs" borderColor="gray">
                        <InputLeftAddon>
                          <FaEthereum size={'28'} />
                        </InputLeftAddon>
                        <Input
                          placeholder={'Enter amount'}
                          value={value}
                          type="number"
                          onChange={(e) => setValue(Number(e.currentTarget.value))}
                        />
                        <InputRightElement width={'70px'} fontWeight={'bold'}>
                          ETH
                        </InputRightElement>
                      </InputGroup>

                      <Button
                        isDisabled={value === 0}
                        onClick={payEth}
                        colorScheme="green"
                        size={'lg'}
                        isLoading={isPaying}>
                        {sdk?.wallet.isConnected() ? title : `Connect Wallet`}
                      </Button>
                      {paySuccessful && !isPaying && <Text color="green">{success}</Text>}
                      <Text>or Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={ethuri} />
                      </Box>
                    </Stack>
                  )}
                </TabPanel>
                <TabPanel>
                  {btc && (
                    <Stack gap={4}>
                      <Text>Enter an amount</Text>
                      <InputGroup size="lg" minWidth="xs" borderColor="gray">
                        <InputLeftAddon>
                          <FaBitcoin size={'28'} />
                        </InputLeftAddon>
                        <Input
                          placeholder={'Enter amount'}
                          value={value}
                          type="number"
                          onChange={(e) => setValue(Number(e.currentTarget.value))}
                        />
                        <InputRightElement width={'70px'} fontWeight={'bold'}>
                          BTC
                        </InputRightElement>
                      </InputGroup>
                      <Text>Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={btcuri} />
                      </Box>
                    </Stack>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
