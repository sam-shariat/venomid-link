import { CONTRACT_ADDRESS } from 'core/utils/constants';
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
    console.log(req.query)
    if(!req.query.ownerAddress){
      res.status(202).json({status:'error',message:'ownerAddress(string) param is required'});
      process.exit(1);
    };

    const ownerAddress = req.query.ownerAddress;
    const withDetails = req.query.withDetails ? true : false ;

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    const collection = new Account(CollectionContract, {
      signer: signerKeys(keys),
      client,
      address: CONTRACT_ADDRESS,
    });

    let response = await collection.runLocal('getPrimaryName', { _owner: ownerAddress });
    
    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: response.decoded.output.value0.nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);
    let jsonUrl = json.attributes?.find((att) => att.trait_type === 'DATA')?.value;

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    
    if(withDetails){
        if (jsonUrl) {
            const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl)); 
            res.status(200).json({nftData: response.decoded.output.value0, nftJson: JSON.parse(responseJson.decoded.output.json), nftDetails: result.data });
        } else {
            res.status(200).json({nftData: response.decoded.output.value0, nftJson: JSON.parse(responseJson.decoded.output.json) });
            
        }
    } else {
        res.status(200).json({nftData: response.decoded.output.value0, nftJson: JSON.parse(responseJson.decoded.output.json) });
    }
    
  } catch (err) {
    console.error(err);
    res.status(202).json({status:'error',message:'owner does not own a venom id'});
    
  }
}