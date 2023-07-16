import http from './http';
import truncAddress from './stringUtils'

const sleep = async (ms:number) => new Promise(r => setTimeout(r, ms));

export { http, truncAddress, sleep };
