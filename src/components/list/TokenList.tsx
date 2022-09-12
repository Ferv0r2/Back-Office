import clsx from 'clsx'
import {FC} from 'react'

interface Props {
  className?: string
}

const TokenList: FC<Props> = ({className}: Props) => {
  return (
    <div className={clsx('table-responsive rounded shadow', className)}>
      <table className='table table-striped gy-7 gs-7'>
        <thead>
          <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
            <th className='min-w-200px'>Name</th>
            <th className='min-w-400px'>Position</th>
            <th className='min-w-100px'>Office</th>
            <th className='min-w-200px'>Age</th>
            <th className='min-w-200px'>Start date</th>
            <th className='min-w-200px'>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011/04/25</td>
            <td>$320,800</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TokenList
