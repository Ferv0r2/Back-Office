/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useRecoilState} from 'recoil'
import {KTSVG} from 'src/utils'
import {basketState} from '../states/eventState'

type Props = {
  className?: string
}

const EventMenu: React.FC<Props> = ({className}) => {
  const [basketItems, setBasketItems] = useRecoilState(basketState)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold text-dark'>Event Menu</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Social Items</span>
        </h3>
        <KTSVG
          path='/media/icons/duotune/ecommerce/ecm005.svg'
          className='svg-icon-muted svg-icon-2hx'
        />
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body p-4'>
        {/* begin::Item */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'g2',
                sns: 'Facebook',
                options: ['Visit'],
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
            <span className='text-muted fw-semibold'>Visit</span>
          </div>
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'g2',
                sns: 'Instagram',
                options: ['Visit'],
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
            <span className='text-muted fw-semibold'>Visit</span>
          </div>
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'g2',
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
        {/* end::Item */}
        {/* begin::Item */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'g2',
                sns: 'Youtube',
                options: ['Visit'],
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
            <span className='text-muted fw-semibold'>Visit</span>
          </div>
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div
          onClick={() => {
            setBasketItems([
              ...basketItems,
              {
                id: 'g2',
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
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {EventMenu}
