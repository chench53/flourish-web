import {Navbar, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import {
  useEthers,
} from '@usedapp/core'

export const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers()
  return (
    <Navbar>
      <Navbar.Brand href="#home">Flourish</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>

          {account ? (
            <DropdownButton title={`${account.slice(0, 5)}...${account.slice(38)}`} variant='outline-primary'>
              <Dropdown.Item eventKey="1" onClick={deactivate}>logout</Dropdown.Item>
            </DropdownButton> 
          ):
            <Button onClick={activateBrowserWallet} > connect wallect </Button>
          }

        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}