import {FC} from 'react'
import {EventList} from 'src/components/dashboard/EventList'
import {BarChart} from 'src/components/chart/BarChart'
// import {MixChart} from 'src/components/chart/MixChart'
import {ItemList} from 'src/components/dashboard/ItemList'
import {QuickMenu} from 'src/components/dashboard/QuickMenu'

const DashboardPage: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-md-5 g-xxl-8'>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <QuickMenu
            className='card-xxl-stretch mb-xl-8'
            balance={Number(sessionStorage.getItem('WALLET_BALANCE'))}
          />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto pt-sm-0 pt-4'>
          <ItemList className='card-xxl-stretch mb-xl-8' />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <BarChart className='card-xxl-stretch-75 mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      <div className='row gy-5 g-md-5 gx-xxl-8'>
        {/* <div className='col-md-10 col-xxl-4 mx-auto'>
          <MixChart className='card-xxl-stretch mb-xl-3' chartColor='success' chartHeight='125px' />
        </div> */}
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <EventList className='card-xxl-stretch mb-xl-3' title='Live' />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <EventList className='card-xxl-stretch mb-xl-3' title='End' />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <EventList className='card-xxl-stretch mb-xl-3' title='Pending' />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
