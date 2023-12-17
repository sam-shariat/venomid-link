import {
  Button,
  Tooltip,
  IconButton,
  useColorMode,
  Text,
  useMediaQuery,
  useClipboard,
  Flex,
  Link,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { buttonBgColorAtom, fontAtom, lightModeAtom, roundAtom, variantAtom } from 'core/atoms';
import { capFirstLetter, getColor, getIconInButtonColor } from 'core/utils';
import { ETHERSCAN_URLS } from 'core/utils/constants';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { RiCheckDoubleFill, RiFileCopyLine } from 'react-icons/ri';

interface Props {
  title: string;
  url: string;
  onlyIcon: boolean;
  color?: string;
}
export default function WalletLink({ title, url, onlyIcon, color }: Props) {
  const { onCopy, hasCopied } = useClipboard(String(url));
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const font = useAtomValue(fontAtom);
  const [hover, setHover] = useState(false);

  return (
    <>
      {onlyIcon ? (
        <Tooltip
          borderRadius={4}
          label={
            <Text p={2}>
              {hasCopied ? 'Copied' : 'Copy'} {title} Address
            </Text>
          }
          color="white"
          bgColor={'black'}
          hasArrow>
          <IconButton
            onClick={onCopy}
            variant="ghost"
            colorScheme={buttonBg}
            aria-label={`copy-${title}-address`}>
            {hasCopied ? (
              <RiCheckDoubleFill size={22} />
            ) : (
              <LinkIcon
                color={getIconInButtonColor(variant, buttonBg, lightMode)}
                type={title.toLowerCase()}
              />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          size="lg"
          display={'flex'}
          onClick={onCopy}
          justifyContent={'space-between'}
          rounded={round}
          variant={variant}
          colorScheme={buttonBg}
          fontFamily={font}
          color={
            variant === 'fill' && hover
              ? getColor('pop', buttonBg, lightMode)
              : getColor(variant, buttonBg, lightMode)
          }
          onMouseEnter={() => setHover(true)}
          onMouseMove={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          w={'100%'}>
          <Text
            onMouseEnter={() => setHover(true)}
            color={
              variant === 'fill' && hover
                ? getColor('pop', buttonBg, lightMode)
                : getColor(variant, buttonBg, lightMode)
            }>
            {capFirstLetter(title)} Address
          </Text>
          <Flex>
            <Tooltip
              borderRadius={4}
              label={<Text p={2}>View on Explorer</Text>}
              color="white"
              fontFamily={font}
              bgColor={'black'}
              hasArrow>
              <IconButton
                border={0}
                bg={'none'}
                as={Link}
                href={ETHERSCAN_URLS[title.toLowerCase()] + url}
                target='_blank'
                color={
                  variant === 'fill' && hover
                    ? getColor('pop', buttonBg, lightMode)
                    : getColor(variant, buttonBg, lightMode)
                }
                variant={
                  variant !== 'outline' && !variant.includes('border') && variant !== 'outline'
                    ? 'solid'
                    : 'outline'
                }
                aria-label={`view-${title}-on-blockchain-explorer`}>
                <LinkIcon
                  color={
                    variant === 'fill' && hover
                      ? getIconInButtonColor('pop', buttonBg, lightMode)
                      : getIconInButtonColor(variant, buttonBg, lightMode)
                  }
                  type={title.toLowerCase()}
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              borderRadius={4}
              label={<Text p={2}>Copy {title} Address</Text>}
              color="white"
              bgColor={'black'}
              fontFamily={font}
              hasArrow>
              <IconButton
                onClick={onCopy}
                variant={variant !== 'outline' ? 'solid' : 'outline'}
                border={0}
                bg={'none'}
                color={
                  variant === 'fill' && hover
                    ? getColor('pop', buttonBg, lightMode)
                    : getColor(variant, buttonBg, lightMode)
                }
                aria-label={`copy-${title}-address`}>
                {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
              </IconButton>
            </Tooltip>
          </Flex>
        </Button>
      )}
    </>
  );
}
