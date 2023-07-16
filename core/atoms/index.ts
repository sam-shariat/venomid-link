import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { initialAuthState } from './initialState';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { CONTRACT_ADDRESS } from 'core/utils/constants';
import { PrimaryName } from 'types';

const walletAtom = atom<VenomConnect | undefined>(undefined);
const primaryNameAtom = atom<PrimaryName>({name:''});
const venomProviderAtom = atom<any>(undefined);
const jsonAtom = atom<any>(undefined);
const nameAtom = atom("");
const btcAtom = atom("");
const ethAtom = atom("");
const bioAtom = atom("");
const avatarAtom = atom("");
const twitterAtom = atom("");
const discordAtom = atom("");
const mediumAtom = atom("");
const youtubeAtom = atom("");
const pinterestAtom = atom("");
const linkedinAtom = atom("");
const githubAtom = atom("");
const instagramAtom = atom("");
const openseaAtom = atom("");
const facebookAtom = atom("");
const telegramAtom = atom("");
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
  twitterAtom,
  discordAtom,
  mediumAtom,
  youtubeAtom,
  pinterestAtom,
  linkedinAtom,
  githubAtom,
  instagramAtom,
  openseaAtom,
  facebookAtom,
  telegramAtom,
  balanceAtom,
  venomContractAtom,
  venomContractAddressAtom,
  localeAtom,
  authAtom,
  hydratedAtom,
  primaryNameAtom
};
