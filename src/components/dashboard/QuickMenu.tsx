/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from 'src/utils'

interface Props {
  className: string
  balance: number
}

const QuickMenu: React.FC<Props> = ({className, balance}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-body p-0'>
        <div className={`px-9 pt-7 card-rounded min-h-200px w-100 bg-danger`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Quick Menu</h3>
            <div className='ms-1'>
              {/* begin::Menu */}
              <button
                type='button'
                className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-danger border-0 me-n3`}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
              >
                <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
              </button>
              {/* end::Menu */}
            </div>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex mt-n4 text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'>You Balance</span>
            <span className='fw-bold fs-2 pt-1'>{balance} Klay</span>
          </div>
          {/* end::Balance */}
        </div>
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7'>
              <KTSVG
                path='/media/icons/duotune/abstract/abs027.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              <a href='#' className='text-warning text-hover-muted fw-semibold fs-6 mt-2'>
                New Contract
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-8 rounded-2 mb-7'>
              <KTSVG
                path='/media/icons/duotune/arrows/arr075.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              <a href='#' className='text-primary text-hover-muted fw-semibold fs-6'>
                New Event
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-6 py-8 rounded-2 me-7 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen029.svg'
                className='svg-icon-3x svg-icon-danger d-block my-2'
              />
              <a href='#' className='text-danger text-hover-muted fw-semibold fs-6 mt-2'>
                License
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2 mb-7'>
              <KTSVG
                path='/media/icons/duotune/general/gen005.svg'
                className='svg-icon-3x svg-icon-success d-block my-2'
              />
              <a href='#' className='text-success text-hover-muted fw-semibold fs-6'>
                Document
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
      </div>
    </div>
  )
}

export {QuickMenu}
