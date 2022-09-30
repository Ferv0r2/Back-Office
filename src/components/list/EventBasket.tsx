/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from 'src/utils'
import {useRecoilState} from 'recoil'
import {basketState} from 'src/components/states/eventState'

interface Props {
  className?: string
}

const setColor = (sns: string) => {
  if (sns === 'Facebook' || sns === 'Twitter') {
    return 'primary'
  } else if (sns === 'Instagram' || sns === 'Discord') {
    return 'info'
  } else {
    return 'danger'
  }
}

const EventBasket: React.FC<Props> = ({className}) => {
  const [eventBasket, setEventBasket] = useRecoilState(basketState)

  const resetHandler = () => {
    setEventBasket([])
  }

  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold text-dark'>Event Basket</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Maximum 10 Event</span>
          </h3>
          <KTSVG
            path='/media/icons/duotune/ecommerce/ecm001.svg'
            className='d-flex svg-icon-muted svg-icon-2hx'
          />
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className='card-body p-4'>
          <div className='h-500px overflow-auto'>
            {eventBasket?.length ? (
              eventBasket.map((event) => (
                <div
                  key={Math.random()}
                  className={`d-flex align-items-center justify-content-between mb-4 cursor-pointer px-4 py-2 bg-hover-light-${setColor(
                    event.sns
                  )} rounded`}
                >
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className={`symbol-label bg-light-${setColor(event.sns)}`}>
                        <KTSVG
                          path={`/media/svg/social-logos/${event.sns}.svg`}
                          className={`svg-icon-2x svg-icon-${setColor(event.sns)}`}
                        />
                      </span>
                    </div>
                    <span className={`text-dark text-hover-${setColor(event.sns)} fs-6 fw-bold`}>
                      {event.sns}
                    </span>
                  </div>
                  <select className='form-select w-200px' aria-label='Select Option'>
                    {event.options.map((option) => (
                      <option key={Math.random()} className='fw-semibold' value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            ) : (
              <div className='fs-4 p-4'>
                <p>이벤트 항목을 담아주세요 :)</p>
              </div>
            )}
          </div>

          {eventBasket.length > 0 && (
            <div className='float-end py-8 me-4'>
              <button onClick={resetHandler} className='btn btn-light-danger me-3' type='button'>
                Reset
              </button>
              <button className='btn btn-primary' type='button'>
                Continue
              </button>
            </div>
          )}
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

export {EventBasket}
