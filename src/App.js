import { useState, createContext  } from 'react';

import { Alert } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
// import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

// import logo from './logo.svg';
import './App.css';

const UserContext = createContext(null);

function App() {
  const [account, setAccount] = useState('');

  function connectWallect() {
    const ethereum = window.ethereum;
    if (typeof ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch(err => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            this.alert('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
    } else {
      alert("MetaMask wallect is required!")
    }
  }
  
  function handleAccountsChanged() {
    setAccount(window.ethereum.selectedAddress)
    console.log(`account connected: ${window.ethereum.selectedAddress}`)
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <div className="App">
        <UserContext.Provider value={account}>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">Flourish</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Button onClick={connectWallect} variant={account?'outline-primary':'primary'}>
                    {account?`${account.slice(0,5)}...${account.slice(38)}`:`connect wallect`}
                  </Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
