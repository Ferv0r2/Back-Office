import {FC, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {EventUser} from 'src/components/event/EventUser'
import {KTSVG} from 'src/utils'

const BASE_URL = 'https://metaoneer.club/user/event/'
const EventDetailPage: FC = () => {
  const {state}: any = useLocation()
  const [isCopy, setIsCopy] = useState(false)

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(BASE_URL + state.event.id)
      setIsCopy(true)
      setTimeout(async () => {
        setIsCopy(false)
      }, 1500)
    } catch (error) {
      alert('Copy is failed')
    }
  }
  return (
    <div className='row'>
      <div className='col-lg-4 col-10 mx-auto py-4'>
        <EventUser event={state.event} nft={state.nft} />
        <div className='card mt-8'>
          <div className='card-body w-100'>
            <div className='mb-3 fw-bold'>Event URL</div>
            <div className='d-flex justify-content-between align-items-center bg-gray-200 rounded p-4'>
              <div className='text-truncate me-1'>{BASE_URL + state.event.id}</div>
              <div className='position-relative'>
                {isCopy && (
                  <div className='position-absolute top-50 right-50'>
                    <span className='badge badge-primary py-3'>Copied !</span>
                  </div>
                )}
                <button
                  onClick={copyHandler}
                  type='button'
                  className='btn btn-icon btn-active-light-primary'
                >
                  <KTSVG path='/media/icons/duotune/general/gen054.svg' className='svg-icon-2x' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
