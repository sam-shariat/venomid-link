import Header from './Header';
import Footer from './Footer';
import React, { useEffect } from 'react';
import { Seo } from './Seo';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  // const [venomConnect, setVenomConnect] = useAtom(walletAtom);
  // const init = async () => {
  //   const _venomConnect = await initVenomConnect();
  //   setVenomConnect(_venomConnect);
  // };
  // useEffect(() => {
  //   if(!venomConnect) init();
  // },[]);
  return (
    <>
    
      <Header/>
      <Seo />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
