import React from 'react'
import {useLocation} from 'react-router-dom'
import {EventUser} from 'src/components/event/EventUser'

const EventDetailPage = () => {
  const {state}: any = useLocation()

  return (
    <div className='row'>
      <div className='col-4 mx-auto'>
        <EventUser event={state.event} nft={state.nft} />
      </div>
    </div>
  )
}

export default EventDetailPage
