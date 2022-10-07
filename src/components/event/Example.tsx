import {FC, useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {KTSVG} from 'src/utils'
import {setColor} from '../list/EventBasket'
import {basketState, eventContentState, eventTitleState, resultState} from '../states/eventState'

interface Props {
  nft: string
}

const Example: FC<Props> = ({nft}) => {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const [resultItem, setResultItem] = useRecoilState(resultState)
  const [eventTitle, setEventTitle] = useRecoilState(eventTitleState)
  const [eventContent, setEventContent] = useRecoilState(eventContentState)
  const setBasketItem = useSetRecoilState(basketState)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = eventContent
    }
  }, [eventContent])

  const submitHandler = async () => {
    if (!startDate || !endDate) {
      alert('시작날짜와 종료날짜를 모두 선택해 주세요.')
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('종료날짜는 시작날짜보다 커야 합니다.')
      return
    }

    alert('Submit is done')

    setResultItem([])
    setBasketItem([])
    setEventTitle('')
    setEventContent('')
    navigate('/dashboard')
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>{nft}</h3>
          <div className='card-toolbar'>
            <button type='button' className='btn btn-sm btn-light'>
              Connect Wallet
            </button>
          </div>
        </div>
        <div className='row border-bottom align-items-center text-center h-100px'>
          <div className='col-4'>
            <div className='fs-1 fw-bold pb-2'>0 / {resultItem?.length || 0}</div>
            <div className='text-muted'>Your Entries</div>
          </div>
          <div className='col-4'>
            <div className='fs-1 fw-bold pb-2'>0</div>
            <div className='text-muted'>All Participants</div>
          </div>
          <div className='col-4'>
            <div className='fs-1 fw-bold pb-2'>30</div>
            <div className='text-muted'>Days Left</div>
          </div>
        </div>
        <div className='card-body p-0 card-scroll'>
          <div className='d-flex align-items-center justify-content-center border-bottom text-center h-80px'>
            <h2>{eventTitle || 'Example Title'}</h2>
          </div>
          <div ref={contentRef} className='ql w-100 border-bottom p-8 text-break min-h-100px' />
          <div className='card-body mx-1 p-0 min-h-200px'>
            {resultItem.length > 0 &&
              resultItem.map((item, index) => (
                <div className='d-flex px-6 py-4 align-items-center border-bottom justify-content-between'>
                  <div className={`bg-light-${setColor(item.title)}`}>
                    <KTSVG
                      path={`/media/svg/social-logos/${item.title}.svg`}
                      className={`svg-icon-2x svg-icon-${setColor(item.title)}`}
                    />
                  </div>
                  <div className='text-wrap w-75 px-4'>{item.content || 'Example Content'}</div>
                  <div className='d-flex justify-content-center'>
                    <span className={`badge px-6 py-4 fs-8 badge-light-${setColor(item.title)}`}>
                      + {item.point}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='card-footer'>
          <div className='text-muted'>Powered by Metaoneer</div>
        </div>
      </div>
      <div className='card mt-4'>
        <div className='card-footer d-flex justify-content-between align-items-end'>
          <div>
            <label className='form-label px-2'>Start Date</label>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              type='date'
              className='cursor-pointer form-control text-center'
            />
          </div>
          <div>
            <label className='form-label px-2'>End Date</label>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              type='date'
              className='cursor-pointer form-control text-center'
            />
          </div>
          <button
            onClick={submitHandler}
            disabled={!eventTitle || !eventContent || resultItem.length <= 0}
            type='button'
            className='btn btn-primary'
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export {Example}
