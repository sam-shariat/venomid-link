import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const popVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.500`,
    fontWeight: 'semibold',
    color: c === 'dark' ? 'white' : 'gray.800',
    borderRadius: 'none',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _dark: {
      bg: `${c}.200`,
      color: c === 'dark' ? 'white' : 'gray.800',
    },

    _hover: {
      transform: 'scale(1.05, 1.05)',
      bg: `${c}.600`,

      _dark: {
        bg: `${c}.300`,
      },
    },

    _active: {
      bg: `${c}.700`,
      transform: 'scale(1, 1)',

      _dark: {
        bg: `${c}.400`,
      },
    },
  };
});

const borderVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.300`,
    fontWeight: 'semibold',
    marginY: 0.5,
    color: c === 'dark' ? 'white' : 'black',
    borderRadius: 'none',
    transition: 'none',
    border: '3px solid black',
    position: 'relative',
    boxShadow: '1px 1px 0px 0px black, 2px 2px 0px 0px black, 3px 3px 0px 0px black',
    _dark: {
      bg: `${c}.200`,
      color: c === 'dark' ? 'white' : 'gray.800',
    },

    _hover: {
      bg: `${c}.600`,
      _dark: {
        bg: `${c}.300`,
      },
    },

    _active: {
      bg: `${c}.700`,
      boxShadow: 'none',
      top: '4px',
      left: '4px',
      _dark: {
        bg: `${c}.400`,
      },
    },
  };
});

const fillVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `transparent`,
    fontWeight: 'semibold',
    color: 'gray.800',
    border: '1px solid',
    overflow: 'hidden',
    borderColor: `${c}.500`,
    position: 'relative',
    zIndex: 1,
    _dark: {
      bg: `transparent`,
      borderColor: `${c}.400`,
      color: `${c}.400`,
      _before: {
        bg: `${c}.400`,
      }
    },

    _before: {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      bg: `${c}.500`,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease-out, all 0.3s ease-out',
      zIndex: -1,
      _dark: {
        bg: `${c}.500`,

      }
    },

    _hover: {
      color: c === 'light' || c === 'yellow' || c === 'cyan' ? 'black' : 'white',
      _before: {
        transform: 'translateX(0)',
      },
      _dark: {
        bg: `transparent`,
        color: c === 'light' || c === 'yellow' || c === 'cyan' || c === 'gray' ? 'black' : 'white',
      },
    },

    _active: {
      bg: `${c}.700`,
      transform: 'scale(.95, .95)',

      _dark: {
        bg: `${c}.400`,
      },
    },
  };
});

const border2Variant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.300`,
    fontWeight: 'semibold',
    marginY: .5,
    color: c === 'dark' ? 'white' : 'gray.800',
    border: '1px solid black',
    transition: 'all 0.3s ease-in-out',
    boxShadow: `0 0 0 0 black`,
    _dark: {
      bg: `${c}.200`,
      color: c === 'dark' ? 'white' : 'gray.800',
    },

    _hover: {
      transform: 'translateY(-4px) translateX(-2px)',
      boxShadow: '2px 5px 0 0 black',
    },

    _active: {
      transform: 'translateY(2px) translateX(1px)',
      boxShadow: '0 0 0 0 black',
    },
  };
});

export const buttonTheme = defineStyleConfig({
  variants: {
    pop: popVariant,
    border: borderVariant,
    border2: border2Variant,
    fill: fillVariant,
  },
});
