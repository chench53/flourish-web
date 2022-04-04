import {Card, Button} from 'react-bootstrap';
import {
  useEthers,
  useContractFunction,
} from '@usedapp/core'

import { IPFS_GATEWAY } from '../modules/const';
import { contract } from '../modules/eth';
import imgList from './img_list.json';
import { cheemAImage, cheemBImage, cheemCImage } from '../assets/index';

import './img_gallery.css';

var imageMapping = {};
imgList.forEach(img => {imageMapping[img.name] = img})

const ImgOri = (name: string, src: string) => {
  const {account} = useEthers()
  const { state, send } = useContractFunction(contract, 'createCollectible', {}) 


  const Mint = (name: string) => {
    var tokenUri = `${IPFS_GATEWAY}/ipfs/${imageMapping[name].metadata_hash}?filename=${name}.json`
    send(tokenUri)
  }

  return (
    <Card key={name} className='img-item'>
      <Card.Title className='img-header'>
        {name}
      </Card.Title>
      <Card.Img src={src} className='img'></Card.Img>
      <Button variant="primary" onClick={() => Mint(name)} disabled={!account}>mint</Button>
    </Card >
  )
}

const ImgGallery = () => {
  const imgs = {
    meta: null,
    list: imgList
  }
  const imgMapping = {
    'cheem-a': cheemAImage,
    'cheem-b': cheemBImage,
    'cheem-c': cheemCImage,
  }

  return (
    <div>
      <h4>choose an image to mint a nft</h4>
      <div className="img-list">
        {
          imgs.list.map((img) => {
            return ImgOri(img.name, imgMapping[img.name])
          })
        }
      </div>     
    </div>
  )
}

export default ImgGallery;