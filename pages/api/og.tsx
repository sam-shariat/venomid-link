import { ImageResponse } from '@vercel/og';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get('name');
  if (!name) {
    return new ImageResponse(<>Venom ID &quot;Not Found&quot;</>, {
      width: 1200,
      height: 630,
    });
  }
 
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="256"
          height="256"
          src={`https://venomid.link/api/avatar/?name=${name}`}
          style={{
            borderRadius: 128,
          }}
        />
        <p>{name}.VID</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}