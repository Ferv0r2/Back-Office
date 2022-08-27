import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from 'src/layout/core'
import {MasterInit} from 'src/layout/MasterInit'
const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <Outlet />
        <MasterInit />
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
