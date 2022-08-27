import clsx from 'clsx'
import {useSetRecoilState} from 'recoil'
import {userAuthState} from 'src/components/states/walletState'

type Props = {
  toggleBtnClass?: string
}

const Logout = ({toggleBtnClass}: Props) => {
  const setAuth = useSetRecoilState(userAuthState)

  const logoutHandler = () => {
    setAuth(false)
    sessionStorage.removeItem('CONNECT')
    document.location.reload()
  }

  return (
    <button
      onClick={logoutHandler}
      type='button'
      className={clsx('btn btn-light ', toggleBtnClass)}
    >
      Sign out
    </button>
  )
}

export {Logout}
