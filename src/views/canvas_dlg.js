// Can't deal with ts in fabric, use js instead

import { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import {
  useEthers,
  useContractFunction,
} from '@usedapp/core'
import { fabric } from 'fabric';
import { create } from 'ipfs-http-client'
import { IPFS_GATEWAY } from '../modules/const';
import {contract} from '../modules/eth';

import './my_nfts.css';

// export function CanvasDlg(props: {
//   show: boolean,
//   handleClose: () => void,
//   handlerShow: () => void,
//   nft: Nft,
// }) {
export function CanvasDlg(props) {

  var show = props.show;
  var handleClose = props.handleClose
  const nft = props.nft;
  const tokenId = nft.tokenId;
  const metadata = nft.metadata;

  let obj = {}
  const [canvas, setCanvas] = useState(obj)
  const [loading, setLoading] = useState(false)
  // const {account} = useEthers()
  const { state, send } = useContractFunction(contract, 'setTokenURI', {}) 

  const client = create(window.location.href + 'ipfs-api/api/v0')

  useEffect(() => {
    if (show) {
      setCanvas(initCanvas());
    }
  }, [show]);

  const initCanvas = () => {
    var fabric_canvas = new fabric.Canvas('c', {
      height: 488,
      width: 488,
      backgroundImage: _redirtImageUrl(metadata?.image)
    })

    fabric_canvas.isDrawingMode = true;
    fabric_canvas.freeDrawingBrush.width = 6;
    return fabric_canvas
  }

  const _redirtImageUrl = (url) => { // fix security error of exporting canvas data
    const newUrl = url.replace(IPFS_GATEWAY, '/ipfs-gateway')
    // console.log(newUrl)
    return newUrl
  }

  const hanlerClear = () => {
    canvas.clear();
    canvas.setBackgroundImage(metadata?.image, () => {
      // console.log('setBackgroundImage')
      canvas.renderAndReset() // re=render
    })
  }

  const handleSubmit = async () => {
    var canvasElement = document.getElementById('c');
    var dataURL = canvasElement.toDataURL('image/jpeg')
    setLoading(true)
    const updatedTokenUri = await updateNft(dataURL)
    await setTokenURI(updatedTokenUri)
    setLoading(false)
    handleClose()
  }

  const updateNft = async (imageDataUrl) => {
    let res = await fetch(imageDataUrl);
    let blob = await res.blob()
    var file = new File([blob], "filename");
    var { cid } = await client.add(file)
    const imageUrl = `${IPFS_GATEWAY}/ipfs/${cid.toString()}`

    var updatedMetadata = Object.assign({}, metadata)
    updatedMetadata.image = imageUrl
    var { cid } = await client.add(JSON.stringify(updatedMetadata))
    var updatedTokenUri = `${IPFS_GATEWAY}/ipfs/${cid.toString()}`
    console.log(updatedTokenUri)
    return updatedTokenUri
  }

  const setTokenURI = async (tokenURI) => {
    var tokenUri = tokenURI
    await send(tokenId, tokenUri)
  }

  return (
    <Modal show={show} onHide={handleClose} className="canvas-dlg" size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>
          {`id: ${tokenId}`}
        </Modal.Title>
      </Modal.Header>

      {metadata && (
        <div>
          <Modal.Body className="canvas-wrapper">
            <canvas id="c" className='img-canvas' />
          </Modal.Body>

          {loading ? (
            <Modal.Footer>
              <Spinner animation="border" role="status" className='spinner'></Spinner>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button variant="secondary" onClick={hanlerClear}>
                clear
              </Button>
              <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                submit
              </Button>
            </Modal.Footer>
          )}
        </div>
      )}
    </Modal>
  )
}