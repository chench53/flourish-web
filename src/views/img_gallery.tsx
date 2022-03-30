import {Card, Button} from 'react-bootstrap';
import {
  useEthers,
  // useCall,
} from '@usedapp/core'

import './img_gallery.css';

const ImgOri = (name: string, src: string) => {
  const {account} = useEthers()

  const mint = (v: String) => {
    console.log(v)
  }

  return (
    <Card key={name} className='img-item'>
      <Card.Title className='img-header'>
        {name}
      </Card.Title>
      <Card.Img src={src} className='img'></Card.Img>
      <Button variant="primary" onClick={() => mint(name)} disabled={!account}>mint</Button>
    </Card >
  )
}

const ImgGallery = () => {
  const imgs = {
    meta: null,
    list: [
      {
        name: 'lamp-a',
        // file:  '/assets/lamp-a.jpg'
      },
      {
        name: 'lamp-b',
        // file:  '/assets/lamp-b.jpg'
      },
      {
        name: 'lamp-c',
        // file:  '/assets/lamp-c.jpg'
      },
    ]
  }


  return (
    <div>
      <h4>choose an image to mint a nft</h4>
      <div className="img-list">
        {
          imgs.list.map((img) => {
            return ImgOri(img.name, process.env.PUBLIC_URL + `/assets/${img.name}.jpg`)
          })
        }
      </div>     
    </div>
  )
}

export default ImgGallery;