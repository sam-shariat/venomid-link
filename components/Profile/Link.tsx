import {
  Button,
  useColorMode,
  Box,
  Text,
  Link as ChakraLink,
  Stack,
  useMediaQuery,
  AspectRatio,
} from '@chakra-ui/react';
import ImageLink from './ImageLink';
import { withHttps } from 'core/utils';

interface Props {
  type: string;
  title: string;
  url: string;
  icon?: JSX.Element;
  image?: string;
  content?: string;
}

export default function Link({ type, icon, title, url, image, content }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');

  return (
    <>
      {type === 'simple link' && (
        <ChakraLink href={withHttps(url)} target="_blank" id={`venom-id-${title}-link`}>
          <Button
            size="lg"
            minWidth={notMobile ? 'md' : '100%'}
            backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}>
            {icon}
            <Text px={2}>{title}</Text>
          </Button>
        </ChakraLink>
      )}
      {type === 'simple text' && (
        <Stack gap={2}>
          <Text p={2} fontWeight={'bold'} fontSize="xl" textAlign="center">
            {title}
          </Text>
          {content && <Text p={2}>{content}</Text>}
        </Stack>
      )}
      {type === 'image link' && (
        <ChakraLink borderRadius={12} href={withHttps(url)} target="_blank" id={`venom-id-${title}-link`}>
          <ImageLink url={image} alt={title} />
        </ChakraLink>
      )}

      {type === 'ipfs image' && <ImageLink url={image} alt={title} />}

      {type === 'youtube video' && (
        <Box borderRadius={12} py={4}>
          <AspectRatio ratio={16 / 9} maxW={notMobile ? 'md' : '100%'}>
            <iframe
              src={`https://www.youtube.com/embed/${url.slice(url.indexOf('?v=') + 3, url.length)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{borderRadius:12}}
              title="Embedded youtube"
            />
          </AspectRatio>
        </Box>
      )}
    </>
  );
}
