import { useState, useEffect } from 'react';
import { ThemeProvider, Container} from 'react-bootstrap'
import {useEthers } from '@usedapp/core'

import { Header } from './components/header';
import {MyNfts, ImgGallery} from './views/index';
import { MyAlert } from './components/alert';

import './App.css';

function App() {

  const {account, chainId} = useEthers();
  const [alertShow, setAlertShow] = useState(false);
  const [chainConnected, setChainConnected] = useState(false);


  useEffect(() => {
    if (account) {
      if (chainId === 4) {
        setChainConnected(true)
        setAlertShow(false)
      } else {
        setAlertShow(true)
      }
    }
  }, [account, chainId])
  

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      {console.log('render app')}
      <div className="App">
        <Header></Header>
        <MyAlert 
          variant="danger" 
          title="" 
          msg="connect to rinkeby testnet"
          show={alertShow}
          closeAlert={() => {setAlertShow(false)}}
        ></MyAlert>
        <h1 className='banner'>
          Make your editable Nft
        </h1>
        <Container className='main'>
          <ImgGallery></ImgGallery>
          {
            chainConnected ? (<MyNfts></MyNfts>) : null
          }
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
