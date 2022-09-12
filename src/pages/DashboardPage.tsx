/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {EventList} from 'src/components/dashboard/EventList'
import {BarChart} from 'src/components/chart/BarChart'
import {MixChart} from 'src/components/chart/MixChart'
import {ItemList} from 'src/components/dashboard/ItemList'
import {QuickMenu} from 'src/components/dashboard/QuickMenu'
import {useRecoilValue} from 'recoil'
import {kaikasState, metamaskState, selectedWalletState} from 'src/components/states/walletState'

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
    name: '파트너십 이벤트',
    nft: 'Kepler-452b',
    startDate: 'D-8',
  },
  {
    id: 5,
    name: '파트너십 이벤트',
    nft: 'Kepler-452b',
    startDate: 'D-8',
  },
]

const DashboardPage: FC = () => {
  const selectWallet = useRecoilValue(selectedWalletState)
  const metamaskWallet = useRecoilValue(metamaskState)
  const kaikasWallet = useRecoilValue(kaikasState)

  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-md-5 g-xxl-8'>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <QuickMenu
            className='card-xxl-stretch mb-xl-8'
            balance={selectWallet === 'metamask' ? metamaskWallet.balance : kaikasWallet.balance}
          />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto pt-sm-0 pt-4'>
          <ItemList className='card-xxl-stretch mb-xl-8' />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <BarChart className='card-xxl-stretch-60 mb-5 mb-xl-8' />
        </div>
      </div>
      {/* end::Row */}

      <div className='row gy-5 g-md-5 gx-xxl-8'>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <MixChart className='card-xxl-stretch mb-xl-3' chartColor='success' chartHeight='125px' />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <EventList
            className='card-xxl-stretch mb-xl-3'
            title='Live Event'
            eventItems={testEvent}
          />
        </div>
        <div className='col-md-10 col-xxl-4 mx-auto'>
          <EventList
            className='card-xxl-stretch mb-xl-3'
            title='End Event'
            eventItems={testEvent}
          />
        </div>
      </div>
    </>
  )
}

export {DashboardPage}
