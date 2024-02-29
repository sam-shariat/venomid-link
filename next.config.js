/** @type {import('next').NextConfig} */
//import CopyWebpackPlugin from 'copy-webpack-plugin';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'gateway.ipfs.io',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'cf-ipfs.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: '10.via0.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.cf-ipfs.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'nft-cdn.alchemy.com',
        port: '',
        pathname: '*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '*',
      }
    ],
  },
  transpilePackages: ['@web3-name-sdk/core'],
  webpack(config) {
    //config.output.webassemblyModuleFilename = './public/eversdk.wasm';
    config.experiments = { asyncWebAssembly: true, layers: true };
    // config.plugins.push(
    //   new CopyWebpackPlugin([
    //     {
    //       from: path.join(__dirname, 'node_modules/@eversdk/lib-node/eversdk'),
    //       to: path.join(__dirname, '/')
    //     }
    //   ])
    // );
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;
