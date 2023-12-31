const SID = require('@siddomains/sidjs').default;
const SIDfunctions = require('@siddomains/sidjs');
const rpc = require('@siddomains/sidjs/dist/constants/rpc');
const ethers = require('ethers');
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { RPCs } from 'core/utils/constants';

let sid;

export default async function handler(req, res) {
  try {
    if (!req.query.name) {
      res.status(202).json({ status: 'error', message: 'name param is required' });
      process.exit(1);
    }

    const name = req.query.name;

    const symbol = name.slice(-3);
    //console.log(RPCs[symbol]);
    const provider = new ethers.providers.JsonRpcProvider(RPCs[symbol].rpc);
    sid = new SID({ provider, sidAddress: SIDfunctions.getSidAddress(RPCs[symbol].id) });

    const avatar = await sid.name(name).getText('avatar');
    console.log(avatar);

    if (avatar) {
      const imageBuffer = await axios.get(String(avatar), {
        responseType: 'arraybuffer',
      });
      //console.log(result);
      //res.status(200).json({json:json,jsonUrl:jsonUrl, avatar:result.data.avatar});
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer.data);
    } else {
      const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
      const imageBuffer = fs.readFileSync(defaultImage);
      res
        .status(200)
        .setHeader('Content-Type', 'image/jpg')
        .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
        .send(imageBuffer);
    }
  } catch (err) {
    console.log(err);
    const defaultImage = path.resolve('.', 'public/logos/vidavatar.jpg');
    const imageBuffer = fs.readFileSync(defaultImage);
    res
      .status(200)
      .setHeader('Content-Type', 'image/jpg')
      .setHeader('Cache-Control', 'public, immutable, no-transform, max-age=31536000')
      .send(imageBuffer);
  }
}
