import VenomFoundation from './VenomFoundation';
import VenomScanIcon from './VenomScan';
import Zealy from './Zealy';
import Galxe from './Galxe';
import Metamask from './Metamask';
import {
  RiTwitterFill,
  RiTelegramFill,
  RiFacebookFill,
  RiDiscordFill,
  RiMediumFill,
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiPinterestFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiSailboatFill,
  RiTwitterLine,
  RiTelegramLine,
  RiFacebookLine,
  RiDiscordLine,
  RiMediumLine,
  RiYoutubeLine,
  RiLinkedinLine,
  RiGithubLine,
  RiPinterestLine,
  RiInstagramLine,
  RiWhatsappLine,
  RiSailboatLine,
  RiMailLine,
  RiMailFill,
  RiPhoneLine,
  RiPhoneFill,
  RiLinksFill,
  RiLinksLine,
  RiImage2Line,
  RiImage2Fill,
  RiText,
  RiImageFill,
  RiImageLine,
  RiVideoFill,
  RiVideoLine,
  RiHeading,
  RiFilePdfFill,
  RiFilePdfLine,
  RiFileGifFill,
  RiFileGifLine,
  RiServiceLine,
  RiServiceFill,
  RiP2PLine,
  RiP2PFill,
  RiMoreLine,
  RiMoreFill,
  RiSnapchatLine,
  RiSnapchatFill,
  RiDribbbleLine,
  RiDribbbleFill,
  RiTiktokLine,
  RiTiktokFill,
  RiTwitchLine,
  RiTwitchFill,
  RiSkypeLine,
  RiSkypeFill,
  RiSoundcloudLine,
  RiSoundcloudFill,
  RiSpotifyLine,
  RiSpotifyFill,
  RiPatreonLine,
  RiPatreonFill,
  RiSlackLine,
  RiSlackFill,
  RiAmazonLine,
  RiAmazonFill,
  RiAppStoreLine,
  RiAppStoreFill,
  RiGooglePlayLine,
  RiMusic2Fill,
  RiMusic2Line,
  RiGooglePlayFill,
} from 'react-icons/ri';
import { PiHandWaving, PiHandWavingFill } from 'react-icons/pi';
import { SiEtsy, SiSubstack } from 'react-icons/si';
import { NftFill, NftLine } from './NFT';
import Polygon from './Polygon';
import Arbitrum from './Arbitrum';
import Optimism from './Optimism';
import Logo from './Logo';
import LogoIcon from './LogoIcon';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Binance from './Binance';
import Avalanche from './Avalanche';
import Solana from './Solana';
import Tron from './Tron';
import Ylide from './Ylide';
import * as Icons from 'react-icons/ri';

interface LinkIconProps {
  type: string;
  line?: boolean;
  color?: string;
  size?: string;
}

