import { Address } from 'everscale-inpage-provider';

export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PrimaryName {
  nftAddress?: Address;
  name?: string;
}

export interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}