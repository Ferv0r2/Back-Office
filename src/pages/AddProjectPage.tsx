import {FC, useState} from 'react'
import {NFTCreateAPI} from 'src/api'
import {FeedsWidget} from 'src/components/feed/FeedsWidget'

const testNFT = [
  {
    thumbnail:
      'https://lh3.googleusercontent.com/ViAAKgvW8myVK4OI0unEqIXGTttbHAPLB_A9vXXMXKbF2UagBhgC97ru_7OXtFzA7Q0ULD7UhrEt5yipH0DhunbRXjfqclG0VRo_tg=s168',
    contract: '0x928267e7db3d173898553ff593a78719bb16929f',
    name: 'Kepler-452b',
    interface: 'KIP17',
    symbol: 'K452',
    holders: 1883,
    totalSupply: 58380,
    homepage: 'https://kepler-452b.net',
    eventCount: 2,
  },
  {
    thumbnail:
      'https://lh3.googleusercontent.com/nMgnwb1bFrEqQ65XaDMar4G3Zcp_o7Z0aduvc1C6THtiGBMvPbgq1KTa29dVFGIXfiwISIgqQXzYIqIisA7psvoLYxdr0UpT2lO4FA=s168',
    contract: '0xe7e78910446a0bff06f560b02f103f8a42e4a694',
    name: 'Klay Weasel',
    interface: 'KIP17',
    symbol: 'KWL',
    holders: 152,
    totalSupply: 1104,
    eventCount: 1,
  },
]

const AddProjectPage: FC = () => {
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

    const addContractAPI = await NFTCreateAPI({
      chain_id: 8217,
      contract: contract,
      interface: 'kip17',
    })

    alert(addContractAPI)
    setContract('')
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
        {testNFT.map((nft) => (
          <FeedsWidget
            key={nft.contract}
            className='col-11 col-md-5 mx-lg-4 mx-auto m-4'
            nft={nft}
          />
        ))}
      </div>
    </>
  )
}

export default AddProjectPage
