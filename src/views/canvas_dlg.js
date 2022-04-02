// Can't deal with ts in fabric, use js instead

import { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
// import { Nft, NftMetadata } from '../modules/eth';
// import { NftCanvas } from './canvas';
import { fabric } from 'fabric';

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

  useEffect(() => {
    if (show) {
      // console.log('set canvas')
      setCanvas(initCanvas());
    }
  }, [show]);

  const initCanvas = () => {
    var fabric_canvas = new fabric.Canvas('c', {
      height: 488,
      width: 488,
      // backgroundImage: metadata?.image
      backgroundImage: '/assets/lamp-c.jpg'
    })

    fabric_canvas.isDrawingMode = true;
    fabric_canvas.freeDrawingBrush.width = 6;
    return fabric_canvas
  }

  const hanlerClear = () => {
    canvas.clear();
    // canvas._clearCache();
    // canvas.clearContext();
    // setCanvas(initCanvas());
  }

  const handleSubmit = async () => {
    // setLoading(true)
    // window.open(canvas.toDataURL('image/jpeg'));
    var canvasElement = document.getElementById('c');
    console.log(canvasElement)
    // var img = new Image();
    // img.setAttribute('crossOrigin', 'anonymous');

    var dataURL = canvasElement.toDataURL('image/png')
    window.open(dataURL)
    console.log(dataURL)
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