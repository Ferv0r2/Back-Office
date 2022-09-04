/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {EventList} from 'src/components/dashboard/EventList'
import {BarChart} from 'src/components/chart/BarChart'
import {LineChart} from 'src/components/chart/LineChart'
import {MixChart} from 'src/components/chart/MixChart'
import {ItemList} from 'src/components/dashboard/ItemList'

const testEvent = [
  {
    id: 1,
    name: '유튜브 구독 이벤트',
    nft: 'Kepler-452b',
    startDate: 'D-1',
  },
  {
    id: 2,
    name: '민팅 완판 기념 이벤트',
    nft: 'Klay-Weasel',
    startDate: 'D-2',
  },
  {
    id: 3,
    name: '파트너십 이벤트',
    nft: 'Kepler-452b',
    startDate: 'D-8',
  },
  {
    id: 4,
    name: '굿즈 샵 오픈 기념 이벤트',
    nft: 'Klay-Weasel',
    endDate: 'D+12',
  },
  {
    id: 5,
    name: '상위 홀더 이벤트',
    nft: 'Klay-Weasel',
    endDate: 'D+13',
  },
]

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xxl-4'>
        <EventList className='card-xxl-stretch mb-xl-3' title='Live Event' eventItems={testEvent} />
      </div>
      <div className='col-xxl-4'>
        <EventList className='card-xxl-stretch mb-xl-3' title='End Event' eventItems={testEvent} />
      </div>
      <div className='col-xxl-4'>
        <LineChart
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='175px'
        />
        <BarChart
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='150px'
        />
      </div>
    </div>
    {/* end::Row */}

    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <ItemList className='card-xxl-stretch mb-xl-8' />
      </div>
      <div className='col-xxl-4'>
        <MixChart className='card-xxl-stretch mb-xl-3' chartColor='success' chartHeight='150px' />
      </div>
    </div>
  </>
)

export {DashboardPage}
