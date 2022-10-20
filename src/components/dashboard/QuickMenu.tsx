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
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Quick Menu</h3>
          </div>
          <div className='d-flex mt-2 text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'>You Balance</span>
            <span className='fw-bold fs-2 pt-1'>{balance} Klay</span>
          </div>
        </div>
        <div className='card-p mt-n20 position-relative'>
          <div className='row g-0'>
            <button
              type='button'
              onClick={() => navigate('/nft/management')}
              className='col btn btn-light-warning btn-color-warning px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/stack-fill.svg'
                className='svg-icon-3x svg-icon-warning d-block my-2'
              />
              New Contract
            </button>
            <button
              type='button'
              onClick={() => navigate('/event/management')}
              className='col btn btn-light-primary btn-color-primary px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/plus.svg'
                className='svg-icon-3x svg-icon-primary d-block my-2'
              />
              New Event
            </button>
          </div>
          <div className='row g-0'>
            <button
              type='button'
              onClick={() => window.open('https://bot.metaoneer.club/')}
              className='col btn btn-light-danger btn-color-danger px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/star.svg'
                className='svg-icon-3x svg-icon-danger d-block my-2'
              />
              License
            </button>
            <button
              type='button'
              onClick={() => window.open(process.env.REACT_APP_DOCS_URL)}
              className='col btn btn-light-success btn-color-success px-6 py-8 rounded-2 m-2'
            >
              <KTSVG
                path='/media/icons/paper.svg'
                className='svg-icon-3x svg-icon-success d-block my-2'
              />
              Document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {QuickMenu}
