import { Card, Spinner } from 'react-bootstrap';

import './my_nfts.css';

import { Nft, NftMetadata, contract, contractAddress, fetchMetadata } from '../modules/eth';
import { useState, useEffect } from 'react';

import { useCall, useCalls,  CallResult, useEthers, useTokenBalance} from '@usedapp/core';


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

function NftsList(props: {balance: number, account: string|null|undefined}) {
  const balance: number = props.balance;
  const account: string|null|undefined = props.account;

  function useGetTokenIds() {
    const indexes = [...Array(balance).keys()]
    console.log(indexes)
    const calls = indexes.map(index => ({ contract, method: 'tokenOfOwnerByIndex', args: [account, index] })) ?? []
    const results = useCalls(calls) ?? []
    const values = results.map(result => result?.value?.[0].toNumber())
    console.log(results)
    return values
  }

  const tokenIds = useGetTokenIds();
  console.log(tokenIds)
  const filterdTokenIds = tokenIds.filter(x => {return x !== undefined})
  const calls = filterdTokenIds.map(tokenId => ({ contract, method: 'tokenURI', args: [tokenId] })) ?? []
  console.log(calls)
  const results = useCalls(calls) ?? []
  console.log(results)
  return (
    <div>
      {
        filterdTokenIds.map((tokenId: number, index: number) => {
          return NftItem({tokenId: tokenId}, results[index])
        })
      }
    </div>
  )
}

export default function MyNfts() {
  const {account} = useEthers()

  function useBalance() {
    const { value, error } = useCall({contract, method: "balanceOf", args:[account]}) ?? {}
    if (error) {
      console.error(error)
    }
    if (value) {
      const tokenCount = value[0].toNumber()
      console.log(tokenCount)
      return tokenCount
    }
    return 0;
  }

  const balance: number = useBalance()

  return (
    <div className='nft-collection'>
      <h4>My nft collection</h4>
      <div className='nft-list'>
        {/* {console.log(account)} */}
        {/* {(balance && account) ? <NftsList balance={balance} account={account}></NftsList> : ''} */}
        {/* <NftsList balance={balance}></NftsList> */}
      </div>
    </div>
  )
}