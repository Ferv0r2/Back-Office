import {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EventCard} from 'src/components/feed/EventCard'
import {Event} from 'src/components/states/eventState'
import {CollectionTypes} from 'src/components/states/nftState'
import useEvent from 'src/hooks/useEvent'
import {KTSVG} from 'src/utils'

interface Props {
  collection: CollectionTypes[]
}

const EventStatusPage: FC<Props> = ({collection}) => {
  const location = useLocation()
  const {isLoading, eventList} = useEvent()
  const [isType, setIsType] = useState(0)
  const [statusList, setStatus] = useState([])
  const types = ['Live', 'End', 'Pending']

  useEffect(() => {
    if (location.pathname === '/event/live') {
      const tmp = eventList.filter(
        (event: Event) =>
          new Date(event.start_dt) <= new Date() && new Date(event.end_dt) > new Date()
      )
      setStatus(tmp)
      setIsType(0)
    } else if (location.pathname === '/event/end') {
      const tmp = eventList.filter((event: Event) => new Date(event.end_dt) <= new Date())
      setStatus(tmp)
      setIsType(1)
    } else {
      const tmp = eventList.filter((event: Event) => new Date(event.start_dt) > new Date())
      setStatus(tmp)
      setIsType(2)
    }
  }, [eventList, location])

  const setType = () => {
    if (location.pathname === '/event/live') return 'success'
    if (location.pathname === '/event/end') return 'danger'
    if (location.pathname === '/event/pending') return 'warning'
  }

  return (
    <>
      <div className='row mb-8 me-1'>
        <div className='col-4'>
          <div className='card'>
            <div className='card-header border-0 align-items-center'>
              <h3 className='card-title'>
                <span className='card-label fw-bold text-dark fs-3'>{types[isType]} Event</span>
              </h3>
              <KTSVG
                path='/media/icons/duotune/abstract/abs050.svg'
                className={`svg-icon-2hx svg-icon-${setType()}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row g-8'>
        {isLoading && <p className='fs-5'>Loading...</p>}
        {!isLoading && statusList?.length !== 0 ? (
          statusList?.map((event: Event) => {
            const nft = collection.filter((v) => v.id === event.project_id)
            return (
              <div key={event.id} className='col-4'>
                <EventCard event={event} nft={nft[0]} />
              </div>
            )
          })
        ) : (
          <p className='fs-5'>
            {isType === 0 && '진행중인 이벤트가 없습니다.'}
            {isType === 1 && '종료된 이벤트가 없습니다.'}
            {isType === 2 && '대기중인 이벤트가 없습니다.'}
          </p>
        )}
      </div>
    </>
  )
}

export default EventStatusPage
