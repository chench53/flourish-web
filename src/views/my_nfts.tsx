import { Card, Spinner } from 'react-bootstrap';

import './my_nfts.css';

import { Nft, NftMetadata, contract, fetchMetadata } from '../modules/eth';
import { useState, useEffect } from 'react';

import { useCalls,  CallResult} from '@usedapp/core';


function NftItem(nft: Nft, result: CallResult) {

  const [image, setImage] = useState('');

  useEffect(() => {
    if (result?.value) {
      fetchMetadata(nft, result).then((data: NftMetadata) => {
        if (data) {
          console.log(data)
          setImage(data.image);
          // setImage('//ipfs.io/ipfs/QmQsT1c4ETrD3GcA6qMV5EiHbMvveVQ5Az2WzYPhJgqgeZ')
        }
      })
    }
  }, [result?.value])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card key={nft.tokenId.toString()} className='nft-item'>
      <Card.Title className='nft-header'>
        tokenId: {nft.tokenId}
      </Card.Title>
      <div className='img-wrapper'>
        {image ? (
          <Card.Img src={image} className='img'></Card.Img>
        ) : (
          <Spinner animation="border" role="status" className='spinner'></Spinner>
        )}
      </div>
    </Card>
  )
}

export default function MyNfts(props: { nfts: Nft[] }) {

  const calls = props.nfts?.map(nft => ({ contract, method: 'tokenURI', args: [nft.tokenId] })) ?? []
  const results = useCalls(calls) ?? []

  return (
    <div className='nft-collection'>
      <h4>My nft collection</h4>
      {/* {console.log(`render nfts list`)} */}
      <div className='nft-list'>
        {
          props.nfts.map((nft: Nft, index: number) => {
            return NftItem(nft, results[index])
          })
        }
      </div>
    </div>
  )
}