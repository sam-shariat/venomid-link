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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  buttonBgColorAtom,
  fontAtom,
  isConnectedAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import { capFirstLetter, getColor, truncAddress } from 'core/utils';
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
import { DONATE_VALUES } from 'core/utils/constants';
import WalletLink from './WalletLink';
import { Styles } from 'types';

const metamaskConfig = metamaskWallet();

interface Props {
  title: string;
  content: string;
  style?: Styles;
}

export default function Donate({ title, content, style }: Props) {
  const venom = style?.venom;
  const eth = style?.eth;
  const btc = style?.btc;
  const success = content;
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const font = useAtomValue(fontAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const connected = useAtomValue(isConnectedAtom);
  const [autoEth, setAutoEth] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [donateSuccessful, setDonateSuccessful] = useState(false);
  const [_open, _setOpen] = useAtom(openModalAtom);

  useEffect(() => {
    _setOpen(isOpen)
  }, [isOpen]);

  const ethAddressFromWallet = useAddress();
  const connectWithThirdweb = useThirdWebConnect();

  useEffect(() => {
    if (autoEth && ethAddressFromWallet) {
      setAutoEth(false);
    }
  }, [autoEth, ethAddressFromWallet]);

  const [value, setValue] = useState('1 VENOM');
  const ethuri = `ethereum:${eth}?value=${
    Number(value.slice(0, value.indexOf(' '))) * 1e18
  }&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value.slice(0, value.indexOf(' '))}&label=donation`;
  const { login, account } = useConnect();

  const { run, status } = useSendMessage({
    from: new Address(String(account?.address)),
    to: String(venom),
    amount: String(Number(value.slice(0, value.indexOf(' '))) * 1e9),
  });

  const sdk = useSDK();

  const donate = async () => {
    if (value.includes('VENOM')) {
      if (!connected) {
        login();
      } else {
        run();
      }
    } else if (value.includes('ETH')) {
      if (sdk?.wallet.isConnected()) {
        try {
          setIsDonating(true);
          setDonateSuccessful(false);
          const txResult = await sdk.wallet.transfer(
            String(eth),
            value.slice(0, value.indexOf(' '))
          );
          if (txResult.receipt.confirmations > 0) {
            setDonateSuccessful(true);
            setIsDonating(false);
          }
        } catch (e) {
          setDonateSuccessful(false);
          setIsDonating(false);
        }
      } else {
        await connectWithThirdweb(metamaskConfig);
        setAutoEth(true);
      }
    }
  };

  return (
    <>
      <Button
        size="lg"
        rounded={round}
        variant={variant}
        colorScheme={buttonBg}
        key={`donate-button-action`}
        color={getColor(variant, buttonBg, lightMode)}
        width={'100%'}
        gap={2}
        onClick={onOpen}>
        <LinkIcon type="donate" line color={lightMode ? 'var(--dark1)' : 'var(--white)'} />
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'} fontFamily={font} color={lightMode ? 'var(--dark1)' : 'white'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant={'soft-rounded'} colorScheme={colorMode === 'light' ? "blackAlpha" : 'whiteAlpha'}>
              <TabList justifyContent={'center'} >
                {venom && <Tab gap={2} onClick={() => setValue('1 VENOM')} justifyContent={'center'}><LinkIcon type='venom' size='24'/>Venom</Tab>}
                {eth && <Tab gap={2} onClick={() => setValue('0.001 ETH')} ><LinkIcon type='ethereum' size='24'/>Ethereum</Tab>}
                {btc && <Tab gap={2} onClick={() => setValue('0.0001 BTC')} ><LinkIcon type='bitcoin' size='24'/>Bitcoin</Tab>}
              </TabList>

              <TabPanels>
                {venom && (
                  <TabPanel>
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <Text>Select an amount</Text>
                        {DONATE_VALUES['venomtestnet'].map((val: string) => (
                          <Button
                            leftIcon={val === value ? <RiCheckLine /> : undefined}
                            onClick={() => setValue(val)}
                            isActive={val === value}
                            size={'lg'}
                            key={'donate-value-venom-'+val}
                            rounded={round}
                            variant={variant}
                            colorScheme={buttonBg}
                            color={getColor(variant, buttonBg, lightMode)}>
                            {val}
                          </Button>
                        ))}
                      </Stack>
                      <Button
                        onClick={donate}
                        isDisabled={!value.includes('VENOM')}
                        colorScheme="green"
                        rounded={round}
                        variant={variant}
                        size={'lg'}
                        isLoading={status.isLoading}>
                        {title}
                      </Button>
                      {status.isSent && !status.isLoading && <Text color="green">{success}</Text>}
                      {status.isError && !status.isLoading && (
                        <Text color="red">Error. {status.error.message}</Text>
                      )}
                    </Stack>
                  </TabPanel>
                )}

                {eth && (
                  <TabPanel>
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <Text>Select an amount</Text>
                        {DONATE_VALUES['ethereum'].map((val: string) => (
                          <Button
                            leftIcon={val === value ? <RiCheckLine /> : undefined}
                            onClick={() => setValue(val)}
                            isActive={val === value}
                            size="lg"
                            rounded={round}
                            key={'donate-value-eth-'+val}
                            variant={variant}
                            colorScheme={buttonBg}
                            color={getColor(variant, buttonBg, lightMode)}>
                            {val}
                          </Button>
                        ))}
                      </Stack>

                      <Button
                        isDisabled={!value.includes('ETH')}
                        onClick={donate}
                        colorScheme="green"
                        rounded={round}
                        variant={variant}
                        size={'lg'}
                        isLoading={isDonating}>
                        {sdk?.wallet.isConnected() ? title : `Connect Wallet`}
                      </Button>
                      {donateSuccessful && !isDonating && <Text color="green">{success}</Text>}
                      <Text>or scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={ethuri} />
                      </Box>
                    </Stack>
                  </TabPanel>
                )}
                {btc && (
                  <TabPanel>
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <Text>Select an amount</Text>
                        {DONATE_VALUES['bitcoin'].map((val: string) => (
                          <Button
                            leftIcon={val === value ? <RiCheckLine /> : undefined}
                            onClick={() => setValue(val)}
                            isActive={val === value}
                            size={'lg'}
                            key={'donate-value-btc-'+val}
                            rounded={round}
                            variant={variant}
                            colorScheme={buttonBg}
                            color={getColor(variant, buttonBg, lightMode)}>
                            {val}
                          </Button>
                        ))}
                      </Stack>
                      <Text>Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={btcuri} />
                      </Box>
                    </Stack>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
