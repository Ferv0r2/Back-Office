/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from 'src/utils'

interface Props {
  className: string
}

const QuickMenu: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      <div className={`card-header border-0 rounded py-5 min-h-175px align-items-start bg-danger`}>
        <h3 className='card-title fs-3 fw-bold text-white'>Quick Menu</h3>
      </div>
      <div className='card-body p-0'>
        <div className='card-p mt-n40 position-relative'>
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
