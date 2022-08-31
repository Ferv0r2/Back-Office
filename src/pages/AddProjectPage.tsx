import {FC} from 'react'
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
  },
]

const AddProjectPage: FC = () => {
  const addContractHandler = () => {
    alert('추가됨')
  }

  return (
    <div>
      <form className='row mb-10'>
        <div className='col-4'>
          <label htmlFor='contractAddress' className='required form-label'>
            Contract Address
          </label>
          <input
            type='text'
            className='form-control'
            id='contractAddress'
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
      </form>
      <div className='separator border-white my-10' />
      <div className='row'>
        {testNFT.map((nft) => (
          <FeedsWidget className='col-5 m-4' nft={nft} />
        ))}
      </div>
    </div>
  )
}

export {AddProjectPage}
