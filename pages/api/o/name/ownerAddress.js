import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_V1,
  CONTRACT_ADDRESS_V2,
  ZERO_ADDRESS,
} from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
import { sql } from '@vercel/postgres';
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
const { NftContract } = require('abi/NftContract');

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
    // console.log(req.query);
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    let _name;
    if (String(req.query.name).toLowerCase().includes('.vid')) {
      _name = String(req.query.name).toLowerCase().slice(0, -4);
    } else {
      _name = String(req.query.name).toLowerCase();
    }
    const name = _name;
    const name_ = _name + '.VID';

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

    // const collectionv2 = new Account(CollectionContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: CONTRACT_ADDRESS_V2,
    // });
    const { rows } = await sql`SELECT * FROM vids WHERE name = ${name_};`;
    //console.log(rows);
    if (rows.length > 0) {
      res.status(200).send(rows[0].owner);
    } else {
      let response = await collection.runLocal('getInfoByName', {
        name: String(_name),
      });
      if (response.decoded.output.value0.name !== 'notfound') {
        res.status(200).send(response.decoded.output.value0.owner);
      } else {
        let responsev1 = await collectionv1.runLocal('getInfoByName', {
          name: String(_name),
        });
        res.status(200).send(responsev1.decoded.output.value0.owner);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
  }
}
