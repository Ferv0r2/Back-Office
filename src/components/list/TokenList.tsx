import clsx from 'clsx'
import {FC} from 'react'

interface Props {
  className?: string
}

const TokenList: FC<Props> = ({className}: Props) => {
  return (
    <div className={clsx('table-responsive rounded shadow bg-semiwhite', className)}>
      <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6 p-8'>
        <li className='nav-item'>
          <a className='nav-link active' data-bs-toggle='tab' href='#holders'>
            Holders
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' data-bs-toggle='tab' href='#sns'>
            SNS
          </a>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade active show' id='holders' role='tabpanel'>
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
              <tr>
                <td>1</td>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>1,121</td>
                <td>11.21%</td>
              </tr>
              <tr>
                <td>2</td>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>1,001</td>
                <td>10.01%</td>
              </tr>
              <tr>
                <td>3</td>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>721</td>
                <td>7.21%</td>
              </tr>
              <tr>
                <td>4</td>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>650</td>
                <td>6.5%</td>
              </tr>
              <tr>
                <td>5</td>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>641</td>
                <td>6.41%</td>
              </tr>
            </tbody>
          </table>
          <ul className='pagination py-4'>
            <li className='page-item previous disabled'>
              <a href='#' className='page-link'>
                <i className='previous'></i>
              </a>
            </li>
            <li className='page-item active'>
              <a href='#' className='page-link'>
                1
              </a>
            </li>
            <li className='page-item next disabled'>
              <a href='#' className='page-link'>
                <i className='next'></i>
              </a>
            </li>
          </ul>
        </div>
        <div className='tab-pane fade' id='sns' role='tabpanel'>
          <table className='table table-striped gy-7 gs-7'>
            <thead>
              <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                <th className='min-w-400px'>Address</th>
                <th className='min-w-200px'>Discord</th>
                <th className='min-w-100px'>Twitter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
              </tr>
              <tr>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>Accountant</td>
                <td>Tokyo</td>
              </tr>
              <tr>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>Accountant</td>
                <td>Tokyo</td>
              </tr>
              <tr>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>Accountant</td>
                <td>Tokyo</td>
              </tr>
              <tr>
                <td>0x33365F518A0F333365b7FF53BEAbf1F5b1247b5C</td>
                <td>Accountant</td>
                <td>Tokyo</td>
              </tr>
            </tbody>
          </table>
          <ul className='pagination py-4'>
            <li className='page-item previous disabled'>
              <a href='#' className='page-link'>
                <i className='previous'></i>
              </a>
            </li>
            <li className='page-item active'>
              <a href='#' className='page-link'>
                1
              </a>
            </li>
            <li className='page-item'>
              <a href='#' className='page-link'>
                2
              </a>
            </li>
            <li className='page-item next disabled'>
              <a href='#' className='page-link'>
                <i className='next'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TokenList
