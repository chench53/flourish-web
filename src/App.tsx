import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'

import { Header } from './components/header';
import {MyNfts, ImgGallery} from './views/index';
import {Nft} from './modules/eth';
import './App.css';

import {useEthers } from '@usedapp/core'


function App() {

  const {account} = useEthers();

  // var nfts: Nft[] = [
  //   {
  //     tokenId: 0,
  //   },
    // {
    //   tokenId: 1,
    // },
    // {
    //   tokenId: 2,
    // },
    // {
    //   tokenId: 3,
    // },
    // {
    //   tokenId: 4,
    // }
  // ]

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
            account ? (<MyNfts></MyNfts>) : ""
          }
          {/* <MyNfts nfts={nfts}></MyNfts> */}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
