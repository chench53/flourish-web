import { Navbar, Button, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import {
  useEthers,
} from '@usedapp/core'
import { logo } from '../assets/index';

import './header.css'


export const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  return (
    <Navbar bg="light" variant="light">
      <Container fluid={true}>
        <img src={logo} className='logo-img'></img>
        <Navbar.Brand href="/" className="logo-text">
          Flourish
        </Navbar.Brand>
        &nbsp;&nbsp; demo 
        {/* <Navbar.Toggle /> */}
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {account ? (
              <DropdownButton title={`${account.slice(0, 5)}...${account.slice(38)}`} variant='outline-primary' align={{ lg: 'end' }}>
                <Dropdown.Item eventKey="1" onClick={deactivate}>logout</Dropdown.Item>
              </DropdownButton>
            ) : <Button onClick={activateBrowserWallet} > connect wallect </Button>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}