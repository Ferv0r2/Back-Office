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
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <span className='text-muted fw-bold'>METAONEER. ALL RIGHT RESERVED.</span>
        </div>

        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a
              target='_blank'
              href='https://discord.com/channels/937571529087152189/952307109339463730'
              className='menu-link pe-0'
              rel='noreferrer'
            >
              Discord
            </a>
          </li>
          <li className='menu-item'>
            <a
              target='_blank'
              href='https://bot.metaoneer.club/'
              className='menu-link pe-0'
              rel='noreferrer'
            >
              Lisence
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export {Footer}
