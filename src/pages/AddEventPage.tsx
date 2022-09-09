import {FC} from 'react'
import {EventMenu} from 'src/components/list/EventMenu'

const AddEventPage: FC = () => {
  return (
    <div className='row'>
      <EventMenu className='col-4' />
    </div>
  )
}

export default AddEventPage
