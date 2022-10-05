/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, MouseEventHandler} from 'react'
import {KTSVG} from 'src/utils'
import {useRecoilState} from 'recoil'
import {basketState} from 'src/components/states/eventState'

interface Props {
  className?: string
  isReady: boolean
  isContinue: boolean
  isAnimate: boolean
  continueHandler: MouseEventHandler<HTMLButtonElement>
  backHandler: MouseEventHandler<HTMLButtonElement>
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

const EventBasket: React.FC<Props> = ({
  className,
  isReady,
  isContinue,
  isAnimate,
  continueHandler,
  backHandler,
}) => {
  const [eventBasket, setEventBasket] = useRecoilState(basketState)
  const animateDivRef = useRef<HTMLDivElement | null>(null)
  const animateBtnRef = useRef<HTMLButtonElement | null>(null)
  

  useEffect(() => {
    if(isContinue) {
      const animates = ["animate__animated", "animate__fadeIn","animate__faster"]

      for (let animate of animates) {
        animateDivRef.current?.classList.add(animate)
        animateBtnRef.current?.classList.add(animate)
      }

      setTimeout(() => {
        for (let animate of animates) {
          animateDivRef.current?.classList.remove(animate)
          animateBtnRef.current?.classList.remove(animate)
        }
      }, 300)
    }
  }, [isContinue])


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
          <div
            ref={animateDivRef} className='accordion h-500px overflow-auto' id="basket_accordion">
            {eventBasket?.length ? (
              eventBasket.map((event, i) => {
                const key = (Math.random() * 100000000).toFixed(0);
                return (
                <div
                  key={key}
                  className={`d-flex align-items-center ribbon ribbon-top ribbon-vertical justify-content-between mb-4 cursor-pointer px-4 py-2 bg-hover-light-${setColor(
                    event.sns
                  )} rounded ${isContinue && "accordion-item"}`}
                >
                  <div className={`d-flex align-items-center ${isContinue && "accordion-header"}`} id={String(key)}>
                    {
                      isContinue ? (
                        <>
                        <div
                          className={`accordion-button fs-4 fw-bold collapsed text-dark text-hover-${setColor(event.sns)}`}
                          data-bs-toggle='collapse'
                          data-bs-target={`#header_${String(key)}`}
                          aria-expanded={i === 0 ? 'true': 'false'}
                          aria-controls={`header_${String(key)}`}
                        >
                          
                        <div className='symbol symbol-50px me-5'>
                      <span className={`symbol-label bg-light-${setColor(event.sns)}`}>
                        <KTSVG
                          path={`/media/svg/social-logos/${event.sns}.svg`}
                          className={`svg-icon-2x svg-icon-${setColor(event.sns)}`}
                        />
                      </span>
                    </div>
                          {event.sns}
                        </div></>) : (
                          <>
                          <div className='symbol symbol-50px me-5'>
                      <span className={`symbol-label bg-light-${setColor(event.sns)}`}>
                        <KTSVG
                          path={`/media/svg/social-logos/${event.sns}.svg`}
                          className={`svg-icon-2x svg-icon-${setColor(event.sns)}`}
                        />
                      </span>
                    </div>
                          <span className={`text-dark text-hover-${setColor(event.sns)} fs-6 fw-bold `}>
                            {event.sns}
                          </span>
                          </>)
                    }
                    
                  </div>
                  {
                    isContinue ? (
                      <div className={`ribbon-label bg-${setColor(event.sns)} `}>{event.options[0]}
                      </div>
                    ) : (
                      <select className='form-select cursor-pointer w-200px' aria-label='Select Option'>
                        {event.options.map((option) => (
                          <option key={Math.random()} className='fw-semibold' value={option}>
                            {option}
                          </option>
                        ))}
                      </select>)
                  }
                  
                  {
                    isContinue ? (
                      
                  <div
                  id={`body_${key}`}
                  className='accordion-collapse collapse'
                  aria-labelledby={`header_${String(key)}`}
                  data-bs-parent={`#header_${String(key)}`}
                >
                  <div className='accordion-body'>
                    <strong>This is the second item's accordion body.</strong>It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we use to
                    style each element. These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any of this with custom
                    CSS or overriding our default variables. It's also worth noting that just about
                    any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
                    ) :""
                  }
                </div>
              )})
            ) : (
              <div className='fs-4 p-4'>
                <p>이벤트 항목을 담아주세요 :)</p>
              </div>
            )}
          </div>

          {eventBasket.length > 0 && !isContinue && (
            <div className='float-end py-8 me-4'>
              <button type='button' onClick={resetHandler} className='btn btn-light-danger me-3'
                disabled={isAnimate}>
                Reset
              </button>
              <button
                type='button'
                onClick={continueHandler}
                disabled={!isReady || isAnimate}
                className='btn btn-primary'
              >
                Continue
              </button>
            </div>
          )}

          {isContinue && (
            <div className={`float-end py-8 me-4`}>
              <button ref={animateBtnRef} onClick={backHandler} className='btn btn-light-danger me-3' type='button'>
                Cancel
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
