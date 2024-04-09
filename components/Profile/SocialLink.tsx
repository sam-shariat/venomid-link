import {
  Button,
  Tooltip,
  IconButton,
  useColorMode,
  Text,
  Link as ChakraLink,
  useMediaQuery,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  roundAtom,
  useLineIconsAtom,
  variantAtom,
} from 'core/atoms';
import { getColor, getIconColor, getIconInButtonColor, getUrl } from 'core/utils';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

interface Props {
  title: string;
  url: string;
  onlyIcon: boolean;
  color?: string;
}



export default function SocialLink({ title, url, onlyIcon, color }: Props) {
  const lightMode = useAtomValue(lightModeAtom);
  const lineMode = useAtomValue(useLineIconsAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const font = useAtomValue(fontAtom);
  const [hover, setHover] = useState(false);
  const finalUrl = getUrl(title.toLowerCase(),url) ;

  return (
    <>
      {onlyIcon ? (
        <ChakraLink href={finalUrl} target="_blank" id={`venom-id-${title}-link`}>
          <Tooltip
            borderRadius={4}
            label={<Text p={2}>{title}</Text>}
            color="white"
            bgColor={'black'}
            fontFamily={font}
            placement="top"
            hasArrow>
            <IconButton
              variant="outline"
              border={0}
              aria-label={title + '-link'}
              key={title + '-link' + (lightMode ? 'light' : 'dark')}>
              <LinkIcon
                line={lineMode ?? false}
                type={title.toLowerCase()}
                color={color ? color : getIconColor(lightMode)}
              />
            </IconButton>
          </Tooltip>
        </ChakraLink>
      ) : (
        <ChakraLink href={finalUrl} target="_blank" id={`venom-id-${title}-link`} _hover={{textDecoration:'none'}}>
          <Button
            size={'lg'}
            fontSize={'lg'}
            height={'64px'}
            display={'flex'}
            gap={2}
            rounded={round}
            variant={variant}
            colorScheme={buttonBg}
            color={
              variant === 'fill' && hover
                ? getColor('pop', buttonBg, lightMode)
                : getColor(variant, buttonBg, lightMode)
            }
            onMouseEnter={() => setHover(true)}
            onMouseMove={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            px={3}
            w={'100%'}>
            
              <LinkIcon
                line={lineMode ?? false}
                type={title.toLowerCase()}
                color={
                  variant === 'fill' && hover
                      ? getIconInButtonColor('pop', buttonBg, lightMode)
                      : getIconInButtonColor(variant, buttonBg, lightMode)
                }
                size={36}
              />
            <Text
              onMouseEnter={() => setHover(true)}
              w={'100%'} 
              textAlign={'center'}
              color={
                variant === 'fill' && hover
                  ? getColor('pop', buttonBg, lightMode)
                  : getColor(variant, buttonBg, lightMode)
              }>
              {title}
            </Text>
          </Button>
        </ChakraLink>
      )}
    </>
  );
}
