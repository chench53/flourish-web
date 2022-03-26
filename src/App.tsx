import {Button} from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import { constants } from 'ethers';

import { Header } from './components/header';
import MyNfts from './views/my_nfts';
import ImgGallery from './views/img_gallery';
import {Nft} from './eth/index';
// import ethApi from './eth_api/eth_api';

import networkMapping from './chain-info/deployments/map.json';

import {
  useEthers,
  // useCall,
} from '@usedapp/core'
// import { Contract } from '@ethersproject/contracts'

// import logo from './logo.svg';
import './App.css';

// Add this in node_modules/react-dom/index.js
const  a  = require('react');

// Add this in your component file
require('react-dom');
const b = require('react');
console.log(a === b);

// const c = require('@usedapp/core/node_modules/r')


function App() {
  const {account, chainId, error} = useEthers()
  // const nftAddress = chainId ? networkMapping[chainId]["Simple"][0] : constants.AddressZero
  // console.log(nftAddress)

  var nfts: Nft[] = [
    {
      tokenId: 0,
    },
    // {
    //   tokenId: 1,
    // }
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
          {/* {
            account ? (<MyNfts nfts={nfts}></MyNfts>) : ""
          } */}
          <MyNfts nfts={nfts}></MyNfts>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
