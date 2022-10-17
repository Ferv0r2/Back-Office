import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import {KTSVG, toAbsoluteUrl} from 'src/utils'

/* State */
import {Event} from '../states/eventState'
import {CollectionTypes} from '../states/nftState'

interface Props {
  event: Event
  nft: CollectionTypes
}

const EventCard: FC<Props> = ({event, nft}) => {
  const navigate = useNavigate()

  const moveHandler = (e: any) => {
    navigate(`/nft/${nft.contract}/event/${event.id}`, {
      state: {
        event: event,
        nft: nft,
      },
    })
  }

  const setType = () => {
    if (new Date(event.start_dt) <= new Date() && new Date(event.end_dt) > new Date())
      return 'success'
    if (new Date(event.end_dt) <= new Date()) return 'danger'
    if (new Date(event.start_dt) > new Date()) return 'warning'
  }

  return (
    <div onClick={moveHandler} className='card h-100 cursor-pointer'>
      <div className='card-header align-items-center'>
        <h3 className='card-title mt-6 pb-2 align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>{nft.name}</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            {nft.contract.replace(nft.contract.substring(6, 36), '...')}
          </span>
        </h3>
        <KTSVG path='/media/icons/circle.svg' className={`svg-icon-${setType()} svg-icon-2hx`} />
      </div>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <div className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-75px mb-6'>
            <img src={nft.thumbnail || toAbsoluteUrl('/media/avatars/blank.png')} alt='icon' />
          </div>
          <div className='fs-5 fw-bolder mb-2'>{event.title}</div>
        </div>
      </div>
      <div className='card-footer d-flex justify-content-between align-items-center'>
        <div>
          <div className='card-label fw-bold text-dark'>Start Date</div>
          <div>{moment(event.start_dt).format('YYYY-MM-DD HH:MM')}</div>
        </div>
        <div>~</div>
        <div>
          <div className='card-label fw-bold text-dark'>End Date</div>
          <div>{moment(event.end_dt).format('YYYY-MM-DD HH:MM')}</div>
        </div>
      </div>
    </div>
  )
}

export {EventCard}
