import {Button} from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import { constants } from 'ethers';

import MyNfts from './my_nfts/my_nfts';
import { Header } from './components/header';
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


function App() {
  // const [account, setAccount] = useState('');
  // const ethereum = window.ethereum;
  // const { activateBrowserWallet, account, deactivate } = useEthers()
  // python web3.Web3.keccak(text='ownerOf(uint256)').substr(0, 8)
  // const methodSign = {
    //   'ownerOf': '0x6352211e',
    //   'balanceOf': '0x70a08231'
    // }
    // console.log('heheh')
  const {account, chainId, error} = useEthers()
  // const contractAddress = '0xA129c36Fa5869862d934bf58d256bDBcBfB52A7f';
  const nftAddress = chainId ? networkMapping[chainId]["Simple"][0] : constants.AddressZero
  console.log(nftAddress)

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
