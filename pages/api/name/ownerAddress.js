import { CONTRACT_ADDRESS } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
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
    //console.log(req.query)
    if(!req.query.name){
      res.status(202).json({status:'error',message:'name param is required'});
      process.exit(1);
    };

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    let response = await collection.runLocal('getInfoByName', { name: String(req.query.name) });
    if(response.decoded.output.value0?.owner){
        res.status(200).json(response.decoded.output.value0?.owner);
    } else {
      res.status(202).json({ status: 'error', message: 'name does not exist' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
      
  }
}