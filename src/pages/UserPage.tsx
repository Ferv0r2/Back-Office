import {FC} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'

/* API */
import {UserEventDetailAPI} from 'src/api'

/* Components */
import {EventUser} from 'src/components/item/EventUser'
import {Empty} from 'src/components/empty/Empty'

const UserPage: FC = () => {
  const params = useParams()
  const {isLoading, data} = useQuery(['UserEvent'], async () => {
    const res = await UserEventDetailAPI(Number(params.eid))
    return res
  })

  return (
    <>
      <div className='d-flex mx-auto mt-16 align-items-center justify-content-center'>
        <img alt='Logo' src='/media/logos/favicon.ico' className='h-45px' />
        <h2 className='display-6 m-3'>METAONEER</h2>
      </div>
      <div className='row m-0 d-flex flex-center py-16 pb-lg-20'>
        {isLoading ? (
          <div className='col-md-10 col-xxl-4 mx-auto'>
            <Empty>Loading...</Empty>
          </div>
        ) : (
          <div className='w-lg-500px col-11'>
            <EventUser event={data} />
          </div>
        )}
      </div>
    </>
  )
}

export default UserPage
