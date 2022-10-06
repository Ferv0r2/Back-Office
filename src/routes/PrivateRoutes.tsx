import {Fragment} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'src/layout/MasterLayout'
import DashboardPage from 'src/pages/DashboardPage'
import AddProjectPage from 'src/pages/AddProjectPage'
import NFTDetailPage from 'src/pages/NFTDetailPage'
import NFTHomePage from 'src/pages/NFTHomePage'
import NFTEventPage from 'src/pages/NFTEventPage'
import CreateEventPage from 'src/pages/CreateEventPage'
import useCollection from 'src/hooks/useCollection'

const PrivateRoutes = () => {
  const {isLoading, collections} = useCollection()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='nft/*' element={<Navigate to='/nft/management' />} />
        <Route path='nft/management' element={<AddProjectPage />} />
        <Route path='nft/collections/*' element={<Navigate to={`/nft/management`} />} />
        {!isLoading &&
          collections?.map((nft) => {
            return (
              <Fragment key={nft.contract}>
                <Route path={`nft/${nft.contract}`} element={<NFTDetailPage />} />
                <Route
                  path={`nft/${nft.contract}/*`}
                  element={<Navigate to={`nft/${nft.contract}/home`} />}
                />
                <Route path={`nft/${nft.contract}/home`} element={<NFTHomePage nft={nft} />} />
                <Route path={`nft/${nft.contract}/event`} element={<NFTEventPage />} />
              </Fragment>
            )
          })}
        <Route path='event/create' element={<CreateEventPage />} />
        <Route path='event/live' element={<CreateEventPage />} />
        <Route path='event/end' element={<CreateEventPage />} />
        <Route path='event/*' element={<Navigate to='/event/create' />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
