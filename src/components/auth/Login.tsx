import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl} from 'src/utils'

/* Wallet */
import {useWeb3React} from '@web3-react/core'
import {caver, web3, injected} from 'src/components/blockchain'

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

const Login = () => {
  const {account, chainId, active, activate} = useWeb3React()
  const [loading, setLoading] = useState(false)
  const setAuth = useSetRecoilState(authState)
  const [metamaskWallet, setMetamaskWallet] = useRecoilState(metamaskState)
  const [kaikasWallet, setKaikasWallet] = useRecoilState(kaikasState)
  const [selectedWallet, setSelectedWallet] = useRecoilState(selectedWalletState)

  useEffect(() => {
    const {klaytn} = window
    if (klaytn) {
      klaytn.on('accountsChanged', () => {
        setKaikasAccount()
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setKaikasWallet])

  const metamaskConnectHandler = async () => {
    if (active) {
      setSelectedWallet('metamask')
      return
    }
    await loadMetamaskInfo()
    activate(injected)
      .then(async () => await loadMetamaskInfo())
      .catch((err) => {
        alert('Metamask wallet is required.')
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
      alert('Kaikas wallet is required.')
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
    if (selectedWallet === 'metamask' && chainId !== (1001 || 8217)) {
      alert('Please set the network to Klaytn Mainnet or Klaytn Baobab.')
      return
    }

    setLoading(true)
    if (!selectedWallet) {
      alert('Please connect your wallet.')
      setLoading(false)
      return
    }

    const nonceAPI = await AuthNonceAPI().catch(() => {
      alert('The signature has been cancelled.')
      setLoading(false)
    })
    let sign, authAPI

    try {
      if (selectedWallet === 'metamask' && account) {
        sign = await web3.eth.sign(nonceAPI, account.toLowerCase()).catch(() => setLoading(false))
        authAPI = await AuthTokenAPI({
          nonce: nonceAPI,
          wallet: account,
          chain_id: Number(chainId),
          signature: String(sign),
        })
        console.log('METAMASK', authAPI)
      }

      if (selectedWallet === 'kaikas' && kaikasWallet.address) {
        sign = await caver.klay
          .sign(nonceAPI, kaikasWallet.address.toLowerCase())
          .catch(() => setLoading(false))
        authAPI = await AuthTokenAPI({
          nonce: nonceAPI,
          wallet: kaikasWallet.address,
          chain_id: Number(kaikasWallet.network),
          signature: String(sign),
        })
        console.log('KAIKAS', authAPI)
      }
    } catch (err) {
      alert('The signature has been cancelled.')
      setLoading(false)
      return
    }

    sessionStorage.setItem('ACCESS_TOKEN', authAPI.token)
    sessionStorage.setItem('CONNECT', selectedWallet)
    sessionStorage.setItem(
      'WALLET_ADDRESS',
      selectedWallet === 'metamask' ? String(account) : String(kaikasWallet.address)
    )
    sessionStorage.setItem(
      'WALLET_NETWORK',
      selectedWallet === 'metamask' ? String(chainId) : String(kaikasWallet.network)
    )
    sessionStorage.setItem(
      'WALLET_BALANCE',
      selectedWallet === 'metamask' ? String(metamaskWallet.balance) : String(kaikasWallet.balance)
    )
    setAuth(true)
    setLoading(false)
  }

  return (
    <form className='form w-100' noValidate id='kt_login_signin_form'>
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In</h1>
      </div>
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
          data-kt-indicator={loading && 'on'}
          disabled={!selectedWallet || !(account || kaikasWallet.address) || loading}
        >
          <span className='indicator-label'>Continue</span>
          <span className='indicator-progress'>
            Please wait...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </button>
      </div>
    </form>
  )
}

export {Login}
