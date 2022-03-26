import { Contract } from '@ethersproject/contracts'

import { useCall, useEthers, useTokenBalance, useEtherBalance } from '@usedapp/core'
// import Erc721Abi from '../chain-info/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.3.2/IERC721.json';

// const Erc721Interface = new utils.Interface(Erc721Abi)
const Erc721Interface = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const contract = new Contract('0xA129c36Fa5869862d934bf58d256bDBcBfB52A7f', Erc721Interface)

export interface NftMetadata {
  name: String,
  image: string
}

export type Nft = {
  readonly tokenId: Number,
  metadata?: NftMetadata,
}

export async function FetchMetadata(tokenId: Number) {
  
  console.log(`FetcTokenURI tokenId start: ${tokenId}`)
  const { value, error } = useCall({ contract, method: 'tokenURI', args: [tokenId] }) ?? {}
  console.log(`FetcTokenURI tokenId done: ${tokenId}  ${value}`)
  if (error) {
    console.error(error)
  }
  if (value) {
    const tokenUri = value[0]
    if (tokenUri && tokenUri.startsWith("http")) {
      console.log(`FetchMetadata tokenId start: ${tokenId}`)
      const response = await fetch(tokenUri)
      console.log(`FetchMetadata tokenId done: ${tokenId}`)
      if (response.ok) {
        // console.log(response)
        const res = await response.json()
        console.log(res)
        return res
      }
    }
  }
  
  // fetch("allowances")
  // .then(data => {
  //   return data.json();
  // })
  // .then(data => {
  //   setMetadata(data);
  // })
  // .catch(err => {
  //   console.log(123123);
  // });
  // return await fetch("allowances")

}