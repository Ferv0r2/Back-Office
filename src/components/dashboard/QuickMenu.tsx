/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {KTSVG} from 'src/utils'

interface Props {
  className: string
  balance: number
}

const QuickMenu: React.FC<Props> = ({className, balance}) => {
  const navigate = useNavigate()

  return (
    <div className={`card ${className}`}>
      <div className='card-body p-0'>
        <div className={`px-9 pt-7 card-rounded min-h-200px w-100 bg-danger`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Quick Menu</h3>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex mt-2 text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'>You Balance</span>
            <span className='fw-bold fs-2 pt-1'>{balance} Klay</span>
          </div>
          {/* end::Balance */}
        </div>
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            <button
              type='button'
              onClick={() => navigate('/nft/management')}
              className='col btn btn-light-warning btn-color-warning px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/duotune/abstract/abs027.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              New Contract
            </button>
            {/* begin::Col */}
            <button
              type='button'
              onClick={() => navigate('/event/management')}
              className='col btn btn-light-primary btn-color-primary px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/duotune/arrows/arr075.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              New Event
            </button>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <button
              type='button'
              onClick={() => window.open('https://bot.metaoneer.club/')}
              className='col btn btn-light-danger btn-color-danger px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen029.svg'
                className='svg-icon-3x svg-icon-danger d-block my-2'
              />
              License
            </button>
            {/* end::Col */}
            {/* begin::Col */}
            <button
              type='button'
              onClick={() => navigate('/dashboard')}
              className='col btn btn-light-success btn-color-success px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen005.svg'
                className='svg-icon-3x svg-icon-success d-block my-2'
              />
              Document
            </button>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
      </div>
    </div>
  )
}

export {QuickMenu}
