import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {toAbsoluteUrl} from 'src/utils'

/* Components */
import {Login} from 'src/components/auth/Login'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <div className='d-flex mb-12 align-items-center'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/favicon.ico')} className='h-45px' />
          <h2 className='display-6 m-3'>METAONEER</h2>
        </div>
        <div className='w-md-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export default AuthPage
