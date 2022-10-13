import React, {useEffect, useState} from 'react'
import useEvent from 'src/hooks/useEvent'
import {KTSVG} from 'src/utils'
import {Event} from '../states/eventState'
import {EventItem} from './EventItem'

interface Props {
  className: string
  title: string
}

const EventList: React.FC<Props> = ({className, title}) => {
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
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold fs-3 text-dark'>{title}</h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-4'>
        {isLoading && <p className='fs-5'>Loading...</p>}
        {!isLoading && statusList?.length !== 0 ? (
          statusList?.map((event: Event, index) => (
            <div key={event.id} className='cursor-pointer'>
              <EventItem eventItem={event} isType={isType} index={index} />
            </div>
          ))
        ) : (
          <p className='fs-5'>
            {isType === 0 && '진행중인 이벤트가 없습니다.'}
            {isType === 1 && '종료된 이벤트가 없습니다.'}
            {isType === 2 && '대기중인 이벤트가 없습니다.'}
          </p>
        )}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {EventList}
