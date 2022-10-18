import {useEffect, useState} from 'react'
import {toAbsoluteUrl} from 'src/utils'

/* Components */
import {EventUser} from 'src/components/item/EventUser'
import {EventDetailAPI} from 'src/api'
import {useParams} from 'react-router-dom'

const UserPage = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getEvent = async () => {
      const res = await EventDetailAPI({
        pid: Number(params.pid),
        eid: Number(params.eid),
      })
      console.log(res)
    }
    getEvent()
  }, [])

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <div className='d-flex mb-12 align-items-center'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/favicon.ico')} className='h-45px' />
          <h2 className='display-6 m-3'>METAONEER</h2>
          {/* {!isLoading && <EventUser />} */}
        </div>
      </div>
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='/' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='/' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='/' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

export default UserPage
