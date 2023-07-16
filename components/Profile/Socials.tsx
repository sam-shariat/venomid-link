import Link from './Link';
import { Stack } from '@chakra-ui/react';
import {
  RiTwitterFill,
  RiDiscordFill,
  RiMediumFill,
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiPinterestFill,
  RiInstagramFill,
  RiSailboatFill,
  RiTwitterLine,
  RiDiscordLine,
  RiMediumLine,
  RiYoutubeLine,
  RiLinkedinLine,
  RiGithubLine,
  RiPinterestLine,
  RiInstagramLine,
  RiSailboatLine,
  RiTelegramFill,
  RiFacebookFill,
  RiTelegramLine,
  RiFacebookLine,
} from 'react-icons/ri';

interface Props {
    json: any
}

export default function Socials({json} : Props) {
  return (
    <>
      <Stack my={2}>
        {json.socials.twitter && (
          <Link
            icon={json.lineIcons ? <RiTwitterLine size="28" /> : <RiTwitterFill size="28" />}
            title="Twitter"
            url={json.socials.twitter}
          />
        )}
        {json.socials.discord && (
          <Link
            icon={json.lineIcons ? <RiDiscordLine size="28" /> : <RiDiscordFill size="28" />}
            title="Discord"
            url={json.socials.discord}
          />
        )}

        {json.socials.medium && (
          <Link
            icon={json.lineIcons ? <RiMediumLine size="28" /> : <RiMediumFill size="28" />}
            title="Medium"
            url={json.socials.medium}
          />
        )}

        {json.socials.linkedin && (
          <Link
            icon={json.lineIcons ? <RiLinkedinLine size="28" /> : <RiLinkedinFill size="28" />}
            title="LinkedIn"
            url={json.socials.linkedin}
          />
        )}

        {json.socials.youtube && (
          <Link
            icon={json.lineIcons ? <RiYoutubeLine size="28" /> : <RiYoutubeFill size="28" />}
            title="Youtube"
            url={json.socials.youtube}
          />
        )}
        {json.socials.github && (
          <Link
            icon={json.lineIcons ? <RiGithubLine size="28" /> : <RiGithubFill size="28" />}
            title="Github"
            url={json.socials.github}
          />
        )}
        {json.socials.pinterest && (
          <Link
            icon={json.lineIcons ? <RiPinterestLine size="28" /> : <RiPinterestFill size="28" />}
            title="Pinterest"
            url={json.socials.pinterest}
          />
        )}
        {json.socials.instagram && (
          <Link
            icon={json.lineIcons ? <RiInstagramLine size="28" /> : <RiInstagramFill size="28" />}
            title="Instagram"
            url={json.socials.instagram}
          />
        )}
        {json.socials.facebook && (
          <Link
            icon={json.lineIcons ? <RiFacebookLine size="28" /> : <RiFacebookFill size="28" />}
            title="Facebook"
            url={json.socials.facebook}
          />
        )}
        {json.socials.opensea && (
          <Link
            icon={json.lineIcons ? <RiSailboatLine size="28" /> : <RiSailboatFill size="28" />}
            title="Opensea"
            url={json.socials.opensea}
          />
        )}
        {json.socials.telegram && (
          <Link
            icon={json.lineIcons ? <RiTelegramLine size="28" /> : <RiTelegramFill size="28" />}
            title="Telegram"
            url={json.socials.telegram}
          />
        )}
        
      </Stack>
    </>
  );
}
