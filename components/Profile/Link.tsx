import {
  Button,
  useColorMode,
  Box,
  Text,
  Link as ChakraLink,
  Stack,
  useMediaQuery,
  AspectRatio,
  Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import NftLink from './NftLink';
import ImageLink from './ImageLink';
import { getColor, withHttps } from 'core/utils';
import { Styles } from 'types';
import {
  buttonBgColorAtom,
  lightModeAtom,
  openEmbedModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { Tweet } from 'react-twitter-widgets';
import ReactPlayer from 'react-player/lazy';
import { AVAILABLE_LINKS } from 'core/utils/constants';
import Donate from './Donate';
import Pay from './Pay';
import EmbedModal from './EmbedModal';

interface Props {
  type: string;
  title: string;
  url: string;
  icon?: JSX.Element;
  image?: string;
  content?: string;
  styles?: Styles;
  color?: string;
}

export default function Link({ type, icon, title, url, image, content, styles, color }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const lightMode = useAtomValue(lightModeAtom);
  const openEmbedModal = useSetAtom(openEmbedModalAtom);
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? '';
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {(type === 'simple link' || type === 'pdf document') && (
        <ChakraLink
          width={'100%'}
          href={styles?.popup ? '#' : withHttps(url)}
          onClick={(e) => {
            if (styles?.popup) {
              e.preventDefault();
              openEmbedModal(true);
            }
          }}
          target="_blank"
          id={`venom-id-${title}-link`}>
          <Button
            size={styles?.size === 'sm' ? 'md' : 'lg'}
            fontSize={styles?.size === 'lg' ? 'xl' : styles?.size === 'md' ? 'lg' : 'md'}
            height={styles?.size === 'lg' ? '68px' : styles?.size === 'md' ? '48px' : '40px'}
            rounded={round}
            variant={variant}
            colorScheme={buttonBg}
            color={getColor(variant, buttonBg, lightMode)}
            width={'100%'}>
            {icon}
            <Text px={2}>{title}</Text>
          </Button>
        </ChakraLink>
      )}

      {(type === 'simple text' || type === 'text') && (
        <Stack gap={2} w={'100%'}>
          {!content && (
            <Text p={2} fontWeight={'bold'} fontSize="xl" textAlign="center">
              {title}
            </Text>
          )}
          {content && <Text p={2}>{content}</Text>}
        </Stack>
      )}

      {type === 'heading' && (
        <Stack gap={2} w={'100%'}>
          <Text p={2} fontWeight={'bold'} fontSize="xl" textAlign="center">
            {title}
          </Text>
        </Stack>
      )}

      {type === 'nft link' && (
        <NftLink
          url={String(image)}
          link={url}
          title={title}
          address={String(content)}
          styles={styles}
          alt={title}
          color={color ? color : 'default'}
        />
      )}

      {type === 'image link' && (
        <ChakraLink
          w={'100%'}
          href={styles?.popup ? '#' : withHttps(url)}
          onClick={(e) => {
            if (styles?.popup) {
              e.preventDefault();
              openEmbedModal(true);
            }
          }}
          target="_blank"
          id={`venom-id-${title}-link`}>
          <ImageLink url={String(image)} alt={title} />
        </ChakraLink>
      )}

      {type === 'ipfs image' && (
        <Box
          w={'100%'}
          cursor={styles?.popup ? 'pointer' : 'default'}
          onClick={(e) => {
            if (styles?.popup) {
              openEmbedModal(true);
            }
          }}
          id={`venom-id-${type}-${title}-link`}>
          <ImageLink url={String(image)} alt={title} />
        </Box>
      )}

      {/* {styles?.popup
        ? (type.includes('link') || type.includes('image') || type.includes('pdf')) && (
            <EmbedModal title={title} url={String(url ? url : image)} style={styles} type={type} key={title+'-'+type+'-link-modal'} />
          )
        : null} */}

      {type === 'youtube video' && (
        <Box>
          <AspectRatio ratio={16 / 9} maxW={notMobile ? 'md' : '100%'}>
            <iframe
              src={`https://www.youtube.com/embed/${url.match(reg)?.at(1)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              title={title}
              style={{
                borderRadius: round === 'none' ? 0 : round === 'md' ? 8 : 16,
                backgroundColor: lightMode ? 'white' : 'black',
              }}
            />
          </AspectRatio>
        </Box>
      )}

      {type === 'donate button' && (
        <Donate title={title} content={String(content)} style={styles} />
      )}

      {type === 'payment button' && <Pay title={title} content={String(content)} style={styles} />}

      {type === 'tweet' && (
        <Box w={'100%'} borderRadius={round === 'none' ? 0 : round === 'md' ? 8 : 16}>
          <Tweet
            tweetId={String(url.match(reg)?.at(2))}
            onLoad={() => setIsLoading(false)}
            options={{ theme: lightMode ? 'light' : 'dark', width: '100%', height: '200px' }}
          />
          {isLoading && <Skeleton width={'100%'} rounded={'lg'} height={'200px'} />}
        </Box>
      )}

      {type === 'soundcloud track' && (
        <Box w={'100%'} borderRadius={round === 'none' ? 0 : round === 'md' ? 8 : 16}>
          {
            <ReactPlayer
              url={url}
              config={{
                soundcloud: {
                  options: { show_comments: false, show_playcount: false, show_user: false },
                },
              }}
              width={'100%'}
              height={styles?.size === 'lg' ? '320px' : styles?.size === 'md' ? '160px' : '80px'}
              style={{ borderRadius: round === 'none' ? 0 : round === 'md' ? 8 : 16 }}
            />
          }
        </Box>
      )}
    </>
  );
}
