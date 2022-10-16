import {FC, useEffect, useRef} from 'react'
import {KTSVG} from 'src/utils'
import {setColor} from '../list/EventBasket'
import {Event} from '../states/eventState'
import {CollectionTypes} from '../states/nftState'

interface Props {
  event: Event
  nft: CollectionTypes
}

const EventUser: FC<Props> = ({event, nft}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = event.content
    }
  }, [event])

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
          <div className='col-4 border-end h-100'>
            <div className='fs-1 fw-bold pb-2 mt-6'>0 / {event.event_item.length || 0}</div>
            <div className='text-muted'>Your Entries</div>
          </div>
          <div className='col-4 border-end h-100'>
            <div className='fs-1 fw-bold pb-2 mt-6'>0</div>
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
                      (Number(new Date(event.end_dt)) - Number(new Date())) / (24 * 60 * 60 * 1000)
                    )
                  )}
                </div>
                <div className='text-muted'>Days Left</div>
              </>
            ) : (
              <>
                <div className='fs-1 fw-bold pb-2 mt-6'>
                  {parseInt(
                    String((Number(new Date(event.end_dt)) - Number(new Date())) / (60 * 60 * 1000))
                  )}
                </div>
                <div className='text-muted'>Hours Left</div>
              </>
            )}
          </div>
        </div>
        <div className='card-body p-0 card-scroll'>
          <div className='d-flex align-items-center justify-content-center border-bottom text-center h-80px'>
            <h2>{event.title}</h2>
          </div>
          <div ref={contentRef} className='ql w-100 border-bottom p-8 text-break min-h-100px'></div>
          <div className='card-body mx-1 p-0 min-h-100px'>
            {event.event_item.length > 0 &&
              event.event_item.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className={`d-flex px-6 py-4 align-items-center justify-content-between ${
                    index !== event.event_item.length - 1 && 'border-bottom'
                  }`}
                >
                  <KTSVG
                    path={`/media/svg/social-logos/${item.title}.svg`}
                    className={`svg-icon-2x svg-icon-${setColor(item.title)}`}
                  />
                  <div className='text-wrap w-75 px-4'>{item.content || 'Null'}</div>
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
    </>
  )
}

export {EventUser}
