import { Navbar, Button, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import {
  useEthers,
} from '@usedapp/core'

import './header.css'


export const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  return (
    <Navbar bg="light" variant="light">
      <Container fluid={true}>
        <Navbar.Brand href="#" className="logo">
          {/* <img src={process.env.PUBLIC_URL + '/logo.png'}></img> */}
          Flourish
        </Navbar.Brand>
        demo 
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