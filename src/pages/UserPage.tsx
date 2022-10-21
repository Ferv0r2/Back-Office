import {FC} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'

/* API */
import {UserEventDetailAPI} from 'src/api'

/* Components */
import {EventUser} from 'src/components/item/EventUser'

const UserPage: FC = () => {
  const params = useParams()
  const {isLoading, data} = useQuery(['UserEvent'], async () => {
    const res = await UserEventDetailAPI(Number(params.eid))
    return res
  })

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='d-flex mx-auto mt-12 align-items-center'>
        <img alt='Logo' src='/media/logos/favicon.ico' className='h-45px' />
        <h2 className='display-6 m-3'>METAONEER</h2>
      </div>
      <div className='row m-0 d-flex flex-center flex-column flex-column-fluid py-10 pb-lg-20'>
        <div className='w-lg-500px col-11'>{!isLoading && <EventUser event={data} />}</div>
      </div>
    </div>
  )
}

export default UserPage
