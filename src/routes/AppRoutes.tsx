import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from 'src/routes/PrivateRoutes'
import {App} from 'src/App'

/* Pages */
import AuthPage from 'src/pages/AuthPage'
import ErrorsPage from 'src/pages/ErrorsPage'
import UserPage from 'src/pages/UserPage'

/* Hooks */
import useAuth from 'src/hooks/useAuth'

const AppRoutes: FC = () => {
  const currentAuth = useAuth()

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route element={<App />}>
          <Route path='error/404' element={<ErrorsPage />} />
          <Route path='error/*' element={<Navigate to='/error/404' />} />
          {currentAuth ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />

              <Route path='user/:pid/:eid' element={<UserPage />} />
              <Route path='user/*' element={<Navigate to='/error/404' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
