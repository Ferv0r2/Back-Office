import {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {KTSVG} from 'src/utils'

/* Components */
import {Empty} from 'src/components/empty/Empty'
import {EventCard} from 'src/components/card/EventCard'

/* Hooks */
import useEvent from 'src/hooks/useEvent'

/* State */
import {CollectionTypes} from 'src/components/states/nftState'
import {Event} from 'src/components/states/eventState'

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
      tmp.sort((a: Event, b: Event) => Number(new Date(a.end_dt)) - Number(new Date(b.end_dt)))
      setStatus(tmp)
      setIsType(0)
    } else if (location.pathname === '/event/end') {
      const tmp = eventList.filter((event: Event) => new Date(event.end_dt) <= new Date())
      tmp.sort((a: Event, b: Event) => Number(new Date(b.end_dt)) - Number(new Date(a.end_dt)))
      setStatus(tmp)
      setIsType(1)
    } else {
      const tmp = eventList.filter((event: Event) => new Date(event.start_dt) > new Date())
      tmp.sort((a: Event, b: Event) => Number(new Date(a.start_dt)) - Number(new Date(b.start_dt)))
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
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <div className='card'>
            <div className='card-header border-0 align-items-center'>
              <h3 className='card-title'>
                <span className='card-label fw-bold text-dark fs-3'>{types[isType]} Event</span>
              </h3>
              <KTSVG
                path='/media/icons/circle.svg'
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
              <div key={event.id} className='col-lg-4 col-10 mx-lg-0 mx-auto'>
                <EventCard event={event} nft={nft[0]} />
              </div>
            )
          })
        ) : (
          <div className='col-md-10 col-xxl-4 mx-auto'>
            <Empty>
              {isType === 0 && 'Live event is empty'}
              {isType === 1 && 'End event is empty.'}
              {isType === 2 && 'Pending event is empty.'}
            </Empty>
          </div>
        )}
      </div>
    </>
  )
}

export default EventStatusPage
