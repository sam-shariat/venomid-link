import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_V1, CONTRACT_ADDRESS_V2 } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
import { sql } from '@vercel/postgres';

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
    // console.log(req.query)
    if (!req.query.ownerAddress) {
      res.status(202).json({ status: 'error', message: 'ownerAddress param is required' });
      process.exit(1);
    }

    const _owner = String(req.query.ownerAddress).toLowerCase();

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

    let response = await collection.runLocal('getPrimaryName', {
      _owner: _owner,
    });
    if (response.decoded.output.value0?.name) {
      res.status(200).send(response.decoded.output.value0?.name);
    } else {
      let responsev1 = await collectionv1.runLocal('getPrimaryName', {
        _owner: _owner,
      });
      if (responsev1.decoded.output.value0?.name) {
        res.status(200).send(responsev1.decoded.output.value0?.name);
      } else {
        const { rows } = await sql`SELECT * FROM vids WHERE owner = ${_owner} LIMIT 1;`;
        if(rows.length > 0){
          res.status(200).send(String(rows[0].name).slice(0,-4));
        } else {
          res.status(202).json({ status: 'error', message: 'owner does not own a venom id' });
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'owner does not own a venom id' });
  }
}
