import axios from 'axios'
import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {authState} from 'src/components/states/walletState'

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState)

  useEffect(() => {
    const connect = sessionStorage.getItem('CONNECT')
    connect ? setAuth(true) : setAuth(false)

    const token = sessionStorage.getItem('ACCESS_TOKEN')
    axios.defaults.baseURL = process.env.REACT_APP_HOST_API_URL
    axios.defaults.headers.common = {
      Authorization: token
        ? `JWT ${String(token)}`
        : String(process.env.REACT_APP_AXIOS_HEADERS_TOKEN),
    }
  }, [auth, setAuth])

  return auth
}

export default useAuth
