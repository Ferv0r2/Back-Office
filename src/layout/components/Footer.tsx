import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>2021 - 2022 &copy;</span>
          <span className='text-muted fw-bold'>METAONEER. ALL RIGHT RESERVED.</span>
        </div>

        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a
              target='_blank'
              href='mailto:cs@metaoneer.club'
              className='menu-link'
              rel='noreferrer'
            >
              CS
            </a>
          </li>
          <li className='d-flex align-items-center py-2'>
            <span className='bullet bullet-vertical'></span>
          </li>
          <li className='menu-item'>
            <a
              target='_blank'
              href='https://metaoneer.club/'
              className='menu-link'
              rel='noreferrer'
            >
              Official Site
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export {Footer}
