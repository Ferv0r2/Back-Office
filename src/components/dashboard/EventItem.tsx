/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import clsx from 'clsx'

interface Props {
  eventItem: {
    id: number
    name: string
    nft: string
    startDate?: string
    endDate?: string
  }
}

const EventItem: React.FC<Props> = ({eventItem}) => {
  return (
    <div className='d-flex align-items-center mb-8'>
      <span
        className={clsx(
          'bullet bullet-vertical h-40px',
          eventItem.id % 2 === 0 ? 'bg-danger' : 'bg-primary'
        )}
      ></span>
      <div className='flex-grow-1 mx-5'>
        <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
          {eventItem.name}
        </a>
        <span className='w-20 text-muted fw-semibold d-block'>{eventItem.nft}</span>
      </div>
      <span
        className={clsx(
          'badge fs-8 fw-bold',
          eventItem.id % 2 === 0 ? 'badge-light-danger' : 'badge-light-primary'
        )}
      >
        {eventItem.startDate || eventItem.endDate}
      </span>
    </div>
  )
}

export {EventItem}
