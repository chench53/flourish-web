import {Button} from 'react-bootstrap';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'

import MyNfts from './my_nfts/my_nfts';
import { Header } from './components/header';
import ImgGallery from './views/img_gallery';
// import ethApi from './eth_api/eth_api';
// import {
//   useEthers,
//   useCall,
// } from '@usedapp/core'
// import { Contract } from '@ethersproject/contracts'

// import logo from './logo.svg';
import './App.css';


function App() {
  // const [account, setAccount] = useState('');
  // const ethereum = window.ethereum;
  // const { activateBrowserWallet, account, deactivate } = useEthers()
  // const contractAddress = '0xA129c36Fa5869862d934bf58d256bDBcBfB52A7f';
  // python web3.Web3.keccak(text='ownerOf(uint256)').substr(0, 8)
  // const methodSign = {
  //   'ownerOf': '0x6352211e',
  //   'balanceOf': '0x70a08231'
  // }

  var nfts = [
    {
      'id': 0,
      'metadata': 2
    },
    {
      'id': 1,
      'metadata': 2323
    },
  ]

  // function fecthNfts() {
  //   ethereum
  //     .request({ 
  //       method: 'eth_call', 
  //       params: [{
  //         "to": contractAddress,
  //         "data": `${methodSign.ownerOf}0000000000000000000000000000000000000000000000000000000000000001`
  //       }, "latest"]
  //     })
  //     .then(data => {
  //       console.log(data)
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }

  // function getBalance() {
  //   const { value, error } = useCall(contractAddress && {
  //     contract: new Contract(contractAddress),
  //     method: 'balanceOf',
  //     args: [account]
  //   }) ?? {}
  //   if(error) {
  //     console.error(error.message)
  //     return undefined
  //   }
  //   return value?.[0]
  // }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <div className="App">
        <Container>
          <Header></Header>
          <ImgGallery></ImgGallery>
          <MyNfts nfts={nfts}></MyNfts>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
