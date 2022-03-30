import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'

import { Header } from './components/header';
import {MyNfts, ImgGallery} from './views/index';
import {Nft} from './eth/index';
import './App.css';

import {useEthers } from '@usedapp/core'


function App() {

  const {account} = useEthers();

  var nfts: Nft[] = [
    {
      tokenId: 0,
    },
    {
      tokenId: 1,
    }
  ]

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      {console.log('render app')}
      <div className="App">
        <Header></Header>
        <Container className='main'>
          <ImgGallery></ImgGallery>
          {
            account ? (<MyNfts nfts={nfts}></MyNfts>) : ""
          }
          {/* <MyNfts nfts={nfts}></MyNfts> */}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
