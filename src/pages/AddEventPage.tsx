import {FC} from 'react'
import {EventBasket} from 'src/components/list/EventBasket'
import {EventMenu} from 'src/components/list/EventMenu'
const AddEventPage: FC = () => {
  return (
    <>
      <div className='row g-8'>
        <div className='col-4'>
          <EventMenu />
        </div>
        <div className='col-6'>
          <EventBasket />
        </div>
      </div>
    </>
  )
}

export default AddEventPage
