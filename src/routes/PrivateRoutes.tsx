import {Fragment} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'src/layout/MasterLayout'
import {DashboardWrapper} from 'src/components/dashboard/DashboardWrapper'
import {AddProjectPage} from 'src/pages/AddProjectPage'
import NFTDetailPage from 'src/pages/NFTDetailPage'
import NFTHoldersPage from 'src/pages/NFTHoldersPage'
import NFTEventPage from 'src/pages/NFTEventPage'

const testNFT = [
  {
    thumbnail:
      'https://lh3.googleusercontent.com/ViAAKgvW8myVK4OI0unEqIXGTttbHAPLB_A9vXXMXKbF2UagBhgC97ru_7OXtFzA7Q0ULD7UhrEt5yipH0DhunbRXjfqclG0VRo_tg=s168',
    contract: '0x928267e7db3d173898553ff593a78719bb16929f',
    name: 'Kepler-452b',
    interface: 'KIP17',
    symbol: 'K452',
    holders: 1883,
    totalSupply: 58380,
    homepage: 'https://kepler-452b.net',
  },
  {
    thumbnail:
      'https://lh3.googleusercontent.com/nMgnwb1bFrEqQ65XaDMar4G3Zcp_o7Z0aduvc1C6THtiGBMvPbgq1KTa29dVFGIXfiwISIgqQXzYIqIisA7psvoLYxdr0UpT2lO4FA=s168',
    contract: '0xe7e78910446a0bff06f560b02f103f8a42e4a694',
    name: 'Klay Weasel',
    interface: 'KIP17',
    symbol: 'KWL',
    holders: 152,
    totalSupply: 1104,
  },
]

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='nft/*' element={<Navigate to='/nft/management' />} />
        <Route path='nft/management' element={<AddProjectPage />} />
        <Route path='nft/collections' element={<AddProjectPage />} />
        <Route
          path='nft/collections/*'
          element={<Navigate to={`/nft/${testNFT[0].contract}/holders`} />}
        />
        {testNFT.map((nft) => {
          return (
            <Fragment key={nft.contract}>
              <Route path={`nft/${nft.contract}`} element={<NFTDetailPage />} />
              <Route path={`nft/${nft.contract}/holders`} element={<NFTHoldersPage />} />
              <Route path={`nft/${nft.contract}/event`} element={<NFTEventPage />} />
            </Fragment>
          )
        })}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
