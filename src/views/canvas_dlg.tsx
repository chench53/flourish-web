import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { Nft } from '../modules/eth';

import './my_nfts.css';

export function CanvasDlg(props: { 
  show: boolean,  
  handleClose: () => void,
  handlerShow: () => void,
  nft: Nft,
}) {

  var show = props.show;
  var handleClose = props.handleClose
  const nft = props.nft;
  const tokenId = nft.tokenId;
  const metadata = nft.metadata;

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>        
        <Modal.Title>
          {`id: ${tokenId}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={metadata?.image} className='img-canvas'></img>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          clear
        </Button>
        <Button variant="primary" onClick={handleClose}>
          submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}