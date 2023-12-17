import { Address } from 'everscale-inpage-provider';
import React, { ReactNode } from 'react';

export interface State<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

export interface PrimaryName {
  nftAddress?: Address | string;
  name?: string | undefined;
}

export interface ObjectItem {
  key: string;
  value?: string;
}

export interface Message {
  type: any;
  title: string;
  msg: string;
  link?: string;
}

export interface Styles {
  height?: string;
  shadow?: string;
  popup?: boolean;
  radius?: string;
  size?: 'sm' | 'md' | 'lg';
  nolink?: boolean;
  scanLink?: boolean;
  icon?: string;
  color?: string;
  network?: string;
  type?: string;
  note?: string;
  venom?: string;
  eth?: string;
  btc?: string;
}

export interface CustomLink {
  type: string;
  title: string;
  url: string;
  image: string;
  content: string;
  styles?: Styles;
}

export interface LinkType {
  type: string;
  av: boolean;
  reg: string | RegExp;
}

export interface BgColorItem {
  color: string;
  lightMode: boolean;
}

export interface BgImageItem {
  bg: string;
  lightMode: boolean;
}

export interface SortableConProps {
  children: ReactNode;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: any; newIndex: any }) => void;
  useDragHandle: true;
}

export interface SortableItemProps {
  children: ReactNode;
  index: number;
}
