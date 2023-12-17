import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { SITE_URL } from 'core/utils/constants';

interface Props {
  text: string;
  image?: string;
  hashtags?: string;
  url: string;
}
export default function ShareButtons({ text, image, url, hashtags }: Props) {
  const { colorMode } = useColorMode();
  const shareProfile = async () => {
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
    window.open(href);
  };

  return (
    <Button size={'lg'} w={'100%'} gap={2} display={'flex'} flexDirection={'row'} onClick={shareProfile}>
      <LinkIcon type="x" />
      Contribute By Posting
    </Button>
  );
}
