/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from 'src/utils'
import {useLayout} from '../../core'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config
  const navigator = useLocation().pathname.split('/')

  const breadcrumb = navigator.map((path, index) => {
    let link = ''
    link += `/${path}`

    return (
      <>
        {index !== navigator.length - 1 ? (
          <li className='breadcrumb-item pe-3'>
            <Link to={index === 0 ? '/dashboard' : link} className='pe-3'>
              {index === 0 ? 'HOME' : path.toUpperCase()}
            </Link>
          </li>
        ) : (
          <li className='breadcrumb-item pe-3 text-muted'>{path.toUpperCase()}</li>
        )}
      </>
    )
  })

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/dashboard' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/default-small.svg')}
                className='h-30px'
              />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/default-small.svg')}
                className='h-30px'
              />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='kt_header_nav'>
              <ol className='breadcrumb text-muted fs-6 fw-bold'>{breadcrumb}</ol>
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='kt_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
