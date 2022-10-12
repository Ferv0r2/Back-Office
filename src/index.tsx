import {createRoot} from 'react-dom/client'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

// Apps
import 'react-datepicker/dist/react-datepicker.css'
import 'src/assets/sass/style.scss'
import 'src/assets/sass/plugins.scss'
import 'src/assets/sass/style.react.scss'
import {AppRoutes} from 'src/routes/AppRoutes'
import {Web3ReactProvider} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'
import {RecoilRoot} from 'recoil'

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
