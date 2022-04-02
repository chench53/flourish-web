import { useState, useRef } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { Nft, NftMetadata } from '../modules/eth';
import { NftCanvas } from './canvas';

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
  const metadata: NftMetadata | undefined = nft.metadata;

  const childRef = useRef<typeof NftCanvas>();

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {`id: ${tokenId}`}
        </Modal.Title>
      </Modal.Header>

      {metadata?.image && (
        <div>
          <Modal.Body className="canvas-wrapper">
            {/* <img src={metadata?.image} className='img-canvas'></img> */}
            <NftCanvas ref={childRef} image={metadata?.image}></NftCanvas>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">
              clear
            </Button>
            <Button variant="primary" onClick={handleClose}>
              submit
            </Button>
          </Modal.Footer>
        </div>

      )}

    </Modal>
  )
}