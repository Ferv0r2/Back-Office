import {FC} from 'react'

/* Components */
import {NFTCard} from 'src/components/card/NFTCard'
import {TabTable} from 'src/components/tab/TabTable'

/* State */
import {CollectionTypes} from 'src/components/states/nftState'

interface Props {
  nft: CollectionTypes
}

const NFTHomePage: FC<Props> = ({nft}) => {
  return (
    <div className='row gy-8 pb-8'>
      <NFTCard className='col-11 col-md-9 mx-auto' nft={nft} mode='detail' />
      <TabTable
        pid={nft.id}
        totalSupply={nft.total_supply}
        holderCount={nft.holder_count}
        className='col-11 col-md-9 mx-auto'
      />
    </div>
  )
}

export default NFTHomePage
