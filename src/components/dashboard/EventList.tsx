import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useEvent from 'src/hooks/useEvent'
import {Event} from '../states/eventState'
import {EventItem} from './EventItem'

interface Props {
  className: string
  title: string
}

const EventList: React.FC<Props> = ({className, title}) => {
  const navigate = useNavigate()
  const {isLoading, eventList} = useEvent()
  const [isType, setIsType] = useState(0)
  const [statusList, setStatus] = useState([])

  useEffect(() => {
    if (title === 'Live') {
      const tmp = eventList.filter(
        (event: Event) =>
          new Date(event.start_dt) <= new Date() && new Date(event.end_dt) > new Date()
      )
      setStatus(tmp)
      setIsType(0)
    } else if (title === 'End') {
      const tmp = eventList.filter((event: Event) => new Date(event.end_dt) <= new Date())
      setStatus(tmp)
      setIsType(1)
    } else {
      const tmp = eventList.filter((event: Event) => new Date(event.start_dt) > new Date())
      setStatus(tmp)
      setIsType(2)
    }
  }, [eventList, title])

  return (
    <div className={`card ${className} min-h-400px`}>
      {/* begin::Header */}
      <div className='card-header mt-2 border-0'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>{title}</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Recent 5 tasks</span>
        </h3>

        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            onClick={() => navigate(`/event/${title.toLowerCase()}`)}
            className='btn btn-sm p-2 btn-color-gray btn-active-light-primary'
          >
            +More
          </button>
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-4'>
        {isLoading && <p className='fs-5'>Loading...</p>}
        {!isLoading && statusList?.length !== 0 ? (
          statusList
            ?.slice(0, 5)
            .map((event: Event, index) => (
              <EventItem key={event.id} eventItem={event} isType={isType} index={index} />
            ))
        ) : (
          <div className='d-flex align-items-center mb-8'>
            <span className='bullet bullet-vertical h-40px bg-success' />
            <div className='flex-grow-1 mx-5'>
              <span className='text-gray-800 fs-6'>
                {isType === 0 && '진행중인 이벤트가 없습니다.'}
                {isType === 1 && '종료된 이벤트가 없습니다.'}
                {isType === 2 && '대기중인 이벤트가 없습니다.'}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {EventList}
