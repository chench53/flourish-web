import {Card, Button, Spinner} from 'react-bootstrap';

import './my_nfts.css';

import {Nft, FetchMetadata} from '../eth/index';

const nftItem = (nft: Nft, index: Number) => {

    FetchMetadata(nft.tokenId).then(metadata => {
      if (metadata) {
        nft.metadata = metadata
      }
    });

  return (
    <Card key={nft.tokenId.toString()} className='nft-item'>
      {/* {nft.tokenId} {nft.metadata? nft.metadata.name: ""} */}
      <Card.Title className='nft-header'>
        tokenId: {nft.tokenId}
      </Card.Title>
      <div className='img-wrapper'>
        {nft.metadata ? (
          <Card.Img src={nft.metadata.image} className='img'></Card.Img>
          // <div> {nft.metadata.image}  </div>
        ) : (
          <Spinner animation="border" role="status" className='spinner'></Spinner>
        )}
      </div>
    </Card>
  )
}

export default function MyNfts(props: {nfts: Nft[]}) {
  // var nftsList = props.nfts.map((nft: Nft, index:Number) => {
  //   console.log(nft.tokenId)
  //   return nftItem(nft, index)
  // })
  return (
    <div className='nft-collection'>
      <p>
        My nft collection
      </p>
      <div className='nft-list'>
        {
          props.nfts.map((nft: Nft, index:Number) => {
            console.log(nft.tokenId)
            return nftItem(nft, index)
          })
        }
      </div>
    </div>
  )
}