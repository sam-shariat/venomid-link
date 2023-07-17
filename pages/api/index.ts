import { CONTRACT_ADDRESS } from 'core/utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');

type Data = {
  name: string;
};

(async () => {
  TonClient.useBinaryLibrary(libNode);
})();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const client = new TonClient({
    network: {
      endpoints: ['https://gql-testnet.venom.foundation/graphql']
    },
  });
  try {

    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
        signer: signerKeys(keys),
        client,
        address: CONTRACT_ADDRESS
    });

    let response = await collection.run("getInfoByName", { name: 'sam'});
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  client.close();
}
