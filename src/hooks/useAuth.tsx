import {useRecoilState} from 'recoil'
import {authState} from 'src/components/states/walletState'

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState)

  const connect = sessionStorage.getItem('CONNECT')
  connect ? setAuth(true) : setAuth(false)

  return auth
}

export default useAuth
