import {FC} from 'react'
import {useRecoilValue} from 'recoil'
import {basketState} from '../states/eventState'

interface Props {
  nft: string
}

const Example: FC<Props> = ({nft}) => {
  const onItem = useRecoilValue(basketState)

  return (
    <div className='card card-custom'>
      <div className='card-header'>
        <h3 className='card-title'>{nft}</h3>
        <div className='card-toolbar'>
          <button type='button' className='btn btn-sm btn-light'>
            Action
          </button>
        </div>
      </div>
      <div className='card-body card-scroll h-200px'>Lorem Ipsum is simply dummy text...</div>
      <div className='card-footer'>Footer</div>
    </div>
  )
}

export default Example
