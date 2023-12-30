import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_V1, CONTRACT_ADDRESS_V2 } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { CollectionContract } = require('abi/CollectionContract');
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
    if (!req.query.nftAddress) {
      res.status(202).json({ status: 'error', message: 'nftAddress param is required' });
      process.exit(1);
    }

    const withDetails = req.query.withDetails ? true : false;

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    let nftAddress = req.query.nftAddress;
    

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);
    let jsonUrl = json.attributes?.find((att) => att.trait_type === 'DATA')?.value;

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (withDetails) {
      if (jsonUrl) {
        const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
        res
          .status(200)
          .json({
            nftJson: JSON.parse(responseJson.decoded.output.json),
            nftDetails: result.data,
          });
      } else {
        res
          .status(200)
          .json({
            nftJson: JSON.parse(responseJson.decoded.output.json),
          });
      }
    } else {
      res
        .status(200)
        .json({
          nftJson: JSON.parse(responseJson.decoded.output.json),
        });
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
  }
}
