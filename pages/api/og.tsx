import { ImageResponse } from '@vercel/og';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Venomid';
  const nft = await fetch('https://venomid.link/api/name?withDetails=1&name=' + name);
  const nftJson = await nft.json();
  //console.log(nft)
  const title = nftJson.nftDetails ? nftJson.nftDetails.title : '';
  const subtitle = nftJson.nftDetails ? nftJson.nftDetails.subtitle : '';
  const lightMode = nftJson.nftDetails ? nftJson.nftDetails.lightMode : false;
  // const blob = await response.blob();
  // const url = URL.createObjectURL(blob);
  //console.log(url)
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
          src={'https://venomid.link/api/avatar?name=' + name}
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
              color: lightMode ? '#444444' : '#acacac',
              maxWidth: 450,
              textAlign: 'left'
            }}>
            {subtitle}
          </p>}
          <p
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              color: lightMode ? '#161618' : '#f5f5f5'
            }}>
            {name}
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
