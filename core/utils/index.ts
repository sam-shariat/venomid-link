import http from './http';
import fetcher from './swrFetcher';
import truncAddress from './stringUtils'

const sleep = async (ms:number) => new Promise(r => setTimeout(r, ms));

export { http, fetcher, truncAddress, sleep };
