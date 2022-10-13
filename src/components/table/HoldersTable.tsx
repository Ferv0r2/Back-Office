import {FC} from 'react'

interface Props {
  list: {
    address: string
    balance: number
  }[]
  page: number
  totalSupply: number
}

const HoldersTable: FC<Props> = ({list, page, totalSupply}) => {
  return (
    <>
      <table className='table table-striped gy-7 gs-7'>
        <thead>
          <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
            <th className='min-w-150px'>Rank</th>
            <th className='min-w-350px'>Address</th>
            <th className='min-w-200px'>Amount</th>
            <th className='min-w-200px'>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {list?.length > 0
            ? list?.map((v, i) => (
                <tr key={v.address}>
                  <td>{page * 15 + i + 1}</td>
                  <td>{v.address}</td>
                  <td>{String(v.balance).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</td>
                  <td>{((v.balance / totalSupply) * 100).toFixed(2)}%</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
      <ul className='pagination py-4'>
        <li className='page-item previous disabled'>
          <a href='/' className='page-link'>
            <i className='previous'></i>
          </a>
        </li>
        <li className='page-item active'>
          <a href='/' className='page-link'>
            1
          </a>
        </li>
        <li className='page-item next disabled'>
          <a href='/' className='page-link'>
            <i className='next'></i>
          </a>
        </li>
      </ul>
    </>
  )
}

export default HoldersTable
