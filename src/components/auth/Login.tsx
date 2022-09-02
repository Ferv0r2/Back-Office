import {useEffect, useState} from 'react'
import clsx from 'clsx'
import axios from 'axios'
import {toAbsoluteUrl} from 'src/utils'

/* Wallet */
import {useWeb3React} from '@web3-react/core'
import {injected} from 'src/components/blockchain/web3'

/* State */
import {useRecoilState, useSetRecoilState} from 'recoil'
import {
  userAuthState,
  kaikasAddressState,
  metamaskAddressState,
  selectedWalletState,
} from 'src/components/states/walletState'
import {setAuthToken} from 'src/utils/setAuthToken'

export function Login() {
  const {account, active, activate} = useWeb3React()
  const [loading, setLoading] = useState(false)
  const setAuth = useSetRecoilState(userAuthState)
  const setMetamaskAddress = useSetRecoilState(metamaskAddressState)
  const [kaikasAddress, setKaikasAddress] = useRecoilState(kaikasAddressState)
  const [selectedWallet, setSelectedWallet] = useRecoilState(selectedWalletState)

  console.log(selectedWallet)

  useEffect(() => {}, [setKaikasAddress])

  const metamaskConnectHandler = () => {
    setSelectedWallet('metamask')
    if (active) {
      return
    }

    activate(injected, (err) => {
      window.open('https://metamask.io/download.html')
    })
    setMetamaskAddress(String(account))
  }

  const kaikasConnectHandler = async () => {
    await loadAccountInfo()
    await setNetworkInfo()
    setSelectedWallet('kaikas')
  }

  const loadAccountInfo = async () => {
    const {klaytn} = window

    if (klaytn) {
      try {
        await klaytn.enable()
        setAccountInfo()
        klaytn.on('accountsChanged', () => {
          setAccountInfo()
        })
      } catch (error) {
        // console.log(error);
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
      window.open(
        'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko'
      )
    }
  }

  const setAccountInfo = async () => {
    const {klaytn} = window
    if (klaytn === undefined) return

    const kaikasAddr = klaytn.selectedAddress
    setKaikasAddress(kaikasAddr)
  }

  const setNetworkInfo = async () => {
    const {klaytn} = window
    if (klaytn === undefined) return

    klaytn.on('networkChanged', () => alert(`${klaytn.networkVersion} 네트워크로 변경되었습니다.`))
  }

  const setAuthHandler = async () => {
    setLoading(true)
    if (selectedWallet && (account || kaikasAddress)) {
      // axios
      //   .post(`http://metaoneer.bad-bot.shop:9700/api/auth/user/`, {
      //     wallet: '0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C',
      //     contract: '0x928267e7db3d173898553ff593a78719bb16929f',
      //   })
      //   .then((response) => {
      //     //get token from response
      //     const token = response.data.token

      //     //set JWT token to local
      //     localStorage.setItem('token', token)

      //     //set token to axios common header
      //     setAuthToken(token)

      //     console.log(token)
      //     console.log(response)
      //   })
      //   .catch((err) => {
      //     setLoading(false)
      //     console.log(err)
      //   })

      sessionStorage.setItem('CONNECT', selectedWallet)
      sessionStorage.setItem(
        'WALLET_ADDRESS',
        selectedWallet === 'metamask' ? String(account) : String(kaikasAddress)
      )
      setAuth(true)
    } else {
      alert('지갑을 연결해 주세요.')
    }
    setLoading(false)
  }

  return (
    <form className='form w-100' onSubmit={setAuthHandler} noValidate id='kt_login_signin_form'>
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In</h1>
      </div>
      {/* begin::Heading */}

      {/* begin::Action */}
      <div className='text-center'>
        {/* begin::Metamask */}
        <button
          type='button'
          onClick={metamaskConnectHandler}
          className={clsx(
            'btn btn-flex flex-center fs-6 fs-md-5 btn-light btn-lg w-100 py-6 mb-5',
            selectedWallet === 'metamask' && 'ribbon ribbon-end ribbon-clip'
          )}
        >
          {selectedWallet === 'metamask' && (
            <div className='ribbon-label'>
              Selected
              <span className='ribbon-inner bg-info' />
            </div>
          )}
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/metamask.svg')}
            className='h-20px me-3'
          />
          {account?.replace(account.substring(6, 36), '...') || 'Continue with Metamask'}
        </button>
        {/* end::Metamask */}

        {/* begin::Kaikas */}
        <button
          type='button'
          onClick={kaikasConnectHandler}
          className={clsx(
            'btn btn-flex flex-center fs-6 fs-md-5 btn-light btn-lg w-100 py-6 mb-5',
            selectedWallet === 'kaikas' && 'ribbon ribbon-end ribbon-clip'
          )}
        >
          {selectedWallet === 'kaikas' && (
            <div className='ribbon-label'>
              Selected
              <span className='ribbon-inner bg-info' />
            </div>
          )}
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/kaikas.svg')}
            className='h-20px me-3'
          />
          {kaikasAddress
            ? kaikasAddress.replace(kaikasAddress.substring(6, 36), '...')
            : 'Continue with Kaikas'}
        </button>
        {/* end::Kaikas */}

        <button
          type='submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={!selectedWallet || !(account || kaikasAddress) || loading}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
