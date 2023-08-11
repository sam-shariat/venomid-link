import { type ReactElement } from 'react';
import { ChakraProvider, extendTheme, type ThemeExtension } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { useAtomValue } from 'jotai';
import { localeAtom } from 'core/atoms';
import { Direction, Locale } from 'translations';
import '@fontsource/poppins';
import '@fontsource/lato';

interface IThemeProvider {
  children: ReactElement;
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  const locale = useAtomValue(localeAtom);
  const direction = getDirection(locale);

  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
  };

  const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Lato', sans-serif`,
  };

  const components = {
    Button: {
      baseStyle:{
        fontFamily : `'Poppins', sans-serif`
      }
    }
  }

  const styles = {
    global: (props: ThemeExtension) => ({
      body: {
        bg: mode('gray.100', 'var(--darkGradient)')(props),
      },
    }),
  };

  const theme = extendTheme({ config, styles, direction, fonts, components });

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
