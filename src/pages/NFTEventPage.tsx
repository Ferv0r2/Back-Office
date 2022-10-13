import {FC, useEffect, useState} from 'react'
import {EventCard} from 'src/components/feed/EventCard'
import {Event} from 'src/components/states/eventState'
import {CollectionTypes} from 'src/components/states/nftState'
import useEvent from 'src/hooks/useEvent'

interface Props {
  nft: CollectionTypes
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
      {isLoading ? (
        <p className='fs-5'>Loading...</p>
      ) : currentEvent?.length !== 0 ? (
        currentEvent?.map((event: Event) => (
          <div key={event.id} className='col-4'>
            <EventCard event={event} nft={nft} />
          </div>
        ))
      ) : (
        <p className='fs-5'>이벤트가 없습니다.</p>
      )}
    </div>
  )
}

export default NFTEventPage
