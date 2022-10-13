import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {NFTHolderAPI} from 'src/api'
import HoldersTable from '../table/HoldersTable'
import SNSTable from '../table/SNSTable'

interface Props {
  pid: number
  totalSupply: number
  className?: string
}

const TokenList: FC<Props> = ({pid, totalSupply, className}) => {
  const [currentHoldersPage, setCurrentHoldersPage] = useState(0)
  const [currentSNSPage, setCurrentSNSPage] = useState(0)
  const [currentTab, setCurrentTab] = useState(0)
  const [holderList, setHolderList] = useState({
    pagenation: {},
    items: [],
    token: {},
  })

  useEffect(() => {
    const holder = async () => {
      const res = await NFTHolderAPI({
        pid: pid,
        size: 15,
        page: currentHoldersPage,
      })
      setHolderList(res)
    }
    holder()
  }, [currentHoldersPage, pid])

  return (
    <div className={clsx('table-responsive rounded shadow bg-semiwhite', className)}>
      <ul className='nav nav-tabs nav-line-tabs mb-5 fs-6 p-8'>
        <li className='nav-item'>
          <a
            onClick={() => setCurrentTab(0)}
            className='nav-link active'
            data-bs-toggle='tab'
            href='#holders'
          >
            Holders
          </a>
        </li>
        <li className='nav-item'>
          <a onClick={() => setCurrentTab(1)} className='nav-link' data-bs-toggle='tab' href='#sns'>
            SNS
          </a>
        </li>
      </ul>
      <div className='tab-content' id='myTabContent'>
        <div className='tab-pane fade active show' id='holders' role='tabpanel'>
          <HoldersTable
            list={holderList.items}
            page={currentHoldersPage}
            totalSupply={totalSupply}
          />
        </div>
        <div className='tab-pane fade' id='sns' role='tabpanel'>
          <SNSTable />
        </div>
      </div>
    </div>
  )
}

export default TokenList
