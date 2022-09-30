import {FC} from 'react'
import {EventBasket} from 'src/components/list/EventBasket'
import {EventMenu} from 'src/components/list/EventMenu'
import {KTSVG} from 'src/utils'
const AddEventPage: FC = () => {
  return (
    <>
      <div className='row g-8'>
        <div className='col-4'>
          <EventMenu />
        </div>
        <div className='col-1 mt-40'>
          <KTSVG
            path='/media/icons/duotune/arrows/arr001.svg'
            className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
          />
          <KTSVG
            path='/media/icons/duotune/arrows/arr001.svg'
            className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
          />
          <KTSVG
            path='/media/icons/duotune/arrows/arr001.svg'
            className='d-flex justify-content-center py-6 svg-icon-4x text-primary'
          />
        </div>

        <div className='col-5'>
          <EventBasket />
        </div>
      </div>
    </>
  )
}

export default AddEventPage
