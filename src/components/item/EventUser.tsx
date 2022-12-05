import axios from 'axios'
import {FC, useEffect, useState} from 'react'
import {KTSVG} from 'src/utils'
import {setColor} from '../card/EventBasket'

/* API */
import {EventJoinAPI, EventJoinDiscordAPI, EventStatusAPI, NFTDetailAPI} from 'src/api'

/* Components */
import ConnectWalletModal from '../modal/ConnectWalletModal'

/* State */
import {Event} from '../states/eventState'
import {ToastWidget} from '../toast/ToastWidget'

interface Props {
  isLoading: boolean
  event: Event
}

const EventUser: FC<Props> = ({isLoading, event}) => {
  const [nft, setNFT] = useState({
    name: '',
    contract: '',
  })
  const [userArray, setUserArray] = useState([])
  const [currentAccount, setAccount] = useState('')
  const [, setNetwork] = useState(1001)
  const [token, setToken] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')
  const [isListen, setIsListen] = useState(false)
  const [discordAuth, setDiscordAuth] = useState('')

  useEffect(() => {
    let discordToken = localStorage.getItem('DISCORD_TOKEN')
    setDiscordAuth(String(discordToken))
  }, [])

  useEffect(() => {
    const getData = async () => {
      const detail = await NFTDetailAPI(event.project_id)
      setNFT(detail)
    }

    getData()
  }, [event])

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `JWT ${String(token)}`,
      }

      const getData = async () => {
        const res = await EventStatusAPI({
          pid: event.project_id,
          eid: event.id,
        })
        const tmp = res.sort((a: any, b: any) => b.point - a.point)
        setUserArray(tmp)
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
    if (res.result) {
      window.open(res.redirect)
    }
  }

  const discordEventItemHandler = async (eiid: number) => {
    const res = await EventJoinDiscordAPI({
      eiid: eiid,
      token: discordAuth,
    }).catch(() => alert('Error!'))
    if (res.result) {
      window.open(res.redirect)
    }
  }

  // const discordLoginHandler = async () => {
  //   window.open(
  //     'https://discord.com/api/oauth2/authorize?client_id=1031552058001727509&redirect_uri=http%3A%2F%2Flocalhost%3A3011%2Fdiscord%2F&response_type=code&scope=identify%20email%20guilds%20guilds.join'
  //   )
  //   setIsListen(true)
  // }

  const eventItemHandler = (id: number, type: string) => {
    if (!token) {
      setIsType('danger')
      setToastContent('Please connect your wallet first.')
      setIsToast(true)
      return
    }

    if (Number(new Date()) > Number(new Date(event.end_dt))) {
      setIsType('danger')
      setToastContent('This event has ended.')
      setIsToast(true)
      return
    }

    if (Number(new Date()) < Number(new Date(event.start_dt))) {
      setIsType('danger')
      setToastContent('This event has not started.')
      setIsToast(true)
      return
    }

    if (type.toLowerCase() === 'discord.invite') {
      console.log('현재 패치중')
      if (discordAuth) {
        discordEventItemHandler(id)
      }
      return
    }
    if (type.toLowerCase() === 'nft.hold') {
      joinEventItemHandler(id)
      console.log('현재 에러')
      return
    }
    joinEventItemHandler(id)
  }

  console.log(nft)

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
        setNetwork={(e: any) => setNetwork(e)}
        deleteHandler={() => setIsOpen(false)}
      />

      {!isLoading && (
        <div className='card card-custom'>
          <div className='card-header'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold text-dark'>{nft.name || 'Loading...'}</span>
              <span className='text-muted mt-1 fw-semibold fs-7'>
                {nft.contract.replace(nft.contract.substring(6, 36), '...') || ''}
              </span>
            </h3>
            <div className='card-toolbar'>
              <button
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#connectWalletModal'
                data-kt-indicator={isOpen && 'on'}
                onClick={() => setIsOpen(true)}
                className='btn btn-sm btn-secondary'
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
              <div className='fs-1 fw-bold pb-2 mt-6'>{userArray?.length}</div>
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
              dangerouslySetInnerHTML={{__html: event.content}}
              className='ql w-100 border-bottom p-8 text-break min-h-200px overflow-auto'
              style={{
                maxHeight: '300px',
              }}
            />
            <div className='card-body p-0 min-h-100px'>
              {event.event_item.length > 0 &&
                event.event_item.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    onClick={() => eventItemHandler(item.id, item.type)}
                    className={`d-flex ${
                      token &&
                      Number(new Date()) < Number(new Date(event.end_dt)) &&
                      Number(new Date()) > Number(new Date(event.start_dt))
                        ? 'cursor-pointer'
                        : 'overlay overlay-block'
                    } px-6 py-4 align-items-center justify-content-between ${
                      index !== event.event_item.length - 1 && 'border-bottom'
                    } ${item.is_success && `bg-light-${setColor(item.title)}`}`}
                  >
                    <KTSVG
                      path={`/media/svg/social-logos/${item.title.toLowerCase()}.svg`}
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
