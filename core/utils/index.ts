import http from './http';
import truncAddress from './stringUtils'

const sleep = async (ms:number) => new Promise(r => setTimeout(r, ms));
const capFirstLetter = (str: string) => {
    const words = str.split(' ');
    const final = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return String(final);
  };
const withHttps = (url) => url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `https://${nonSchemmaUrl}`);

export { http, truncAddress, sleep, capFirstLetter, withHttps };
