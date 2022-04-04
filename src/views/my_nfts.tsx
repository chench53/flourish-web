import { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useCall, useCalls, CallResult, useEthers } from '@usedapp/core';

import { Nft, NftMetadata, contract, fetchMetadata } from '../modules/eth';
import { CanvasDlg } from './canvas_dlg';

import './my_nfts.css';

function NftItem(props: { tokenId: number, result: CallResult }) {

  const [image, setImage] = useState('');
  const [nft, setNft] = useState<Nft>()
  const tokenId = props.tokenId, result = props.result;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (result?.value) {
      fetchMetadata(tokenId, result).then((data: NftMetadata) => {
        if (data) {
          console.log(data)
          setImage(data.image);
          setNft({
            tokenId: tokenId,
            metadata: {
              name: data.name,
              image: data.image,
              description: data.description,
              attributes: data.attributes
            }
          })
          // setImage('//ipfs.io/ipfs/QmQsT1c4ETrD3GcA6qMV5EiHbMvveVQ5Az2WzYPhJgqgeZ')
        }
      })
    }
  }, [result?.value])// eslint-disable-line react-hooks/exhaustive-deps

  function openImageCanvas() {
    setShow(true);
  }

  return (
    <Card key={tokenId.toString()} className='nft-item'>
      <Card.Title className='nft-header'>
        id: {tokenId}
      </Card.Title>
      <div className='img-wrapper'>
        {image ? (
          <Card.Img src={image} className='img' onClick={openImageCanvas}></Card.Img>
        ) : (
          <Spinner animation="border" role="status" className='spinner'></Spinner>
        )}
      </div>
      {
        nft && nft.metadata && (
          <CanvasDlg show={show} handleClose={handleClose} handlerShow={handleShow} nft={nft}></CanvasDlg>
        )
      }
    </Card>
  )
}

function NftsList(props: { 
  balance: number, 
  account: string | null | undefined,
  handlerShowDlg: Function,
}) {
  const balance: number = props.balance;
  const account: string | null | undefined = props.account;

  function useGetTokenIds() {
    const indexes = [...Array(balance).keys()]
    const calls = indexes.map(index => ({ contract, method: 'tokenOfOwnerByIndex', args: [account, index] })) ?? []
    const results = useCalls(calls) ?? []
    const values = results.map(result => result?.value?.[0].toNumber())
    return values
  }

  const tokenIds = useGetTokenIds();
  const filterdTokenIds = tokenIds.filter(x => { return x !== undefined })
  const calls = filterdTokenIds.map(tokenId => ({ contract, method: 'tokenURI', args: [tokenId] })) ?? []
  const results = useCalls(calls) ?? []
  return (
    <div className='nft-list'>
      {console.log("render MyNfts list")}
      {
        filterdTokenIds.map((tokenId: number, index: number) => {
          return <NftItem key={tokenId.toString()} tokenId={tokenId} result={results[index]}></NftItem>
        })
      }
    </div>
  )
}

export default function MyNfts() {

  const [showDlg, setShowDlg] = useState(false);

  const { account } = useEthers()

  function useBalance() {
    const { value, error } = useCall({ contract, method: "balanceOf", args: [account] }) ?? {}

    if (error) {
      console.error(error)
    }
    if (value) {
      const tokenCount = value ? value[0].toNumber() : 0
      return tokenCount
    }
  }

  const balance: number | undefined = useBalance()

  return (
    <div className='nft-collection'>
      {/* {console.log("render MyNfts")} */}
      <h4>My nft collection</h4>
      <div className='nft-list'>
        {(balance && account) ? (
          <NftsList balance={balance} account={account} handlerShowDlg={setShowDlg}></NftsList> 
        ): ''}
      </div>
      {/* <CanvasDlg></CanvasDlg> */}
    </div>
  )
}