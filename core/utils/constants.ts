import { BgColorItem, BgImageItem, LinkType } from 'types';

export const SITE_URL = 'https://venomid.link/';
export const SITE_TITLE = 'Venom ID Profile';
export const SPACE_ID_TITLE = 'Space ID Profile';
export const SITE_DESCRIPTION = 'Your entire virtual identity in the blockchain in one simple link';
export const SITE_FULL_DESCRIPTION =
  'Venom IDentities (VID) serve as secure and easy-to-use domain names for managing your online presence. Venom IDentities (VID) are user-friendly solution to streamline your virtual identity management on the Venom blockchain. With VID, you can easily assign human-readable names to your blockchain and non-blockchain resources, such as Venom and Ethereum addresses, Social Media handles, website URLs, and more. VID enables these resources to be effectively managed and accessed via one, simple name.';
export const SITE_CLAIM_URL = 'https://venomid.network/';
export const SITE_SPACE_ID_URL = 'https://space.id/';
export const SITE_PROFILE_URL = 'https://venomid.link/';
export const VENOMSCAN_NFT = 'https://venomscan.com/accounts/';
export const BTCSCAN_ADDRESS = 'https://blockchair.com/bitcoin/';
export const ETHERSCAN_ADDRESS = 'https://etherscan.io/address/';
export const CONTRACT_ADDRESS =
  '0:5ecadfe4afcf90452bc448b5dabffeca63939bfce866f248d9493f57e748aff3';
export const CONTRACT_ADDRESS_V1 =
  '0:0f158efd58c06ff2f84726425de63d3deb4037d2c621ccd552cec61d6b6ee5bd';
export const CONTRACT_ADDRESS_V2 =
  '0:2787ba200fd3e45c1a4854768f69310fe4e9566383761f27936aff61ad79c8ab';
export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';
export const DONATE_VALUES: any = {
  venomtestnet: ['1 VENOM', '10 VENOM', '50 VENOM'],
  ethereum: ['0.001 ETH', '0.01 ETH', '0.05 ETH'],
  bitcoin: ['0.0001 BTC', '0.001 BTC', '0.005 BTC'],
  paypal: ['1 USD', '10 USD', '50 USD'],
};
export const IPFS_IMAGE_URI = 'https://ipfs';

export const ROOT_CONTRACT_ADDRESS = '0:2b353a0c36c4c86a48b0392c69017a109c8941066ed1747708fc63b1ac79e408';
export const TESTNET_ROOT_CONTRACT_ADDRESS = '0:72034dfba65f6d63b362e51add677c0549ff4e5a4e18c943acb54f953bb53660';
export const OLD_TESTNET_ROOT_CONTRACT_ADDRESS = '0:5475e9e7b9d178f4c35cd1136e83a100ca95e28b38c5c52d0689771372ba43ec';
export const TLD = 'venom';
export const MAX_NAME_LENGTH = 63;
export const MIN_NAME_LENGTH = 0;
export const EARLY_ADOPTERS_CONTRACT_ADDRESS = '0:9e0ea0f0fe6229aee6580a96fd9c62aabf6f2430830877c5b1ad700680ac0486';
export const IPFS_IO_URL = 'https://ipfs.io/ipfs/';
export const SOCIAL_TWITTER = 'venomid_network';
export const TWITTER_URL = 'https://twitter.com/';
export const GITHUB_URL = 'https://github.com/samshariat/venomidapp-manage';
export const MARKETPLACE_URLS: any = {
  venomtestnet: 'https://ventory.gg/nft/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const ETHERSCAN_URLS: any = {
  venomtestnet: 'https://venomscan.com/accounts/',
  venom: 'https://venomscan.com/accounts/',
  bitcoin: 'https://blockchair.com/bitcoin/address/',
  tron: 'https://tronscan.org/#/address/',
  avalanche: 'https://snowtrace.io/address/',
  ethereum: 'https://etherscan.io/address/',
  polygon: 'https://polygonscan.com/address/',
  binance: 'https://bscscan.com/address/',
  solana: 'https://solscan.io/account/',
  arbitrum: 'https://arbiscan.io/address/',
  optimism: 'https://optimistic.etherscan.io/address/',
};

export const IPFS_URLS = [
  'https://cf-ipfs.com/ipfs/',
  'https://gateway.ipfs.io/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://10.via0.com/ipfs/',
  'https://ipfs.cf-ipfs.com/',
];

