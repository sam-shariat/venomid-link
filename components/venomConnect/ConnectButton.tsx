import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  LinkBox,
  LinkOverlay,
  useClipboard,
} from '@chakra-ui/react';
import { VenomFoundation, VenomScanIcon } from 'components/logos';
import { SITE_PROFILE_URL, VENOMSCAN_NFT } from 'core/utils/constants';
import { sleep, truncAddress } from 'core/utils';
import React, { useEffect } from 'react';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useAtom, useAtomValue } from 'jotai';
import { Address } from 'everscale-inpage-provider';
import VenomAbi from 'abi/Collection.abi.json';
import { FaSignOutAlt, FaRegCopy } from 'react-icons/fa';
import LogoIcon from '../Layout/LogoIcon';
import { primaryNameAtom, venomContractAddressAtom, venomContractAtom } from 'core/atoms';

export default function ConnectButton() {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { login, disconnect, isConnected, account } = useConnect();
  const { provider } = useVenomProvider();
  const { colorMode } = useColorMode();
  const address = account?.address.toString();
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const venomContractAddress = useAtomValue(venomContractAddressAtom);
  const [venomContract, setVenomContract] = useAtom(venomContractAtom);
  const { onCopy } = useClipboard(String(address));

  async function getPrimary() {
    if (!provider) return;
    const _venomContract = new provider.Contract(VenomAbi, new Address(venomContractAddress));
    setVenomContract(_venomContract);
    // @ts-ignore: Unreachable code error
    const { value0 } = await _venomContract?.methods.getPrimaryName({ _owner: new Address(address) }).call();
    console.log(value0);
    if (value0) {
      setPrimaryName(value0);
    }
  }

  useEffect(() => {
    async function checkPrimary() {
      if (account && isConnected && provider) {
        if (!provider?.isInitialized) {
          console.log('provider not ready');
          await sleep(1000);
          checkPrimary();
          return;
        }
      }
      getPrimary();
    }
    checkPrimary();
  }, [account]);
  return (
    <>
      <Box>
        {!isConnected ? (
          <Button variant="solid" onClick={login}>
            <Center>
              <VenomFoundation />
              Connect
            </Center>
          </Button>
        ) : (
          <Menu>
            <MenuButton as={Button} minH={'46px'}>
              <Center>
                <VenomFoundation />
                <Stack gap={0} mx={1}>
                  <Text
                    fontWeight={colorMode === 'light' ? 'semibold' : 'light'}
                    textAlign={'left'}
                    my={'0 !important'}>
                    {primaryName?.name !== '' ? primaryName.name : truncAddress(String(address))}
                  </Text>
                  <Text
                    fontWeight={colorMode === 'light' ? 'semibold' : 'light'}
                    textAlign={'left'}
                    my={'0 !important'}
                    color="var(--venom1)">
                    {Math.round(Number(account?.balance) / 10e5) / 10e2} {notMobile ? 'VENOM' : ''}
                  </Text>
                </Stack>
              </Center>
            </MenuButton>
            <MenuList
              width={100}
              py={0}
              border={1}
              zIndex={199}
              borderColor={'grey'}
              bg={colorMode === 'light' ? 'var(--lightGrey)' : 'var(--darkGradient)'}>
              {primaryName.name !== '' && (
                <LinkBox as={MenuItem}>
                  <LinkOverlay
                    display="flex"
                    gap={2}
                    href={SITE_PROFILE_URL + primaryName.name}
                    target="_blank">
                    <LogoIcon />
                    View VenomID
                  </LinkOverlay>
                </LinkBox>
              )}
              <LinkBox as={MenuItem}>
                <LinkOverlay display="flex" gap={2} href={VENOMSCAN_NFT + address} target="_blank">
                  <VenomScanIcon />
                  View on VenomScan
                </LinkOverlay>
              </LinkBox>
              <MenuItem display="flex" gap={2} onClick={onCopy}>
                <FaRegCopy />
                Copy {truncAddress(String(address))}
              </MenuItem>
              <MenuItem onClick={disconnect} display="flex" gap={2}>
                <FaSignOutAlt /> Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </>
  );
}
