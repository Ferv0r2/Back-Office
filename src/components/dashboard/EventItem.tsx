/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import clsx from 'clsx'
import useCollection from 'src/hooks/useCollection'
import {Event} from '../states/eventState'

interface Props {
  eventItem: Event
  isType: number
  index: number
}

const EventItem: React.FC<Props> = ({eventItem, isType, index}) => {
  const {collections} = useCollection()
  const nft = collections.map((item) => {
    if (item.id === eventItem.project_id) {
      return item.name
    }
    return ''
  })

  const color = ['success', 'warning', 'primary', 'danger']

  return (
    <div className='d-flex align-items-center mb-8'>
      <span
        className={clsx('bullet bullet-vertical h-40px', `bg-${color[index % color.length]}`)}
      />
      <div className='flex-grow-1 mx-5'>
        <span className='text-gray-800 fw-bold fs-6'>{eventItem.title}</span>
        <span className='w-20 text-muted fw-semibold d-block'>{nft[0]}</span>
      </div>
      <span className={clsx('badge fs-8 fw-bold', `badge-light-${color[index % color.length]}`)}>
        {isType === 0 &&
          `D-${
            Math.floor(
              (Number(new Date(eventItem.end_dt)) - Number(new Date())) / (24 * 60 * 60 * 1000)
            ) || 'day'
          }`}
        {isType === 1 &&
          `D+${
            Math.floor(
              (Number(new Date()) - Number(new Date(eventItem.end_dt))) / (24 * 60 * 60 * 1000)
            ) || 'day'
          }`}
        {isType === 2 &&
          `D-${
            Math.floor(
              (Number(new Date(eventItem.start_dt)) - Number(new Date())) / (24 * 60 * 60 * 1000)
            ) || 'day'
          }`}
      </span>
    </div>
  )
}

export {EventItem}
