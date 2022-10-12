import {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EventCard} from 'src/components/feed/EventCard'
import useEvent from 'src/hooks/useEvent'
import {KTSVG} from 'src/utils'

interface Event {
  id: number
  project_id: number
  title: string
  content: string
  metadata?: any
  start_dt: Date
  end_dt: Date
}

const EventStatusPage: FC = () => {
  const location = useLocation()
  const {isLoading, eventList} = useEvent()
  const [isLive, setIsLive] = useState(true)
  const [statusList, setStatus] = useState([])

  useEffect(() => {
    if (location.pathname === '/event/live') {
      const tmp = eventList.filter((event: Event) => new Date(event.end_dt) > new Date())
      setStatus(tmp)
      setIsLive(true)
    } else {
      const tmp = eventList.filter((event: Event) => new Date(event.end_dt) <= new Date())
      setStatus(tmp)
      setIsLive(false)
    }
  }, [eventList, location])

  return (
    <>
      <div className='row mb-8 me-1'>
        <div className='col-4'>
          <div className='card'>
            <div className='card-header border-0 align-items-center'>
              <h3 className='card-title'>
                <span className='card-label fw-bold text-dark fs-3'>
                  {isLive ? 'Live Event' : 'End Event'}
                </span>
              </h3>
              <KTSVG
                path='/media/icons/duotune/abstract/abs050.svg'
                className={`svg-icon-2hx ${isLive ? 'svg-icon-success' : 'svg-icon-danger'}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row g-8'>
        {isLoading && <p className='fs-5'>Loading...</p>}
        {!isLoading && statusList?.length !== 0 ? (
          statusList?.map((event: Event) => (
            <div key={event.id} className='col-4'>
              <EventCard
                icon={'http://localhost:3011/media/svg/social-logos/Facebook.svg'}
                title={event.title}
                description={event.content}
              />
            </div>
          ))
        ) : (
          <p className='fs-5'>
            {isLive ? '진행중인 이벤트가 없습니다.' : '종료된 이벤트가 없습니다.'}
          </p>
        )}
      </div>
    </>
  )
}

export default EventStatusPage
