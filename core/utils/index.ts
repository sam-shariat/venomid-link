import axios from 'axios';
import { BaseNftJson } from './nft';
import { truncAddress } from './stringUtils';
//import crypto from 'crypto';

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));
const capFirstLetter = (str: string) => {
  if (str === '') return '';
  const words = str.split(' ');
  const final = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return String(final);
};

const arrayRemove = (arr: any, index: number) => {
  return arr.filter((item: any, ind: number) => index !== ind && item);
};

const withHttps = (url: string) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `https://${nonSchemmaUrl}`
  );

function isValidUsername(name: string) {
  const nameRegex = /^[a-z0-9_]{1,32}$/;
  return nameRegex.test(name);
}

const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isValidVenomAddress(address: string) {
  if (!address.startsWith('0:') || address.length !== 66) {
    return false;
  }

  const hexChars = '0123456789abcdef';
  for (let i = 2; i < address.length; i++) {
    if (!hexChars.includes(address[i])) {
      return false;
    }
  }

  return true;
}

function isValidSignHash(signature: string, date: number) {
  // const verifier = crypto.createVerify('sha256');
  // // console.log(signature,publicKey,data)
  // verifier.update(data);
  // const isValid = verifier.verify(publicKey, signature, 'base64');
  if (signature.length !== 88) {
    return false;
  }
  //// console.log(Date.now() - date)
  if (Date.now() - date < 172800000) {
    return true;
  } else {
    return false;
  }
}

const getAvatarUrl = async (nft: BaseNftJson) => {
  const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
  if (ipfsData === '') {
    return String(nft.preview?.source);
  } else {
    await axios.get('https://ipfs.io/ipfs/' + ipfsData).then((res) => {
      return res.data.avatar
        ? String(res.data.avatar)
        : nft.files
        ? String(nft?.files[0]?.source)
        : nft.preview?.source;
    });
  }
};

function base64ToBlob(b64Data: string, contentType: string, sliceSize?: number) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  // console.log(byteArrays);

  return new File(byteArrays, 'vid', { type: contentType });
}

const getColor = (variant: string, buttonBg: string, lightMode: boolean) => {
  if (variant === 'solid') {
    if (lightMode) {
      if (
        buttonBg === 'light' ||
        buttonBg === 'gray' ||
        buttonBg === 'yellow' ||
        buttonBg === 'cyan'
      ) {
        return 'dark.800';
      } else {
        return 'white';
      }
    } else {
      if (buttonBg === 'light') {
        return 'dark.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'white';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'outline') {
    if (lightMode) {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return 'gray.800';
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return `${buttonBg}.300`;
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.300`;
      }
    }
  }

  if (variant === 'pop') {
    if (lightMode) {
      if (buttonBg === 'light' || buttonBg === 'yellow' || buttonBg === 'cyan') {
        return 'gray.800';
      } else {
        return 'white';
      }
    } else {
      if (buttonBg === 'light') {
        return 'gray.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'border' || variant === 'border2') {
    if (lightMode) {
      if (buttonBg === 'dark') {
        return 'white';
      } else {
        return 'black';
      }
    } else {
      if (buttonBg === 'light') {
        return 'gray.800';
      } else if (buttonBg === 'dark') {
        return 'white';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return 'gray.800';
      }
    }
  }

  if (variant === 'fill') {
    if (lightMode) {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return 'gray.800';
      } else if (buttonBg === 'gray') {
        return 'gray.800';
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === 'light') {
        return 'white';
      } else if (buttonBg === 'dark') {
        return `${buttonBg}.300`;
      } else if (buttonBg === 'gray') {
        return 'gray.600';
      } else {
        return `${buttonBg}.300`;
      }
    }
  }
};

const getIconColor = (lightMode: boolean) => {
  if (lightMode) {
    return 'var(--chakra-colors-gray-800)';
  } else {
    return 'white';
  }
};

const getIconInButtonColor = (variant: string, buttonBg: string, lightMode: boolean) => {
  let color = getColor(variant, buttonBg, lightMode);
  //// console.log(color);
  if (color === undefined) return undefined;
  let colorString = 'var(--chakra-colors-' + color.replace('.', '-') + ')';
  //// console.log(colorString);
  return colorString;
};

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export {
  withHttps,
  base64ToBlob,
  truncAddress,
  sleep,
  isValidEmail,
  capFirstLetter,
  arrayRemove,
  isValidUsername,
  getColor,
  getIconColor,
  getIconInButtonColor,
  getAvatarUrl,
  getRandomNumber,
  isValidVenomAddress,
  isValidSignHash,
};