const LinkIcon = ({ type, line, color, size='28px' }: LinkIconProps) => {
  switch (type) {
    case 'x':
    case 'twitter':
    case 'tweet':
      return line ? (
        <FaXTwitter size={size} color={color ? color : undefined} />
      ) : (
        <FaXTwitter size={size} color={color ? color : undefined} />
      );
    case 'linkedin':
      return line ? (
        <RiLinkedinLine size={size} color={color ? color : undefined} />
      ) : (
        <RiLinkedinFill size={size} color={color ? color : undefined} />
      );
    case 'medium':
      return line ? (
        <RiMediumLine size={size} color={color ? color : undefined} />
      ) : (
        <RiMediumFill size={size} color={color ? color : undefined} />
      );
    case 'telegram':
      return line ? (
        <RiTelegramLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTelegramFill size={size} color={color ? color : undefined} />
      );
    case 'facebook':
      return line ? (
        <RiFacebookLine size={size} color={color ? color : undefined} />
      ) : (
        <RiFacebookFill size={size} color={color ? color : undefined} />
      );
    case 'discord':
      return line ? (
        <RiDiscordLine size={size} color={color ? color : undefined} />
      ) : (
        <RiDiscordFill size={size} color={color ? color : undefined} />
      );
    case 'youtube':
      return line ? (
        <RiYoutubeLine size={size} color={color ? color : undefined} />
      ) : (
        <RiYoutubeFill size={size} color={color ? color : undefined} />
      );
    case 'github':
      return line ? (
        <RiGithubLine size={size} color={color ? color : undefined} />
      ) : (
        <RiGithubFill size={size} color={color ? color : undefined} />
      );
    case 'pinterest':
      return line ? (
        <RiPinterestLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPinterestFill size={size} color={color ? color : undefined} />
      );
    case 'amazon':
      return line ? (
        <RiAmazonLine size={size} color={color ? color : undefined} />
      ) : (
        <RiAmazonFill size={size} color={color ? color : undefined} />
      );
    case 'clubhouse':
      return line ? (
        <PiHandWaving size={size} color={color ? color : undefined} />
      ) : (
        <PiHandWavingFill size={size} color={color ? color : undefined} />
      );
    case 'app store':
      return line ? (
        <RiAppStoreLine size={size} color={color ? color : undefined} />
      ) : (
        <RiAppStoreFill size={size} color={color ? color : undefined} />
      );
    case 'apple music':
      return line ? (
        <RiMusic2Line size={size} color={color ? color : undefined} />
      ) : (
        <RiMusic2Fill size={size} color={color ? color : undefined} />
      );
    case 'play store':
      return line ? (
        <RiGooglePlayLine size={size} color={color ? color : undefined} />
      ) : (
        <RiGooglePlayFill size={size} color={color ? color : undefined} />
      );
    case 'substack':
      return line ? (
        <SiSubstack size={size} color={color ? color : undefined} />
      ) : (
        <SiSubstack size={size} color={color ? color : undefined} />
      );
    case 'etsy':
      return line ? (
        <SiEtsy size={size} color={color ? color : undefined} />
      ) : (
        <SiEtsy size={size} color={color ? color : undefined} />
      );
    case 'instagram':
      return line ? (
        <RiInstagramLine size={size} color={color ? color : undefined} />
      ) : (
        <RiInstagramFill size={size} color={color ? color : undefined} />
      );
    case 'snapchat':
      return line ? (
        <RiSnapchatLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSnapchatFill size={size} color={color ? color : undefined} />
      );
    case 'dribbble':
      return line ? (
        <RiDribbbleLine size={size} color={color ? color : undefined} />
      ) : (
        <RiDribbbleFill size={size} color={color ? color : undefined} />
      );
    case 'tiktok':
      return line ? (
        <RiTiktokLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTiktokFill size={size} color={color ? color : undefined} />
      );
    case 'twitch':
      return line ? (
        <RiTwitchLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTwitchFill size={size} color={color ? color : undefined} />
      );
    case 'skype':
      return line ? (
        <RiSkypeLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSkypeFill size={size} color={color ? color : undefined} />
      );
    case 'soundcloud':
    case 'soundcloud track':
      return line ? (
        <RiSoundcloudLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size={size} color={color ? color : undefined} />
      );
    case 'spotify':
      return line ? (
        <RiSpotifyLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSpotifyFill size={size} color={color ? color : undefined} />
      );
    case 'patreon':
      return line ? (
        <RiPatreonLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPatreonFill size={size} color={color ? color : undefined} />
      );
    case 'slack':
      return line ? (
        <RiSlackLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSlackFill size={size} color={color ? color : undefined} />
      );
    case 'opensea':
      return line ? (
        <RiSailboatLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSailboatFill size={size} color={color ? color : undefined} />
      );
    case 'zealy':
      return line ? (
        <Zealy color={color ? color : undefined} />
      ) : (
        <Zealy color={color ? color : undefined} />
      );
    case 'galxe':
      return line ? (
        <Galxe color={color ? color : undefined} />
      ) : (
        <Galxe color={color ? color : undefined} />
      );
    case 'email':
      return line ? (
        <RiMailLine size={size} color={color ? color : undefined} />
      ) : (
        <RiMailFill size={size} color={color ? color : undefined} />
      );
    case 'phone':
      return line ? (
        <RiPhoneLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPhoneFill size={size} color={color ? color : undefined} />
      );
    case 'whatsapp':
      return line ? (
        <RiWhatsappLine size={size} color={color ? color : undefined} />
      ) : (
        <RiWhatsappFill size={size} color={color ? color : undefined} />
      );
    case 'soundcloud song':
      return line ? (
        <RiSoundcloudLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size={size} color={color ? color : undefined} />
      );
    case 'nft link':
      return line ? <NftLine /> : <NftFill />;
    case 'simple link':
      return line ? <RiLinksLine size={size} /> : <RiLinksFill size={size} />;
    case 'image link':
    case 'image/png':
    case 'image/svg':
    case 'image/svg+xml':
    case 'image/jpeg':
      return line ? <RiImage2Line size={size} /> : <RiImage2Fill size={size} />;
    case 'youtube video':
      return line ? <RiYoutubeLine size={size} /> : <RiYoutubeFill size={size} />;
    case 'text':
    case 'text paragraph':
    case 'simple text':
      return line ? <RiText size={size} /> : <RiText size={size} />;
    case 'heading':
      return line ? <RiHeading size={size} /> : <RiHeading size={size} />;
    case 'ipfs video':
    case 'video/mp4':
    case 'mp4':
      return line ? <RiVideoLine size={size} /> : <RiVideoFill size={size} />;
    case 'ipfs image':
      return line ? <RiImageLine size={size} /> : <RiImageFill size={size} />;
    case 'pdf document':
    case 'pdf doc':
    case 'pdf':
    case 'application/pdf':
      return line ? <RiFilePdfLine size={size} /> : <RiFilePdfFill size={size} />;
    case 'venom testnet':
    case 'venom':
    case 'venomtestnet':
      return <VenomFoundation color={color ? color : undefined} />;
    case 'donate':
    case 'donate button':
      return line ? <RiServiceLine size={size} /> : <RiServiceFill size={size} />;
    case 'pay':
    case 'pay button':
    case 'payment':
    case 'payment button':
      return line ? <RiP2PLine size={size} /> : <RiP2PFill size={size} />;
    case 'more':
      return line ? <RiMoreLine size={size} /> : <RiMoreFill size={size} />;
    case 'ethereum':
    case 'eth':
      return <FaEthereum size={size} color={color ? color : undefined} />;
    case 'bitcoin':
    case 'btc':
      return <FaBitcoin size={size} color={color ? color : undefined} />;
    case 'arbitrum':
    case 'arb':
      return <Arbitrum color={color ? color : undefined} />;
    case 'polygon':
    case 'matic':
      return <Polygon color={color ? color : undefined} />;
    case 'optimism':
    case 'opt':
      return <Optimism color={color ? color : undefined} />;
    case 'binance':
    case 'bsc':
      return <Binance color={color ? color : undefined} />;
    case 'avalanche':
    case 'avax':
      return <Avalanche color={color ? color : undefined} />;
    case 'solana':
    case 'sol':
      return <Solana color={color ? color : undefined} />;
    case 'ylide':
      return <Ylide color={color ? color : undefined} />;
    case 'tron':
    case 'trx':
      return <Tron color={color ? color : undefined} />;
    case 'image/gif':
    case 'gif':
      return line ? <RiFileGifLine size={size} /> : <RiFileGifFill size={size} />;
    default:
      //// console.log('here : ', type);
      if (type.indexOf('Ri') === 0) {

        const SelectedIcon = Icons[type as keyof typeof Icons];

        return <SelectedIcon size={size} />;
      } else {
        return <></>
      }
  }
};
export { Logo, LogoIcon, VenomFoundation, VenomScanIcon, LinkIcon, Zealy, Metamask };
