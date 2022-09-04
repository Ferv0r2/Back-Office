import {useState} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl} from 'src/utils'

/* Wallet */
import {useWeb3React} from '@web3-react/core'
import {injected} from 'src/components/blockchain/metamask'
import caver from 'src/components/blockchain/caver'
import web3 from 'src/components/blockchain/web3'

/* API */
import {AuthNonceAPI, AuthTokenAPI} from 'src/api'

/* State */
import {useRecoilState, useSetRecoilState} from 'recoil'
import {
  userAuthState,
  kaikasAddressState,
  metamaskAddressState,
  selectedWalletState,
} from 'src/components/states/walletState'

export function Login() {
  const {account, chainId, active, activate} = useWeb3React()
  const [loading, setLoading] = useState(false)
  const setAuth = useSetRecoilState(userAuthState)
  const setMetamaskAddress = useSetRecoilState(metamaskAddressState)
  const [kaikasAddress, setKaikasAddress] = useRecoilState(kaikasAddressState)
  const [kaikasNetwork, setKaikasNetwork] = useState('')
  const [selectedWallet, setSelectedWallet] = useRecoilState(selectedWalletState)

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
    setKaikasNetwork(klaytn.networkVersion)
  }

  const setAuthHandler = async () => {
    setLoading(true)
    if (!selectedWallet) {
      alert('지갑을 연결해 주세요.')
      setLoading(false)
      return
    }

    const nonceAPI = await AuthNonceAPI()
    let sign, authAPI
    if (selectedWallet === 'metamask' && account) {
      // sign = await web3.eth.sign(nonceAPI), account.toLowerCase())
      sign = await web3.eth.sign(String(web3.utils.sha3(nonceAPI)), account.toLowerCase())
      authAPI = await AuthTokenAPI({
        nonce: nonceAPI,
        wallet: account,
        chain_id: Number(chainId),
        signature: sign,
      })
      console.log('METAMASK', authAPI)
    }

    if (selectedWallet === 'kaikas' && kaikasAddress) {
      sign = await caver.klay.sign(nonceAPI, kaikasAddress.toLowerCase())
      authAPI = await AuthTokenAPI({
        nonce: nonceAPI,
        wallet: kaikasAddress,
        chain_id: Number(kaikasNetwork),
        signature: sign,
      })
      console.log('KAIKAS', authAPI)
    }

    localStorage.setItem('ACCESS_TOKEN', authAPI.token)
    sessionStorage.setItem('CONNECT', selectedWallet)
    sessionStorage.setItem(
      'WALLET_ADDRESS',
      selectedWallet === 'metamask' ? String(account) : String(kaikasAddress)
    )
    setAuth(true)
    window.location.href = '/'
  }

  return (
    <form className='form w-100' noValidate id='kt_login_signin_form'>
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
          type='button'
          onClick={setAuthHandler}
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
