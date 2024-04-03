import { ROOT_CONTRACT_ADDRESS } from 'core/utils/constants';
const { TonClient, signerKeys } = require('@eversdk/core');
const { libNode } = require('@eversdk/lib-node');
const { Account } = require('@eversdk/appkit');
const { RootContract } = require('abi/RootContract');
const { DomainContract } = require('abi/DomainContract');
const { NftContract } = require('abi/NftContract');

let client = null;

async function getClient() {
  if (!client) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    TonClient.useBinaryLibrary(libNode);
    client = new TonClient({
      network: {
        endpoints: ['https://gql.venom.foundation/graphql'],
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
    let owner = '';
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
      //console.error(err);
      res.status(202).json({ status: 'error', message: 'name does not exist' });
    }

    //console.log('address : ',nftAddress);

    const nft = new Account(NftContract, {
      signer: signerKeys(keys),
      client,
      address: nftAddress,
    });

    let responseJson = await nft.runLocal('getJson', { answerId: 0 });
    let json = JSON.parse(responseJson.decoded.output.json);
    if(json.target.indexOf('not set') < 0){
      res.status(200).send(response.decoded.output.value0?.owner);
    } else {
      res.status(200).send('target not set');
    }
    
  } catch (err) {
    console.error(err);
    res.status(202).json({ status: 'error', message: 'name does not exist' });
      
  }
}