export const BG_COLORS: BgColorItem[] = [
  { color: 'var(--darkGradient)', lightMode: false },
  { color: 'var(--dark)', lightMode: false },
  { color: 'var(--dark1)', lightMode: false },
  { color: 'var(--gray)', lightMode: true },
  { color: 'var(--lightGrey)', lightMode: true },
  { color: 'var(--lightGradient)', lightMode: true },
  { color: 'var(--venomGradient)', lightMode: false },
  { color: 'var(--purpleGradient)', lightMode: false },
  { color: 'var(--redGradient)', lightMode: false },
  { color: 'var(--blueGradient)', lightMode: true },
  { color: 'var(--orangeGradient)', lightMode: true },
  { color: 'var(--yellowGradient)', lightMode: true },
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: 'var(--bg1Gradient)', lightMode: false },
  { bg: 'var(--bg3Gradient)', lightMode: false },
  { bg: 'var(--bg2Gradient)', lightMode: true },
  { bg: 'var(--bg4Gradient)', lightMode: false },
  { bg: 'var(--bg5Gradient)', lightMode: false },
  { bg: 'var(--bg6Gradient)', lightMode: false },
  { bg: 'var(--bg7Gradient)', lightMode: false },
  { bg: 'var(--bg8Gradient)', lightMode: false },
  { bg: 'var(--bg9Gradient)', lightMode: false },
];

export const LINK_VALIDATION_REGEX =
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$';

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;

export const BUTTON_BG_COLORS = [
  'dark',
  'light',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];
export const BUTTON_ROUNDS = ['none', 'md', 'full'];
export const BUTTON_VARIANTS = ['solid', 'outline', 'pop', 'border', 'border2', 'fill'];
export const FONTS = ['Poppins', 'Lato', 'Pixelify Sans', 'Space Mono', 'Playfair Display', 'Jost'];

export const AVAILABLE_LINKS: LinkType[] = [
  { type: 'heading', av: true, reg: '' },
  { type: 'text paragraph', av: true, reg: '' },
  { type: 'nft link', av: true, reg: '' },
  { type: 'simple link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'image link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'tweet', av: true, reg: TWITTER_STATUS_REGEX },
  { type: 'ipfs image', av: true, reg: '' },
  { type: 'youtube video', av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: 'soundcloud track', av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: 'pdf document', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'donate button', av: true, reg: '' },
  { type: 'payment button', av: true, reg: '' },
  { type: 'nft gallery', av: false, reg: '' },
  { type: 'nft collection', av: false, reg: '' },
  { type: 'token link', av: false, reg: '' },
  { type: 'typeform', av: false, reg: '' },
  { type: 'contact form', av: false, reg: '' },
  { type: 'contact info', av: false, reg: '' },
];

export const SOCIAL_URLS: any = {
  twitter: 'twitter.com/',
  linkedin: 'linkedin.com/in/',
  github: 'github.com/',
  medium: 'medium.com/',
  youtube: 'youtube.com/',
  instagram: 'instagram.com/',
  tiktok: 'tiktok.com/',
  twitch: 'twitch.tv/',
  snapchat: 'snapchat.com/add/',
  facebook: 'facebook.com/',
  dribbble: 'dribbble.com/',
  pinterest: 'pinterest.com/',
  soundcloud: 'soundcloud.com/',
  spotify: 'open.spotify.com/user/',
  patreon: 'patreon.com/',
  substack: 'substack.com/',
  galxe: 'galxe.com/',
  opensea: 'opensea.io/',
  zealy: 'zealy.io/c/',
  ylide: 'hub.ylide.io/project/',
  amazon: 'amazon.com/gp/profile/eampleuser/',
  playstore: 'play.google.com/store/apps/developer?id=',
  appstore: 'apps.apple.com/us/developer/',
  applemusic: 'music.apple.com/profile/',
  clubhouse: 'joinclubhouse.com/',
  etsy: 'etsy.com/shop/',
  discord: 'discord.gg/',
  skype: 'skype:',
  slack: 'slack.com/',
  telegram: 't.me/',
  whatsapp: 'wa.me/',
  phone: 'tel:',
  email: 'mailto:',
};

export const RPCs: any = {
  eth: { rpc: 'https://ethereum.rpc.thirdweb.com', id: '1' },
  bnb: { rpc: 'https://binance.rpc.thirdweb.com', id: '56' },
  arb: { rpc: 'https://arbitrum.rpc.thirdweb.com', id: '42161' },
  manta: { rpc: 'https://manta-pacific.rpc.thirdweb.com', id: '169' },
};
