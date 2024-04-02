import {
  TLD,
  ROOT_CONTRACT_ADDRESS,
} from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
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

    const name = String(req.query.name).toLowerCase().includes('.venom') ? String(req.query.name).toLowerCase().replace('.venom', '') : String(req.query.name).toLowerCase();
    const name_ = String(name).includes('.vid') ? String(name).replace('.vid', '') : String(name);
    const _name = String(name_).toLowerCase();

    const client = await getClient();
    const keys = await client.crypto.generate_random_sign_keys();

    // const collection = new Account(CollectionContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: CONTRACT_ADDRESS,
    // });

    // const collectionv1 = new Account(CollectionContract, {
    //   signer: signerKeys(keys),
    //   client,
    //   address: CONTRACT_ADDRESS_V1,
    // });

    const root = new Account(RootContract, {
      signer: signerKeys(keys),
      client,
      address: ROOT_CONTRACT_ADDRESS,
    });

    let certificateAddr = await root.runLocal('resolve', {
      path: String(_name) + '.' + TLD,
      answerId: 0,
    });

    console.log(String(_name) + '.' + TLD)
    console.log(certificateAddr)

    const domainContract = new Account(DomainContract, {
      signer: signerKeys(keys),
      client,
      address: String(certificateAddr.decoded.output.certificate),
    });

    //console.log(certificateAddr.decoded.output.certificate)

    let nftAddress = '';
    let owner = '';
    let type = 'nft';

    try {
      // @ts-ignore: Unreachable code error
      let status = await domainContract.runLocal('getStatus', {
        answerId: 0,
      });
      if (String(status.decoded.output.status)) {
        nftAddress = String(certificateAddr.decoded.output.certificate);
        type = 'domain';
      }
    } catch (e) {}

    

    //console.log('address : ',nftAddress);

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);
    let jsonUrl ;

    jsonUrl =  json.hash;    

    //res.status(200).json({json:json,jsonUrl:jsonUrl});

    if (withDetails) {
      if (jsonUrl && jsonUrl.indexOf('not set') < 0) {
        const result = await axios.get(String('https://ipfs.io/ipfs/' + jsonUrl));
        res.status(200).json({
          owner: owner,
          nftJson: json,
          nftDetails: result.data,
        });
      } else {
        res.status(200).json({
          owner: owner,
          nftJson: json,
        });
      }
    } else {
      res.status(200).json({
        owner: owner,
        nftJson: json,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
  }
}
