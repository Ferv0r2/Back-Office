/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from 'src/utils'

type Props = {
  className: string
}

const ItemList: React.FC<Props> = ({className}) => {
  return (
    <div className='card card-xl-stretch'>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold fs-3 text-dark'>Notifications</h3>
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
      <div className='card-body pt-3'>
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-warning me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
              License will expire soon
            </a>
            <span className='text-muted fw-semibold d-block'>Due in 2 Days</span>
          </div>
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-success rounded p-5 mb-7'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-success me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
              OOO Event will be end
            </a>
            <span className='text-muted fw-semibold d-block'>Due in 2 Days</span>
          </div>
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
          {/* begin::Icon */}
          <span className='svg-icon svg-icon-danger me-5'>
            <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
          </span>
          {/* end::Icon */}
          <div className='flex-grow-1 me-2'>
            <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
              "Klay Weasel" Holders uptrend
            </a>
            <span className='text-muted fw-semibold d-block'>Due in 5 Days</span>
          </div>
        </div>
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ItemList}
