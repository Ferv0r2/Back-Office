import {FC, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from 'src/utils'
import {Event} from '../states/eventState'
import {CollectionTypes} from '../states/nftState'

interface Props {
  event: Event
  nft: CollectionTypes
}

const EventCard: FC<Props> = ({event, nft}) => {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = event.content
    }
  }, [event])

  const moveHandler = (e: any) => {
    navigate(`/nft/${nft.contract}/event/${event.id}`, {
      state: {
        event: event,
        nft: nft,
      },
    })
  }

  return (
    <div onClick={moveHandler} className='card h-100 cursor-pointer'>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-75px mb-6'>
            <img src={nft.thumbnail || toAbsoluteUrl('/media/avatars/blank.png')} alt='icon' />
          </div>
          <div className='fs-5 fw-bolder mb-2'>{event.title}</div>
        </div>
        <div ref={contentRef} className='fs-7 fw-bold text-gray-400 mt-auto'>
          {event.content}
        </div>
      </div>
    </div>
  )
}

export {EventCard}
