import {FC, useState} from 'react'
import {NFTCreateAPI, NFTDeleteAPI} from 'src/api'
import {FeedsWidget} from 'src/components/feed/FeedsWidget'
import useCollection from 'src/hooks/useCollection'

const AddProjectPage: FC = () => {
  const {isLoading, collections} = useCollection()
  const [contract, setContract] = useState('')

  const addContractHandler = async () => {
    if (contract.trim().length === 0) {
      alert('Contract 주소를 입력해 주세요.')
      setContract('')
      return
    } else if (contract.trim().slice(0, 2) !== '0x' || contract.trim().length !== 42) {
      alert('잘못된 주소입니다. 다시 입력해 주세요.')
      setContract('')
      return
    }

    let addContractAPI
    try {
      addContractAPI = await NFTCreateAPI({
        chain_id: 8217,
        contract: contract,
        interface: 'kip17',
      })
    } catch (err) {
      alert('이미 등록했거나 Owner 권한이 없습니다.')
      return
    }

    setContract('')
    console.log(addContractAPI)
  }

  const getInputHandler = (e: any) => {
    setContract(e.target.value)
  }

  return (
    <>
      <form>
        <div className='row'>
          <div className='col-9 col-md-5 mx-auto mx-lg-0 mx-sm-8'>
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
          <div className='col-auto align-self-end'>
            <button
              type='button'
              onClick={addContractHandler}
              className='btn btn-sm btn-primary mb-1'
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <div className='separator border-white my-10' />
      <div className='row'>
        {isLoading && <p className='fs-5'>Loading...</p>}
        {!isLoading && collections?.length !== 0 ? (
          collections?.map((nft) => (
            <FeedsWidget
              key={'feed' + nft.contract}
              className='col-11 col-md-5 py-3 mx-lg-4 mx-auto m-4'
              nft={nft}
            />
          ))
        ) : (
          <p className='fs-5'>등록한 NFT가 없습니다.</p>
        )}
      </div>
    </>
  )
}

export default AddProjectPage
