const SID = require('@siddomains/sidjs').default      
const Name = require('@siddomains/sidjs').getResolverContract    
const SIDfunctions = require('@siddomains/sidjs')
const rpc = require('@siddomains/sidjs/dist/constants/rpc')                                                                                                                                                                                
const ethers = require('ethers')         
import { RPCs } from 'core/utils/constants';
                                                                                                   

let sid 
let _name 

const main = async(name)=> {
  const symbol = name.slice(-3);
  console.log(RPCs[symbol]);
  const provider = new ethers.providers.JsonRpcProvider(RPCs[symbol].rpc)
  sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress(RPCs[symbol].id) })

  //const resolverAddress = await sid.name(name).getResolver() // 0x123   
  //const bnb = await sid.name(name).getAddress()
  // const arb = await sid.name(name).getAddress(42161)
  // const eth = await sid.name(name).getAddress(1)
  //const nh = SIDfunctions.namehash(name);
  const avatar = await sid.name(name).getText('avatar');
  const title = await sid.name(name).getText('name');
  //const website = await sid.name(name).getText('url');
  const subtitle = await sid.name(name).getText('location');
  // const bio = await sid.name(name).getText('description');
  // const twitter = await sid.name(name).getText('com.twitter');
  // const github = await sid.name(name).getText('com.github');
  // const discord = await sid.name(name).getText('com.discord');
  // const telegram = await sid.name(name).getText('org.telegram');
  // const email = await sid.name(name).getText('email');
  const json = {
    nftDetails: {
    //   resolver : resolverAddress,
    // nameHash : nh,
    // wallets : {
    //   binance: bnb
    // },
    // socials: {
    //   twitter,
    //   telegram,
    //   github,
    //   discord,
    //   email
    // },
    avatar:avatar,
    title: title,
    subtitle: subtitle,
    //website,
    //bio
    }
  }
  //console.log("name: %s, address: %s", name, address)
  // const setRec = await sid.name(name).setText('venomid','QmQqqv9BuYeMNx2S1o3UGUFp87JLQDQCyTK8Hc9pH9bmPw/0')
  // console.log(setRec) 
  return json;                                                                        
}                       

export default async function handler(req, res) {
    try {
      //console.log(req.query);
      if (!req.query.name) {
        res.status(202).json({ status: 'error', message: 'name param is required' });
        process.exit(1);
      }

      const name = req.query.name;
  
      const json = await main(name);
      
      //console.log(rows[0]);
        res.status(200).json(json);
    } catch (err) {
      console.error(err);
      res.status(202).json({ status: 'error', message: err });
    }
  }
  