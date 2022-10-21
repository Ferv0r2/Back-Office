import {FC, useEffect, useState} from 'react'

/* API */
import {NFTCreateAPI} from 'src/api'

/* Hooks */
import useCollection from 'src/hooks/useCollection'

/* Components */
import {NFTCard} from 'src/components/card/NFTCard'
import {ToastWidget} from 'src/components/toast/ToastWidget'
const AddProjectPage: FC = () => {
  const {isLoading, collections, refetch} = useCollection()
  const [contract, setContract] = useState('')
  const [addLoading, setAddLoading] = useState(false)
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')

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

  const addContractHandler = async () => {
    if (contract.trim().length === 0) {
      setIsType('primary')
      setToastContent('Please enter a contract.')
      setIsToast(true)
      setContract('')
      return
    } else if (contract.trim().slice(0, 2) !== '0x' || contract.trim().length !== 42) {
      setIsType('danger')
      setToastContent('The address is invalid. Please re-enter.')
      setIsToast(true)
      setContract('')
      return
    }
    setAddLoading(true)

    let addContractAPI
    try {
      addContractAPI = await NFTCreateAPI({
        chain_id: Number(sessionStorage.getItem('WALLET_NETWORK')),
        contract: contract,
        interface: 'kip17',
      })
    } catch (err) {
      setIsType('danger')
      setToastContent('You have already registered or do not have [Owner] rights..')
      setIsToast(true)
      setAddLoading(false)
      return
    }

    setContract('')

    refetch()
    setIsType('success')
    setToastContent(`${addContractAPI.name} NFT Registration is complete.`)
    setIsToast(true)
    setAddLoading(false)
  }

  const getInputHandler = (e: any) => {
    setContract(e.target.value)
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
      <form>
        <div className='row'>
          <div className='col-11 col-md-5 mx-auto mx-lg-0 mx-sm-8'>
            <label htmlFor='contractAddress' className='form-label p-2 required form-label'>
              Contract Address
            </label>
            <input
              type='text'
              className='form-control'
              id='contractAddress'
              value={contract}
              onChange={getInputHandler}
              placeholder='0x00000000..'
            />
          </div>
          <div className='col-11 col-md-auto d-flex justify-content-end mt-4 mt-md-0 mx-auto mx-md-0 align-self-end'>
            <button
              type='button'
              onClick={addContractHandler}
              className='btn btn-sm btn-primary mb-1 '
              disabled={addLoading}
              data-kt-indicator={addLoading && 'on'}
            >
              <span className='indicator-label'>Submit</span>
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </div>
      </form>
      <div className='separator border-white my-10' />
      <div className='row'>
        {isLoading ? (
          <p className='fs-5'>Loading...</p>
        ) : collections?.length !== 0 ? (
          collections?.map((nft) => (
            <NFTCard key={nft.contract} className='col-11 col-lg-5 mx-lg-4 mx-auto m-4' nft={nft} />
          ))
        ) : (
          <p className='fs-5'>No NFTs registered.</p>
        )}
      </div>
    </>
  )
}

export default AddProjectPage
