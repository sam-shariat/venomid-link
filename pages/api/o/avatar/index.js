import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_V1, CONTRACT_ADDRESS_V2 } from 'core/utils/constants';
import { sql } from '@vercel/postgres';
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
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();
    const name = String(req.query.name).toLowerCase() + '.VID';
    const _name = String(req.query.name).toLowerCase();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    const collectionv1 = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS_V1,
    });

    // const collectionv2 = new Account(CollectionContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: CONTRACT_ADDRESS_V2,
    // });
    console.log('getting image');

    const { rows } = await sql`SELECT * FROM vids WHERE name = ${name};`;
    //console.log(rows[0]);
    let nftAddress;
    if (rows.length > 0) {
      nftAddress = String(rows[0].address);

    } else {
      let response = await collection.runLocal('getInfoByName', {
        name: String(_name),
      });
      if (response.decoded.output.value0.name !== 'notfound') {
        nftAddress = response.decoded.output.value0.nftAddress;
      } else {
        let responsev1 = await collectionv1.runLocal('getInfoByName', {
          name: String(_name),
        });
        nftAddress = responsev1.decoded.output.value0.nftAddress;
      }
    }

    //console.log('address : ', nftAddress);

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
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
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer.data);
    } else {
      const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer);
    }
  } catch (err) {
    const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
    const imageBuffer = fs.readFileSync(defaultImage);
    res
      .status(200)
      .setHeader('Content-Type', 'image/jpg')
      .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
      .send(imageBuffer);
  }
}
