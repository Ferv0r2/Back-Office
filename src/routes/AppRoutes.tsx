/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from 'src/routes/PrivateRoutes'
import {ErrorsPage} from 'src/pages/ErrorsPage'
import {AuthPage} from 'src/pages/AuthPage'
import {App} from 'src/App'
import useAuth from 'src/hooks/useAuth'
import {UserPage} from 'src/pages/UserPage'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */

const AppRoutes: FC = () => {
  const currentAuth = useAuth()

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          {currentAuth ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />

              <Route path='user/*' element={<UserPage />} />
              <Route path='user/:eid' element={<UserPage />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
