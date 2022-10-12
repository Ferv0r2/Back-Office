import {FC, useEffect, useState} from 'react'
import {EventCard} from 'src/components/feed/EventCard'
import {CollectionTypes} from 'src/components/states/nftState'
import useEvent from 'src/hooks/useEvent'

interface Props {
  nft: CollectionTypes
}

interface Event {
  id: number
  project_id: number
  title: string
  content: string
  metadata?: any
  start_dt: Date
  end_dt: Date
}

const NFTEventPage: FC<Props> = ({nft}) => {
  const {isLoading, eventList} = useEvent()
  const [currentEvent, setCurrentEvent] = useState([])

  useEffect(() => {
    const tmp = eventList.filter((event: Event) => event.project_id === nft.id)
    setCurrentEvent(tmp)
  }, [eventList, nft])

  return (
    <div className='row g-8'>
      {isLoading && <p className='fs-5'>Loading...</p>}
      {!isLoading && currentEvent?.length !== 0 ? (
        currentEvent?.map((event: Event) => (
          <div key={event.id} className='col-4'>
            <EventCard
              icon={'http://localhost:3011/media/svg/social-logos/Facebook.svg'}
              title={event.title}
              description={event.content}
            />
          </div>
        ))
      ) : (
        <p className='fs-5'>이벤트가 없습니다.</p>
      )}
    </div>
  )
}

export default NFTEventPage
