import {FC, MouseEventHandler, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from 'src/utils'

/* Wallet */
import {useWeb3React} from '@web3-react/core'
import {caver, web3, injected} from 'src/components/blockchain'

/* API */
import {AuthNonceAPI, AuthTokenAPI} from 'src/api'

/* Components */
import {ToastWidget} from '../toast/ToastWidget'
import clsx from 'clsx'

interface Props {
  token: string
  setToken?: any
  setAccount?: any
  deleteHandler: MouseEventHandler<HTMLButtonElement>
}

const ConnectWalletModal: FC<Props> = ({token, setToken, setAccount, deleteHandler}) => {
  const {account, chainId, active, activate} = useWeb3React()
  const [kaikasWallet, setKaikasWallet] = useState({
    address: '',
    balance: 0,
    network: 1001,
  })
  const [selectedWallet, setSelectedWallet] = useState('')
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timer
    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false)
      }, 4000)
    } else {
      clearTimeout(timer)
    }
  }, [isToast])

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
    activate(injected).catch((err) => {
      setIsType('danger')
      setToastContent('Metamask wallet is required.')
      setIsToast(true)
      window.open('https://metamask.io/download.html')
      return
    })

    setSelectedWallet('metamask')
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
      setIsType('danger')
      setToastContent('Kaikas wallet is required.')
      setIsToast(true)
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
      setToastContent('Please set the network to Klaytn Mainnet or Klaytn Baobab.')
      setIsToast(true)
      return
    }

    setLoading(true)
    if (!selectedWallet) {
      setToastContent('Please connect your wallet.')
      setIsToast(true)
      setLoading(false)
      return
    }

    const nonceAPI = await AuthNonceAPI().catch(() => {
      setIsType('danger')
      setToastContent('The signature has been cancelled.')
      setIsToast(true)
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
      setIsType('danger')
      setToastContent('The signature has been cancelled.')
      setIsToast(true)
      setLoading(false)
      return
    }

    setIsType('success')
    setToastContent('Login Successful.')
    setIsToast(true)
    setToken(authAPI.token)
    setAccount(selectedWallet === 'metamask' ? account : kaikasWallet.address)
    setLoading(false)
  }

  return (
    <>
      {isToast && (
        <ToastWidget
          content={toastContent}
          type={isType}
          delay={3500}
          close={() => setIsToast(false)}
        />
      )}
      <div
        className='modal fade'
        id='connectWalletModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header border-0'>
              <div className='mx-auto text-center'>
                <div className='mt-2 text-center'>
                  <h5 className='fw-bolder fs-1 mb-5'>Select Wallet</h5>
                </div>
              </div>
            </div>

            <div className='row modal-body p-0'>
              <div className='col-8 mx-auto'>
                {/* begin::Metamask */}
                <button
                  type='button'
                  onClick={metamaskConnectHandler}
                  className={clsx(
                    'btn btn-flex flex-center fs-6 fs-md-5 btn-light btn-lg w-100 py-6 mb-5 border border-2',
                    selectedWallet === 'metamask' && 'border-primary'
                  )}
                >
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/svg/brand-logos/metamask.svg')}
                    className='h-20px me-3'
                  />
                  {account?.replace(account.substring(6, 36), '...') || 'Metamask'}
                </button>
                {/* end::Metamask */}
                {/* begin::Kaikas */}
                <button
                  type='button'
                  onClick={kaikasConnectHandler}
                  className={clsx(
                    'btn btn-flex flex-center fs-6 fs-md-5 btn-light btn-lg w-100 py-6 mb-5 border border-2',
                    selectedWallet === 'kaikas' && 'border-primary'
                  )}
                >
                  <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/svg/brand-logos/kaikas.svg')}
                    className='h-20px me-3'
                  />
                  {(kaikasWallet.address &&
                    kaikasWallet.address?.replace(kaikasWallet.address.substring(6, 36), '...')) ||
                    'Kaikas'}
                </button>
                {/* end::Kaikas */}
              </div>
            </div>
            <div className='modal-footer border-0 d-flex flex-center flex-wrap'>
              <div className='d-flex justify-content-between'>
                <button
                  onClick={deleteHandler}
                  type='button'
                  data-bs-dismiss='modal'
                  className={`btn ${token ? 'btn-primary' : 'btn-light-danger'} m-2`}
                >
                  {token ? 'Done' : 'Cancel'}
                </button>

                {!token && (
                  <button
                    onClick={setAuthHandler}
                    type='button'
                    className='btn btn-primary m-2'
                    data-kt-indicator={loading && 'on'}
                    disabled={!selectedWallet || !(account || kaikasWallet.address) || loading}
                  >
                    <span className='indicator-label'>Sign in</span>
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectWalletModal
