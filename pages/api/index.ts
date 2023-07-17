import { CONTRACT_ADDRESS } from 'core/utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  TonClient.useBinaryLibrary(libNode);
  const client = new TonClient({
    network: {
      endpoints: ['https://gql-testnet.venom.foundation/graphql']
    },
  });
  try {

    const keys = {
      public: process.env.NEXT_PUBLIC_PUK,
      secret: process.env.NEXT_PUBLIC_PRK
    };

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
