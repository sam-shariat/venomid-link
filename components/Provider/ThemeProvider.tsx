import { type ReactElement } from 'react';
import { ChakraProvider, extendTheme, type ThemeExtension } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { useAtomValue } from 'jotai';
import { fontAtom, localeAtom } from 'core/atoms';
import { Direction, Locale } from 'translations';
import '@fontsource/poppins';
import '@fontsource/lato';
import '@fontsource/pixelify-sans';
import '@fontsource/jost';
import '@fontsource/playfair-display';
import '@fontsource/space-mono';
import { buttonTheme } from './Theme/Button';
import { colors } from './Theme/Colors';

interface IThemeProvider {
  children: ReactElement;
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  const locale = useAtomValue(localeAtom);
  const font = useAtomValue(fontAtom);
  const direction = getDirection(locale);

  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
  };

  const fonts = {
    heading: font,
    body: font,
  };

  const components = {
    Button: buttonTheme
  }

  const styles = {
    global: (props: ThemeExtension) => ({
      body: {
        bg: mode('gray.100', 'var(--darkGradient)')(props),
      },
    }),
  };

  const theme = extendTheme({ config, styles, direction, fonts, components, colors });

  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const getDirection = (locale: string) => {
  switch (locale) {
    case Locale.Fa:
      return Direction.RightToLeft;

    default:
      return Direction.LeftToRight;
      break;
  }
};

export default ThemeProvider;
