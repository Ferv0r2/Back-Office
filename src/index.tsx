import {createRoot} from 'react-dom/client'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import 'src/assets/sass/style.scss'
import 'src/assets/sass/plugins.scss'
import 'src/assets/sass/style.react.scss'
import {AppRoutes} from 'src/routing/AppRoutes'
import {Web3ReactProvider} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'
import {RecoilRoot} from 'recoil'

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
Chart.register(...registerables)

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider, 'any')
  return library
}

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Web3ReactProvider getLibrary={getLibrary}>
          <AppRoutes />
        </Web3ReactProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}
