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
  metamaskState,
  kaikasState,
  selectedWalletState,
  authState,
} from 'src/components/states/walletState'

export function Login() {
  const {account, chainId, active, activate} = useWeb3React()
  const [loading, setLoading] = useState(false)
  const setAuth = useSetRecoilState(authState)
  const setMetamaskWallet = useSetRecoilState(metamaskState)
  const [kaikasWallet, setKaikasWallet] = useRecoilState(kaikasState)
  const [selectedWallet, setSelectedWallet] = useRecoilState(selectedWalletState)

  const metamaskConnectHandler = async () => {
    if (active) {
      setSelectedWallet('metamask')
      return
    }
    await loadMetamaskInfo()
    activate(injected)
      .then(async () => await loadMetamaskInfo())
      .catch((err) => {
        alert('메타마스크 지갑이 필요합니다.')
        window.open('https://metamask.io/download.html')
        return
      })

    setSelectedWallet('metamask')
  }

  const loadMetamaskInfo = async () => {
    if (account) {
      let metamaskBalance = await web3.eth.getBalance(String(account))
      metamaskBalance = Number(caver.utils.fromPeb(metamaskBalance, 'KLAY')).toFixed(2)

      setMetamaskWallet({
        address: String(account),
        balance: Number(metamaskBalance),
        network: Number(chainId),
      })
    }
  }

  const kaikasConnectHandler = async () => {
    await loadKaikasInfo()
    setSelectedWallet('kaikas')
  }

  const loadKaikasInfo = async () => {
    const {klaytn} = window

    if (klaytn) {
      try {
        await klaytn.enable()
        setKaikasAccount()
        klaytn.on('accountsChanged', () => {
          setKaikasAccount()
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('카이카스 지갑이 필요합니다.')
      window.open(
        'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko'
      )
    }
  }

  const setKaikasAccount = async () => {
    const {klaytn} = window

    const kaikasAddr = klaytn.selectedAddress
    let kaikasBalance = kaikasAddr ? await caver.klay.getBalance(kaikasAddr) : 0
    kaikasBalance = Number(caver.utils.fromPeb(kaikasBalance, 'KLAY')).toFixed(2)

    setKaikasWallet({
      address: kaikasAddr,
      balance: Number(kaikasBalance),
      network: klaytn.networkVersion,
    })
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

    try {
      if (selectedWallet === 'metamask' && account) {
        sign = await web3.eth.sign(nonceAPI, account.toLowerCase())
        authAPI = await AuthTokenAPI({
          nonce: nonceAPI,
          wallet: account,
          chain_id: Number(chainId),
          signature: String(sign),
        })
        console.log('METAMASK', authAPI)
      }

      if (selectedWallet === 'kaikas' && kaikasWallet.address) {
        sign = await caver.klay.sign(nonceAPI, kaikasWallet.address.toLowerCase())
        authAPI = await AuthTokenAPI({
          nonce: nonceAPI,
          wallet: kaikasWallet.address,
          chain_id: Number(kaikasWallet.network),
          signature: String(sign),
        })
        console.log('KAIKAS', authAPI)
      }
    } catch (err) {
      alert('서명이 취소되었습니다.')
      setLoading(false)
      return
    }

    sessionStorage.setItem('ACCESS_TOKEN', authAPI.token)
    sessionStorage.setItem('CONNECT', selectedWallet)
    sessionStorage.setItem(
      'WALLET_ADDRESS',
      selectedWallet === 'metamask' ? String(account) : String(kaikasWallet.address)
    )
    console.log(selectedWallet)
    setAuth(true)
    setLoading(false)
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
          {(kaikasWallet.address &&
            kaikasWallet.address?.replace(kaikasWallet.address.substring(6, 36), '...')) ||
            'Continue with Kaikas'}
        </button>
        {/* end::Kaikas */}

        <button
          type='button'
          onClick={setAuthHandler}
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={!selectedWallet || !(account || kaikasWallet.address) || loading}
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
