/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from 'src/utils'
import {EventItem} from './EventItem'

type Props = {
  className: string
  title: string
  eventItems: {
    id: number
    name: string
    nft: string
    startDate?: string
    endDate?: string
  }[]
}

const EventList: React.FC<Props> = ({className, title, eventItems}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>{title}</h3>
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
      <div className='card-body pt-2'>
        {eventItems.map((event) => (
          <EventItem key={event.id} eventItem={event} />
        ))}

        <button type='button' className='btn btn-lg p-8 text-hover-primary'>
          +More
        </button>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {EventList}
