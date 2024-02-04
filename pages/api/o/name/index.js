import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  ROOT_CONTRACT_ADDRESS,
} from 'core/utils/constants';
import { sql } from '@vercel/postgres';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
const { RootContract } = require('abi/RootContract');
const { DomainContract } = require('abi/DomainContract');
const { NftContract } = require('abi/NftContract');
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
    //console.log(req.query);
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    const withDetails = req.query.withDetails ? true : false;
    const name = String(req.query.name).toLowerCase() + '.VID';
    const _name = String(req.query.name).toLowerCase();

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

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

    // const root = new Account(RootContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: ROOT_CONTRACT_ADDRESS,
    // });

    // let certificateAddr = await root.runLocal('resolve', {
    //   path: String(_name) + '.vid',
    //   answerId: 0,
    // });

    // const domainContract = new Account(DomainContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: String(certificateAddr.decoded.output.certificate),
    // });

    //console.log(certificateAddr.decoded.output.certificate)

    let nftAddress = '';
    let owner = '';
    let type = 'nft';

    // try {
    //   // @ts-ignore: Unreachable code error
    //   let status = await domainContract.runLocal('getStatus', {
    //     answerId: 0,
    //   });
    //   if (String(status.decoded.output.status) === '0') {
    //     nftAddress = String(certificateAddr.decoded.output.certificate);
    //     type = 'domain';
    //   }
    // } catch (e) {}

    if (nftAddress === '') {
      const { rows } = await sql`SELECT * FROM vids WHERE name = ${name};`;
      //console.log(rows[0]);

      if (rows.length > 0) {
        nftAddress = String(rows[0].address);
        owner = String(rows[0].owner);
      } else {
        let response = await collection.runLocal('getInfoByName', {
          name: String(_name),
        });
        if (response.decoded.output.value0.name !== 'notfound') {
          nftAddress = response.decoded.output.value0.nftAddress;
          owner = response.decoded.output.value0.owner;
        } else {
          let responsev1 = await collectionv1.runLocal('getInfoByName', {
            name: String(_name),
          });
          nftAddress = responsev1.decoded.output.value0.nftAddress;
          owner = responsev1.decoded.output.value0.owner;
        }
      }
    }

    //console.log('address : ',nftAddress);

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);
    let jsonUrl ;

    console.log(json)

    if(type === 'domain'){
      jsonUrl =  json.hash;
    } else {
      jsonUrl =  json.attributes?.find((att) => att.trait_type === 'DATA')?.value;
    }
    

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (withDetails) {
      if (jsonUrl && jsonUrl.indexOf('not set') < 0) {
        const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
        res.status(200).json({
          owner: owner,
          nftJson: JSON.parse(responseJson.decoded.output.json),
          nftDetails: result.data,
        });
      } else {
        res.status(200).json({
          owner: owner,
          nftJson: JSON.parse(responseJson.decoded.output.json),
        });
      }
    } else {
      res.status(200).json({
        owner: owner,
        nftJson: JSON.parse(responseJson.decoded.output.json),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
  }
}
