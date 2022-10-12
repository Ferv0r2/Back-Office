import {FC} from 'react'
import {EventCard} from 'src/components/feed/EventCard'
import useEvent from 'src/hooks/useEvent'

const EventStatusPage: FC = () => {
  const {isLoading, eventList} = useEvent()

  console.log(eventList)

  return (
    <div>
      <EventCard
        icon={'http://localhost:3011/media/svg/social-logos/Facebook.svg'}
        title={'hd'}
        description={'hd'}
      />
    </div>
  )
}

export default EventStatusPage
