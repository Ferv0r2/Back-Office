import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'

/* API */
import {NFTHolderAPI} from 'src/api'

/* Components */
import HoldersTable from '../table/HoldersTable'
import SNSTable from '../table/SNSTable'
import {ToastWidget} from '../toast/ToastWidget'

interface Props {
  pid: number
  totalSupply: number
  holderCount: number
  className?: string
}

const TokenList: FC<Props> = ({pid, totalSupply, holderCount, className}) => {
  const [currentHoldersPage, setCurrentHoldersPage] = useState(0)
  const [currentSNSPage, setCurrentSNSPage] = useState(0)
  const [currentTab, setCurrentTab] = useState(0)
  const [holderList, setHolderList] = useState({
    pagenation: {},
    items: [],
    token: {},
  })
  const [isToast, setIsToast] = useState(false)
  const [toastContent, setToastContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const holder = async () => {
      setIsLoading(true)
      const res = await NFTHolderAPI({
        pid: pid,
        size: 15,
        page: currentHoldersPage,
      })
      setHolderList(res)
      setIsLoading(false)
    }
    holder()
  }, [currentHoldersPage, pid])

  const holderPrevHandler = () => {
    if (currentHoldersPage === 0) {
      setToastContent('This is the fist page.')
      setIsToast(true)
      setTimeout(() => {
        setIsToast(false)
      }, 2000)
      return
    }

    if (currentHoldersPage - 5 > 0) {
      setCurrentHoldersPage(currentHoldersPage - 5)
    } else {
      setCurrentHoldersPage(0)
    }
  }

  const holderNextHandler = () => {
    if (currentHoldersPage === Math.ceil(holderCount)) {
      setToastContent('This is the last page.')
      setIsToast(true)
      setTimeout(() => {
        setIsToast(false)
      }, 1500)
      return
    }
    if (currentHoldersPage + 5 > Math.ceil(holderCount)) {
      setCurrentHoldersPage(Math.ceil(holderCount))
    } else {
      setCurrentHoldersPage(currentHoldersPage + 5)
    }
    setCurrentHoldersPage(currentHoldersPage + 5)
  }

  const holderSelectHandler = (page: number) => {
    setCurrentHoldersPage(page)
  }

  return (
    <>
      {isToast && <ToastWidget content={toastContent} />}
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
            <a
              onClick={() => setCurrentTab(1)}
              className='nav-link'
              data-bs-toggle='tab'
              href='#sns'
            >
              SNS
            </a>
          </li>
        </ul>
        <div className='tab-content' id='myTabContent'>
          <div className='tab-pane fade active show' id='holders' role='tabpanel'>
            {isLoading ? (
              <div className='p-20 fs-4 fw-bold'>Loading...</div>
            ) : (
              <HoldersTable
                list={holderList.items}
                page={currentHoldersPage}
                totalSupply={totalSupply}
                prevHandler={holderPrevHandler}
                nextHandler={holderNextHandler}
                selectHandler={(page: number) => holderSelectHandler(page)}
              />
            )}
          </div>
          <div className='tab-pane fade' id='sns' role='tabpanel'>
            <SNSTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default TokenList
