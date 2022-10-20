import axios from 'axios'
import {FC, useEffect, useRef, useState} from 'react'
import {useQuery} from 'react-query'
import {EventCheckAPI, EventJoinAPI, EventStatusAPI, NFTDetailAPI} from 'src/api'
import {KTSVG} from 'src/utils'
import {setColor} from '../card/EventBasket'
import {Empty} from '../empty/Empty'
import ConnectWalletModal from '../modal/ConnectWalletModal'

/* State */
import {Event} from '../states/eventState'
import {ToastWidget} from '../toast/ToastWidget'

interface Props {
  event: Event
}

const EventUser: FC<Props> = ({event}) => {
  const {isLoading, data} = useQuery(['EventJoin'], async () => {
    const res = await EventStatusAPI({
      pid: event.project_id,
      eid: event.id,
    })
    return res
  })
  const contentRef = useRef<HTMLDivElement>(null)
  const [nft, setNFT] = useState({
    name: '',
    contract: '',
  })
  const [eventCheck, setEventCheck] = useState([])
  const [currentAccount, setAccount] = useState('')
  const [token, setToken] = useState('')
  const [isLoadingNFT, setIsLoadingNFT] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')

  useEffect(() => {
    setIsLoadingNFT(true)
    if (contentRef.current) {
      contentRef.current.innerHTML = event.content
    }

    const getData = async () => {
      const detail = await NFTDetailAPI(event.project_id)
      setNFT(detail)
      setIsLoadingNFT(false)
    }

    getData()
  }, [event])

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `JWT ${String(token)}`,
      }

      const getData = async () => {
        const res = await EventCheckAPI(event.id)
        setEventCheck(res)
      }
      getData()
    }
  }, [event, token])

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

  const joinEventItemHandler = async (eiid: number) => {
    const res = await EventJoinAPI(eiid).catch(() => alert('Error!'))
    console.log(res)
    if (res.result) {
      window.open(res.redirect)
    }
  }

  return (
    <>
      {isToast && (
        <ToastWidget
          content={toastContent}
          type={isType}
          delay={2500}
          close={() => setIsToast(false)}
        />
      )}
      <ConnectWalletModal
        token={token}
        setToken={(e: any) => setToken(e)}
        setAccount={(e: any) => setAccount(e)}
        deleteHandler={() => setIsOpen(false)}
      />

      {isLoading ? (
        <div className='card'>
          <div className='card-body d-flex justify-content-between align-items-center'>
            <Empty>Loading...</Empty>
            <div className='spinner-border align-middle me-4' />
          </div>
        </div>
      ) : (
        <div className='card card-custom'>
          <div className='card-header'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold text-dark'>
                {!isLoadingNFT ? nft.name : 'Loading...'}
              </span>
              <span className='text-muted mt-1 fw-semibold fs-7'>
                {!isLoadingNFT && nft.contract.replace(nft.contract.substring(6, 36), '...')}
              </span>
            </h3>
            <div className='card-toolbar'>
              <button
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#connectWalletModal'
                data-kt-indicator={isOpen && 'on'}
                onClick={() => setIsOpen(true)}
                className='btn btn-sm btn-light'
                disabled={Boolean(token)}
              >
                <span className='indicator-label'>
                  {(currentAccount &&
                    currentAccount.replace(currentAccount.substring(6, 36), '...')) ||
                    'Connect Wallet'}
                </span>
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2' />
                </span>
              </button>
            </div>
          </div>
          <div className='d-flex border-bottom align-items-center text-center h-100px'>
            <div className='col-4 border-end h-100'>
              <div className='fs-1 fw-bold pb-2 mt-6'>
                {event.user_point} / {event.total_point}
              </div>
              <div className='text-muted'>Your Score</div>
            </div>
            <div className='col-4 border-end h-100'>
              <div className='fs-1 fw-bold pb-2 mt-6'>{data?.length}</div>
              <div className='text-muted'>All Participants</div>
            </div>
            <div className='col-4 h-100'>
              {Number(new Date()) > Number(new Date(event.end_dt)) ? (
                <>
                  <div className='fs-1 fw-bold pb-2 mt-6'>End</div>
                  <div className='text-muted'>Day Left</div>
                </>
              ) : Number(new Date(event.end_dt)) - Number(new Date()) > 24 * 60 * 60 * 1000 ? (
                <>
                  <div className='fs-1 fw-bold pb-2 mt-6'>
                    {parseInt(
                      String(
                        (Number(new Date(event.end_dt)) - Number(new Date())) /
                          (24 * 60 * 60 * 1000)
                      )
                    )}
                  </div>
                  <div className='text-muted'>Days Left</div>
                </>
              ) : (
                <>
                  <div className='fs-1 fw-bold pb-2 mt-6'>
                    {parseInt(
                      String(
                        (Number(new Date(event.end_dt)) - Number(new Date())) / (60 * 60 * 1000)
                      )
                    )}
                  </div>
                  <div className='text-muted'>Hours Left</div>
                </>
              )}
            </div>
          </div>
          <div className='card-body p-0 card-scroll'>
            <div className='d-flex align-items-center justify-content-center border-bottom text-center h-80px'>
              <h2 className='mb-0'>{event.title}</h2>
            </div>
            <div
              ref={contentRef}
              className='ql w-100 border-bottom p-8 text-break min-h-200px overflow-auto'
              style={{
                maxHeight: '300px',
              }}
            ></div>
            <div className='card-body p-0 min-h-100px'>
              {event.event_item.length > 0 &&
                event.event_item.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (token) {
                        joinEventItemHandler(item.id)
                      } else {
                        setIsType('danger')
                        setToastContent('Please connect your wallet first.')
                        setIsToast(true)
                      }
                    }}
                    className={`d-flex ${
                      token ? 'cursor-pointer' : 'overlay overlay-block'
                    } px-6 py-4 align-items-center justify-content-between ${
                      index !== event.event_item.length - 1 && 'border-bottom'
                    } ${item.is_success && `bg-light-${setColor(item.title)}`}`}
                  >
                    <KTSVG
                      path={`/media/svg/social-logos/${item.title}.svg`}
                      className={`ms-2 svg-icon-2x svg-icon-${setColor(item.title)}`}
                    />
                    <div className='text-wrap w-75 px-4 align-items-center'>
                      {item.content || 'Null'}
                      {item.is_success && (
                        <KTSVG
                          path={`/media/icons/verified.svg`}
                          className='svg-icon-2x svg-icon-primary ms-2'
                        />
                      )}
                    </div>
                    <div className='d-flex justify-content-center'>
                      <span className={`badge px-6 py-4 fs-8 badge-light-${setColor(item.title)}`}>
                        + {item.point}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='card-footer d-flex align-items-center'>
            <img alt='Logo' src='/media/logos/favicon.ico' className='h-20px me-2' />
            <div className='text-muted'>Powered by Metaoneer</div>
          </div>
        </div>
      )}
    </>
  )
}

export {EventUser}
