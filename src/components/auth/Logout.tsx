import clsx from 'clsx'

interface Props {
  toggleBtnClass?: string
}

const Logout = ({toggleBtnClass}: Props) => {
  const logoutHandler = () => {
    sessionStorage.removeItem('ACCESS_TOKEN')
    sessionStorage.removeItem('CONNECT')
    sessionStorage.removeItem('WALLET_ADDRESS')
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
