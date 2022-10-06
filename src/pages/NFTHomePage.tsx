import {FeedsWidget} from 'src/components/feed/FeedsWidget'
import TokenList from 'src/components/list/TokenList'
import {CollectionTypes} from 'src/components/states/nftState'

interface Props {
  nft: CollectionTypes
}

const NFTHomePage = ({nft}: Props) => {
  return (
    <>
      <div className='row gy-8 pb-8'>
        <FeedsWidget className='col-11 col-md-9 mx-auto' nft={nft} mode='detail' />
        <TokenList className='col-11 col-md-9 mx-auto' />
      </div>
    </>
  )
}

export default NFTHomePage
