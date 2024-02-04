const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
import { ROOT_CONTRACT_ADDRESS } from 'core/utils/constants';
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

    const _name = String(req.query.name).toLowerCase();
    const name = _name.toLowerCase().includes('.vid') ? _name.slice(0, -4) : _name;

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const root = new Account(RootContract, {
      signer: signerKeys(keys),
      client,
      address: ROOT_CONTRACT_ADDRESS,
    });

    let certificateAddr = await root.runLocal('resolve', {
      path: String(name) + '.vid',
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

      if (String(status.decoded.output.status) === '0') {
        nftAddress = String(certificateAddr.decoded.output.certificate);
        type = 'domain';
      }
    } catch (e) {
      const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .status(200)

        .send(imageBuffer);
    }

    //console.log('address : ', nftAddress);

    if(nftAddress === ''){
      const { rows } = await sql`SELECT * FROM vids WHERE name = ${name};`;
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
    };

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);

    let jsonUrl ;
    if(type === 'domain'){
      jsonUrl =  json.hash;
    } else {
      jsonUrl =  json.attributes?.find((att) => att.trait_type === 'DATA')?.value;
    }
    //console.log('https://ipfs.io/ipfs/' + jsonUrl);
    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (jsonUrl && jsonUrl.indexOf('not set') < 0) {
      const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
      //console.log(result.data.avatar);
      const imageBuffer = await axios.get(String(result.data.avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .status(200)

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
