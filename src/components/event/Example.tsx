import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {KTSVG} from 'src/utils'
import {setColor} from '../list/EventBasket'
import {basketState, resultState} from '../states/eventState'

interface Props {
  nft: string
}

// const getCurrentDate = () => {
//   let date = new Date()
//   let currentDate = new Intl.DateTimeFormat('kr').format(date)
//   return currentDate
// }

const Example: FC<Props> = ({nft}) => {
  const navigate = useNavigate()
  const [resultItem, setResultItem] = useRecoilState(resultState)
  const setBasketItem = useSetRecoilState(basketState)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const submitHandler = async () => {
    if (!startDate || !endDate) {
      alert('Select a Start Date & End Date')
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('The End Date must be greater than the Start Date')
      return
    }

    alert('Submit is done')

    setResultItem([])
    setBasketItem([])
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
        <div className='card-body card-scroll h-400px'>
          {resultItem.length > 0 &&
            resultItem.map((item, index) => (
              <div className='row g-4 py-1 align-items-center'>
                <div className='col-2'>
                  <div className='symbol symbol-50px'>
                    <span className={`symbol-label bg-light-${setColor(item.title)}`}>
                      <KTSVG
                        path={`/media/svg/social-logos/${item.title}.svg`}
                        className={`svg-icon-2x svg-icon-${setColor(item.title)}`}
                      />
                    </span>
                  </div>
                </div>
                <div className='col-8'>{item.content}</div>
                <div className='col-2'>
                  <span className={`badge px-6 py-4 fs-8 badge-light-${setColor(item.title)}`}>
                    + {item.point}
                  </span>
                </div>
              </div>
            ))}
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
          <button onClick={submitHandler} type='button' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export {Example}
