const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
import {
  ROOT_CONTRACT_ADDRESS,
  TLD,
} from 'core/utils/constants';
const { CollectionContract } = require('abi/CollectionContract');
const { RootContract } = require('abi/RootContract');
const { DomainContract } = require('abi/DomainContract');
const { NftContract } = require('abi/NftContract');
import fs from 'fs';
import path from 'path';
import axios from 'axios';

let client = null;

async function getClient() {
  if (!client) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    TonClient.useBinaryLibrary(libNode);
    client = new TonClient({
      network: {
        endpoints: ['https://gql.venom.foundation/graphql'],
      },
    });
  }
  return client;
}

export default async function handler(req, res) {
  try {
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }
  
    const name = String(req.query.name).toLowerCase().includes('.venom') ? String(req.query.name).toLowerCase().replace('.venom', '') : String(req.query.name).toLowerCase();
    const name_ = String(name).includes('.vid') ? String(name).replace('.vid', '') : String(name);
    const _name = String(name_).toLowerCase();

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const root = new Account(RootContract, {
      signer: signerKeys(keys),
      client,
      address: ROOT_CONTRACT_ADDRESS,
    });

    let certificateAddr = await root.runLocal('resolve', {
      path: String(_name) + '.' + TLD,
      answerId: 0,
    });

    const domainContract = new Account(DomainContract, {
      signer: signerKeys(keys),
      client,
      address: String(certificateAddr.decoded.output.certificate),
    });

    //console.log(certificateAddr.decoded.output.certificate)

    let nftAddress = '';
    let type = '';

    try {
      // @ts-ignore: Unreachable code error
      let status = await domainContract.runLocal('getStatus', {
        answerId: 0,
      });

      if (String(status.decoded.output.status)) {
        nftAddress = String(certificateAddr.decoded.output.certificate);
        type = 'domain';
      }
    } catch (e) {}

    

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);

    let jsonUrl;
    //console.log(json);
    if (type === 'domain') {
      jsonUrl = json.hash;
    } else {
      jsonUrl = json.attributes?.find((att) => att.trait_type === 'DATA')?.value;
    }

    //res.status(200).json({json:json,jsonUrl:jsonUrl});
    if(json.avatar.indexOf('not set') < 0){
      const imageBuffer = await axios.get(String(json.avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer.data);
        return;
    }

    if (jsonUrl && jsonUrl.indexOf('not set') < 0) {
      const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
      //console.log(result.data.avatar);
      const imageBuffer = await axios.get(String(result.data.avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer.data);
    } else {
      const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .status(200)

        .send(imageBuffer);
    }
  } catch (err) {
    const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
    const imageBuffer = fs.readFileSync(defaultImage);
    res
      .setHeader('Content-Type', 'image/jpg')
      .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
      .status(200)
      .send(imageBuffer);
  }
}
