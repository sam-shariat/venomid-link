import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { initialAuthState } from './initialState';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { CONTRACT_ADDRESS } from 'core/utils/constants';
import { PrimaryName, CustomLink, ObjectItem } from 'types';

const walletAtom = atom<VenomConnect | undefined>(undefined);
const primaryNameAtom = atom<PrimaryName>({name:''});
const venomProviderAtom = atom<any>(undefined);
const jsonAtom = atom<any>({
  name: '',
  venomAddress: '',
  btcAddress: '',
  ethAddress: '',
  bio: '',
  avatar: '',
  socials: {},
  links:[],
  lineIcons: false,
  bgColor: '',
  color: ''
});
const nftJsonAtom = atom<any>(undefined);
const nameAtom = atom("");
const socialsArrayAtom = atom<ObjectItem[]>([]);
const linksArrayAtom = atom<CustomLink[]>([]);
const btcAtom = atom("");
const ethAtom = atom("");
const bioAtom = atom("");
const avatarAtom = atom("");
const addressAtom = atom("");
const jsonHashAtom = atom("");
const balanceAtom = atom('0');
const venomContractAddressAtom = atom(CONTRACT_ADDRESS)
const venomSProviderAtom = atom<ProviderRpcClient | undefined>(undefined);
const venomContractAtom = atom<any>(undefined);
const nftContractAtom = atom<any>(undefined);
const isConnectedAtom = atom(false);
const hydratedAtom = atom<boolean>(false);
const useLineIconsAtom = atom<boolean>(false);
const lightModeAtom = atom<boolean>(false);
const authAtom = atomWithStorage('user', initialAuthState);
const localeAtom = atomWithStorage<string>('locale', 'en');
const colorModeAtom = atomWithStorage<string>('colorM','dark');
export {
  isConnectedAtom,
  socialsArrayAtom,
  linksArrayAtom,
  nftJsonAtom,
  colorModeAtom,
  useLineIconsAtom,
  lightModeAtom,
  nftContractAtom,
  walletAtom,
  jsonAtom,
  jsonHashAtom,
  nameAtom,
  venomProviderAtom,
  venomSProviderAtom,
  addressAtom,
  btcAtom,
  bioAtom,
  avatarAtom,
  ethAtom,
  balanceAtom,
  venomContractAtom,
  venomContractAddressAtom,
  localeAtom,
  authAtom,
  hydratedAtom,
  primaryNameAtom
};
