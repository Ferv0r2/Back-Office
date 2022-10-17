import {FC, useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from 'src/utils'
import {setColor} from '../card/EventBasket'
import DatePicker from 'react-datepicker'

/* API */
import {EventBatchAPI} from 'src/api'

/* State */
import {useRecoilState, useSetRecoilState} from 'recoil'
import {basketState, eventContentState, eventTitleState, resultState} from '../states/eventState'
import {CollectionTypes} from '../states/nftState'

interface Props {
  nft: CollectionTypes
}

const Example: FC<Props> = ({nft}) => {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const [resultItem, setResultItem] = useRecoilState(resultState)
  const [eventTitle, setEventTitle] = useRecoilState(eventTitleState)
  const [eventContent, setEventContent] = useRecoilState(eventContentState)
  const setBasketItem = useSetRecoilState(basketState)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = eventContent
    }
  }, [eventContent])

  const submitHandler = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.')
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('The end date must be greater than the start date.')
      return
    }

    const submitItems: any = []

    resultItem.map((item) => {
      const itemData = {
        title: item.title,
        content: item.content,
        type: item.type,
        point: item.point,
        metadata: {
          url: 'http://metaoneer.club',
        },
      }
      submitItems.push(itemData)
      return true
    })

    const batch = await EventBatchAPI({
      pid: nft.id,
      title: eventTitle,
      content: eventContent,
      start_dt: new Date(startDate),
      end_dt: new Date(endDate),
      items: submitItems,
    }).catch((err) => {
      alert('An error occurred while generating the event.')
    })

    console.log(batch)

    alert('Event creation has completed.')

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
          <h3 className='card-title'>{nft.name}</h3>
          <div className='card-toolbar'>
            <button type='button' className='btn btn-sm btn-light'>
              Connect Wallet
            </button>
          </div>
        </div>
        <div className='d-flex border-bottom align-items-center text-center h-100px'>
          <div className='col-4 h-100 border-end'>
            <div className='fs-1 fw-bold pb-2 mt-6'>0 / {resultItem?.length || 0}</div>
            <div className='text-muted'>Your Entries</div>
          </div>
          <div className='col-4 h-100 border-end'>
            <div className='fs-1 fw-bold pb-2 mt-6'>0</div>
            <div className='text-muted'>All Participants</div>
          </div>
          <div className='col-4 h-100'>
            {Number(endDate) - Number(startDate) > 24 * 60 * 60 * 1000 ? (
              <>
                <div className='fs-1 fw-bold pb-2 mt-6'>
                  {parseInt(
                    String((Number(endDate) - Number(startDate)) / (24 * 60 * 60 * 1000))
                  ) || 30}
                </div>
                <div className='text-muted'>Days Left</div>
              </>
            ) : (
              <>
                <div className='fs-1 fw-bold pb-2 mt-6'>
                  {parseInt(String((Number(endDate) - Number(startDate)) / (60 * 60 * 1000)))}
                </div>
                <div className='text-muted'>Hours Left</div>
              </>
            )}
          </div>
        </div>
        <div className='card-body p-0 card-scroll'>
          <div className='d-flex align-items-center justify-content-center border-bottom text-center h-80px'>
            <h2 className='mb-0'>{eventTitle || 'Example Title'}</h2>
          </div>
          <div
            ref={contentRef}
            className='ql w-100 border-bottom p-8 text-break min-h-200px overflow-auto'
            style={{
              maxHeight: '300px',
            }}
          />
          <div className='card-body mx-1 p-0 min-h-100px'>
            {resultItem.length > 0 &&
              resultItem.map((item, index) => (
                <div
                  key={item.id}
                  className={`d-flex px-6 py-4 align-items-center justify-content-between ${
                    index !== resultItem.length - 1 && 'border-bottom'
                  }`}
                >
                  <KTSVG
                    path={`/media/svg/social-logos/${item.title}.svg`}
                    className={`svg-icon-2x svg-icon-${setColor(item.title)}`}
                  />
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

        <div className='card-footer d-flex align-items-center'>
          <img alt='Logo' src='/media/logos/favicon.ico' className='h-20px me-2' />
          <div className='text-muted'>Powered by Metaoneer</div>
        </div>
      </div>
      <div className='card mt-4'>
        <div className='card-footer'>
          <div className='pb-4'>
            <label className='form-label px-2'>Start Date</label>
            <DatePicker
              selected={startDate}
              showTimeSelect
              dateFormat='Pp'
              onChange={(date: Date) => setStartDate(date)}
              className='form-control'
            />
          </div>
          <div className='pb-4'>
            <label className='form-label px-2'>End Date</label>
            <DatePicker
              selected={endDate}
              showTimeSelect
              dateFormat='Pp'
              onChange={(date: Date) => setEndDate(date)}
              className='form-control'
            />
          </div>
          <div className='d-flex justify-content-end'>
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
      </div>
    </>
  )
}

export {Example}
