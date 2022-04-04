import { Contract } from '@ethersproject/contracts'
import { CallResult } from '@usedapp/core';
import ABI from './abi.json';

export const contractAddress: string = process.env.REACT_APP_CONTRACT_TOKEN || ''

export const contract = new Contract(contractAddress, ABI)

export interface NftMetadata {
  name: string,
  image: string,
  description?: string
  attributes?: any[]
}

export type Nft = {
  readonly tokenId: Number,
  metadata?: NftMetadata,
}

export type Image = {
  readonly name: string,
}

export const fetchMetadata = async (tokenId: number, result: CallResult) => {
  const value = result?.value;
  const error = result?.error
  // let tokenId = nft.tokenId;
  console.log(`FetcTokenURI tokenId done: ${tokenId}  ${value}`)
  if (error) {
    console.error(error)
  }
  if (value) {
    const tokenUri = value[0]
    if (tokenUri && tokenUri.startsWith("http")) {
      const response = await fetch(tokenUri)
      if (response.ok) {
        const res = await response.json()
        return res
      } else {
        console.error(response)
      }
    }
  }
}
