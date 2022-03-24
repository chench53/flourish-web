import './my_nfts.css';

const MyNfts = (props) => {
  var nfts = props.nfts.map(nft => {
    return (
      <div key={nft.id}>{nft.metadata}</div>
    )
  })
  return (
    <div>
      {nfts}
    </div>
  )
}

export default MyNfts;