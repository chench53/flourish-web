import { useState, useEffect, forwardRef, useRef, useImperativeHandle  } from 'react';
import { Button, Modal, Image } from "react-bootstrap";
import { fabric } from 'fabric'; 

import './my_nfts.css';

export const NftCanvas = (props) => {

  const [canvas, setCanvas] = useState('');
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () => {
    var fabric_canvas  = new fabric.Canvas('c', {
      height: 488,
      width: 488,
      backgroundImage: props.image
    })
    fabric_canvas.isDrawingMode = true;
    fabric_canvas.freeDrawingBrush.width = 6;
    return 
  }

  // useImperativeHandle(ref, () => ({

  //   getAlert() {
  //     alert("getAlert from Child");
  //   }
    
  // }));
  
  const clearCanvas = () => {
    canvas.clear()
  }

  return(
    <div>
      <canvas id="c" className='img-canvas'/>
    </div>

  );
}
