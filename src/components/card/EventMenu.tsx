import React from 'react'
import {KTSVG} from 'src/utils'

/* State */
import {useRecoilState} from 'recoil'
import {basketState} from '../states/eventState'

interface Props {
  className?: string
}

const EventMenu: React.FC<Props> = ({className}) => {
  const [basketItems, setBasketItems] = useRecoilState(basketState)

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Event Menu</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Social Items</span>
        </h3>
        <KTSVG path='/media/icons/shopping-bag.svg' className='svg-icon-muted svg-icon-2hx' />
      </div>

      <div className='card-body p-4'>
        {/* begin::Facebook */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'f1',
                sns: 'Facebook',
                options: ['Link'],
              },
            ])
          }}
          className='d-flex align-items-center mb-4 cursor-pointer px-4 py-2 bg-hover-light-primary rounded'
        >
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-primary'>
              <KTSVG
                path='/media/svg/social-logos/facebook.svg'
                className='svg-icon-2x svg-icon-primary'
              />
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span className='text-dark text-hover-primary fs-6 fw-bold'>Facebook</span>
            <span className='text-muted fw-semibold'>Link</span>
          </div>
        </div>
        {/* end::Facebook */}
        {/* begin::Instagram */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'f2',
                sns: 'Instagram',
                options: ['Link'],
              },
            ])
          }}
          className='d-flex align-items-center mb-4 cursor-pointer px-4 py-2 bg-hover-light-info rounded'
        >
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-info'>
              <KTSVG
                path='/media/svg/social-logos/instagram.svg'
                className='svg-icon-2x svg-icon-info'
              />
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span className='text-dark text-hover-info fs-6 fw-bold'>Instagram</span>
            <span className='text-muted fw-semibold'>Link</span>
          </div>
        </div>
        {/* end::Instagram */}
        {/* begin::Twitter */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'f3',
                sns: 'Twitter',
                options: ['Like', 'Follow', 'Retweet'],
              },
            ])
          }}
          className='d-flex align-items-center mb-4 cursor-pointer px-4 py-2 bg-hover-light-primary rounded'
        >
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-primary'>
              <KTSVG
                path='/media/svg/social-logos/twitter.svg'
                className='svg-icon-2x svg-icon-primary'
              />
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span className='text-dark text-hover-primary fs-6 fw-bold'>Twitter</span>
            <span className='text-muted fw-semibold'>Like, Follow, Retweet</span>
          </div>
        </div>
        {/* end::Twitter */}
        {/* begin::Youtube */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'f4',
                sns: 'Youtube',
                options: ['Link'],
              },
            ])
          }}
          className='d-flex align-items-center mb-4 cursor-pointer px-4 py-2 bg-hover-light-danger rounded'
        >
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-danger'>
              <KTSVG
                path='/media/svg/social-logos/youtube.svg'
                className='svg-icon-2x svg-icon-danger'
              />
            </span>
          </div>
          <div className='d-flex flex-column'>
            <a href='#' className='text-dark text-hover-danger fs-6 fw-bold'>
              Youtube
            </a>
            <span className='text-muted fw-semibold'>Link</span>
          </div>
        </div>
        {/* end::Youtube */}
        {/* begin::Discord */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'f5',
                sns: 'Discord',
                options: ['Check holder', 'Role'],
              },
            ])
          }}
          className='d-flex align-items-center mb-4 cursor-pointer px-4 py-2 bg-hover-light-info rounded'
        >
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-info'>
              <KTSVG
                path='/media/svg/social-logos/discord.svg'
                className='svg-icon-2x svg-icon-info'
              />
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span className='text-dark text-hover-info fs-6 fw-bold'>Discord</span>
            <span className='text-muted fw-semibold'>Check holder, Role</span>
          </div>
        </div>
        {/* end::Discord */}
      </div>
    </div>
  )
}

export {EventMenu}
