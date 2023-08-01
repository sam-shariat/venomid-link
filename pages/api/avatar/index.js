import { CONTRACT_ADDRESS } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
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
        endpoints: ['https://gql-testnet.venom.foundation/graphql'],
      },
    });
  }
  return client;
}

export default async function handler(req, res) {
  try {
    console.log(req.query);
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    let response = await collection.runLocal('getInfoByName', { name: String(req.query.name) });

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: response.decoded.output.value0.nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);

    let jsonUrl = json.attributes?.find((att) => att.trait_type === 'DATA')?.value;

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (jsonUrl) {
      const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
      const imageBuffer = await axios.get(String(result.data.avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer.data);
    } else {
      const defaultImage = path.resolve('.', 'public/logos/vidicon.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer);
    }
  } catch (err) {
    const defaultImage = path.resolve('.', 'public/logos/vidicon.jpg');
    const imageBuffer = fs.readFileSync(defaultImage);
    res.status(200).setHeader('Content-Type', 'image/jpg').setHeader('Cache-Control','public, immutable, no-transform, max-age=31536000').send(imageBuffer);
  }
}
