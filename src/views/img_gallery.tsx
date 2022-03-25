import {Card, Button} from 'react-bootstrap';
import {
  useEthers,
  // useCall,
} from '@usedapp/core'

import './img_gallery.css';

const ImgGallery = () => {
  const {account} = useEthers()
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
  const mint = (v: String) => {
    console.log(v)
  }

  return (
    <div>
      <p>choose an image to mint a nft</p>
      <div className="img-list">
        {
          imgs.list.map((img) => {
            return (
              <Card key={img.name} className='img-item'>
                <Card.Title className='img-header'>
                  {img.name}
                </Card.Title>
                <Card.Img src={process.env.PUBLIC_URL + `/assets/${img.name}.jpg`} className='img'></Card.Img>
                <Button variant="primary" onClick={() => mint(img.name)} disabled={!account}>mint</Button>
              </Card >
            )
          })
        }
      </div>     
    </div>
  )
}

export default ImgGallery;