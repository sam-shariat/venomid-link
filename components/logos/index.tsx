import VenomFoundation from './VenomFoundation';
import BTC from './BTC';
import ETH from './ETH';
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
  RiPhoneFill
} from 'react-icons/ri';

interface SocialIconProps {
  name: string;
  line?: boolean;
}

interface LinkIconProps {
  type: string;
  line?: boolean;
}

const SocialIcon = ({ name, line }: SocialIconProps) => {
  switch (name) {
    case 'twitter':
      return line ? <RiTwitterLine size="28" /> : <RiTwitterFill size="28" />;
    case 'linkedin':
      return line ? <RiLinkedinLine size="28" /> : <RiLinkedinFill size="28" />;
    case 'medium':
      return line ? <RiMediumLine size="28" /> : <RiMediumFill size="28" />;
    case 'telegram':
      return line ? <RiTelegramLine size="28" /> : <RiTelegramFill size="28" />;
    case 'facebook':
      return line ? <RiFacebookLine size="28" /> : <RiFacebookFill size="28" />;
    case 'discord':
      return line ? <RiDiscordLine size="28" /> : <RiDiscordFill size="28" />;
    case 'youtube':
      return line ? <RiYoutubeLine size="28" /> : <RiYoutubeFill size="28" />;
    case 'github':
      return line ? <RiGithubLine size="28" /> : <RiGithubFill size="28" />;
    case 'pinterest':
      return line ? <RiPinterestLine size="28" /> : <RiPinterestFill size="28" />;
    case 'instagram':
      return line ? <RiInstagramLine size="28" /> : <RiInstagramFill size="28" />;
    case 'opensea':
      return line ? <RiSailboatLine size="28" /> : <RiSailboatFill size="28" />;
    case 'zealy':
      return line ? <Zealy/> : <Zealy/>;
    case 'galxe':
      return line ? <Galxe /> : <Galxe />;
    case 'email':
      return line ? <RiMailLine size="28" /> : <RiMailFill size="28" />;
    case 'phone':
      return line ? <RiPhoneLine size="28" /> : <RiPhoneFill size="28" />;
    case 'whatsapp':
      return line ? <RiWhatsappLine size="28" /> : <RiWhatsappFill size="28" />;
  }
};

const LinkIcon = ({ type, line }: LinkIconProps) => {
  switch (type) {
    case 'twitter':
      return line ? <RiTwitterLine size="28" /> : <RiTwitterFill size="28" />;
    case 'linkedin':
      return line ? <RiLinkedinLine size="28" /> : <RiLinkedinFill size="28" />;
    case 'medium':
      return line ? <RiMediumLine size="28" /> : <RiMediumFill size="28" />;
    case 'telegram':
      return line ? <RiTelegramLine size="28" /> : <RiTelegramFill size="28" />;
    case 'facebook':
      return line ? <RiFacebookLine size="28" /> : <RiFacebookFill size="28" />;
    case 'discord':
      return line ? <RiDiscordLine size="28" /> : <RiDiscordFill size="28" />;
    case 'youtube':
      return line ? <RiYoutubeLine size="28" /> : <RiYoutubeFill size="28" />;
    case 'github':
      return line ? <RiGithubLine size="28" /> : <RiGithubFill size="28" />;
    case 'pinterest':
      return line ? <RiPinterestLine size="28" /> : <RiPinterestFill size="28" />;
    case 'instagram':
      return line ? <RiInstagramLine size="28" /> : <RiInstagramFill size="28" />;
    case 'opensea':
      return line ? <RiSailboatLine size="28" /> : <RiSailboatFill size="28" />;
    case 'zealy':
      return line ? <Zealy/> : <Zealy/>;
    case 'galxe':
      return line ? <Galxe /> : <Galxe />;
    case 'email':
      return line ? <RiMailLine size="28" /> : <RiMailFill size="28" />;
    case 'phone':
      return line ? <RiPhoneLine size="28" /> : <RiPhoneFill size="28" />;
    case 'whatsapp':
      return line ? <RiWhatsappLine size="28" /> : <RiWhatsappFill size="28" />;
  }
};
export { VenomFoundation, BTC, ETH, VenomScanIcon, SocialIcon, LinkIcon, Zealy, Metamask };
