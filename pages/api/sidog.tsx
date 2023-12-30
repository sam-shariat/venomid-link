import { ImageResponse } from '@vercel/og';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';
const SID = require('@siddomains/sidjs').default      
const SIDfunctions = require('@siddomains/sidjs')
const rpc = require('@siddomains/sidjs/dist/constants/rpc')                                                                                                                                                                                
const ethers = require('ethers')                                                                                                                

let sid ;

export const config = {
  runtime: 'experimental-edge',
};

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Venomid';

  const provider = new ethers.providers.JsonRpcProvider(rpc.apis.bsc_mainnet)
  sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress('56') })

  let avatar = await sid.name(name).getText('avatar');
  // if(!avatar){
  //   avatar = await sid.name(name).getText('avatar');
  // }
  const avatarUrl = avatar;
  const title = await sid.name(name).getText('name');
  const subtitle = await sid.name(name).getText('location');
  const lightMode = false //nftJson.nftDetails ? nftJson.nftDetails.lightMode : false;
  
  return new ImageResponse(
    (
      <div
        style={{
          background: lightMode ? '#f5f5f5' : 'radial-gradient(farthest-corner at 60% 55%,#1e201d 10%,#241925 45%, #261d24 60%, #1e2823 90%)',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          display: 'flex',
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={name + ' Avatar Image'}
          width={300}
          height={300}
          src={avatarUrl}
          style={{ margin: '0 75px', borderRadius: '100%' }}
        />
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
          }}>
            {title !== '' && <p
            style={{
              fontSize: 40,
              fontWeight: 'bolder',
              lineHeight: 1.1,
              color: lightMode ? '#161618' : '#f5f5f5'
            }}>
            {title}
          </p>}
          {subtitle !== '' && <p
            style={{
              fontSize: 30,
              lineHeight: 1.1,
              color: lightMode ? '#444444' : '#acacac'
            }}>
            {subtitle}
          </p>}
          <p
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              color: lightMode ? '#161618' : '#f5f5f5'
            }}>
            {name}.vid
          </p>
          
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
};

export default OgImageHandler;
