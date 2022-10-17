import {Fragment} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'src/layout/MasterLayout'

/* Pages */
import DashboardPage from 'src/pages/DashboardPage'
import AddProjectPage from 'src/pages/AddProjectPage'
import NFTHomePage from 'src/pages/NFTHomePage'
import NFTEventPage from 'src/pages/NFTEventPage'
import EventCreatePage from 'src/pages/EventCreatePage'
import EventStatusPage from 'src/pages/EventStatusPage'
import EventDetailPage from 'src/pages/EventDetailPage'

/* Hooks */
import useCollection from 'src/hooks/useCollection'
import useEvent from 'src/hooks/useEvent'

const PrivateRoutes = () => {
  const {collections} = useCollection()
  const {isLoading} = useEvent()

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
                <Route
                  path={`nft/${nft.contract}/*`}
                  element={<Navigate to={`/nft/${nft.contract}/home`} />}
                />
                <Route path={`nft/${nft.contract}/home`} element={<NFTHomePage nft={nft} />} />
                <Route path={`nft/${nft.contract}/event`} element={<NFTEventPage nft={nft} />} />
                <Route path={`nft/${nft.contract}/event/:eid`} element={<EventDetailPage />} />
              </Fragment>
            )
          })}
        <Route path='event/create' element={<EventCreatePage />} />
        <Route path='event/live' element={<EventStatusPage collection={collections} />} />
        <Route path='event/end' element={<EventStatusPage collection={collections} />} />
        <Route path='event/pending' element={<EventStatusPage collection={collections} />} />
        <Route path='event/*' element={<Navigate to='/event/live' />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
