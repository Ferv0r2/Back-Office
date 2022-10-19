import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'

/* API */
import {NFTHolderAPI} from 'src/api'

/* Components */
import {HoldersTable} from '../table/HoldersTable'
import {SNSTable} from '../table/SNSTable'
import {ToastWidget} from '../toast/ToastWidget'

interface Props {
  pid: number
  totalSupply: number
  holderCount: number
  className?: string
}

const TabTable: FC<Props> = ({pid, totalSupply, holderCount, className}) => {
  const [currentHoldersSection, setCurrentHoldersSection] = useState(0)
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
        size: 75,
        page: currentHoldersSection,
      })
      setHolderList(res)
      setIsLoading(false)
    }
    holder()
  }, [currentHoldersSection, pid])

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

  const holderPrevHandler = () => {
    if (currentHoldersSection === 0) {
      if (currentHoldersPage === 0) {
        setToastContent('This is the fist page.')
        setIsToast(true)
      } else {
        setCurrentHoldersPage(0)
      }

      return
    }

    if (currentHoldersSection > 0) {
      setCurrentHoldersSection(currentHoldersSection - 1)
      setCurrentHoldersPage(4)
    } else {
      setCurrentHoldersPage(0)
    }
  }

  const holderNextHandler = () => {
    const lastSection = Math.floor(holderCount / 75)
    const lastPage = Math.floor(holderCount / 15) % 5
    if (currentHoldersSection === lastSection) {
      if (currentHoldersPage === lastPage) {
        setToastContent('This is the last page.')
        setIsToast(true)
      } else {
        setCurrentHoldersPage(lastPage)
      }
      return
    }
    if (currentHoldersSection + 1 > lastSection) {
      setCurrentHoldersPage(lastSection)
    } else {
      setCurrentHoldersSection(currentHoldersSection + 1)
      setCurrentHoldersPage(0)
    }
  }

  const holderSelectHandler = (page: number) => {
    setCurrentHoldersPage(page % 5)
  }

  return (
    <>
      {isToast && (
        <ToastWidget content={toastContent} delay={3500} close={() => setIsToast(false)} />
      )}
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
                section={currentHoldersSection}
                page={currentHoldersPage}
                lastSection={Math.floor(holderCount / 75)}
                lastPage={Math.floor(holderCount / 15) % 5}
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

export {TabTable}
