/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {CollectionTypes} from '../states/nftState'
import {toAbsoluteUrl} from 'src/utils'

interface Props {
  className: string
  nft: CollectionTypes
}

const FeedsWidget: React.FC<Props> = ({className, nft}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body pb-0'>
        {/* begin::Header */}
        <div className='d-flex align-items-center mb-5 overflow-hidden'>
          {/* begin::User */}
          <div className='d-flex align-items-center flex-grow-1'>
            {/* begin::Avatar */}
            <div className='symbol symbol-45px me-5'>
              <img src={nft.thumbnail || toAbsoluteUrl('/media/avatars/blank.png')} alt='icon' />
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div
              className='d-flex flex-column'
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              <p className='mb-1 text-gray-800 fs-6 fw-bold'>{nft.name}</p>
              <span className='text-gray-400 fw-semibold'>{nft.contract}</span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}
        </div>
        {/* end::Header */}

        {/* begin::Post */}
        <div className='p-4'>
          {/* begin::Text */}
          {/* <p className='text-gray-800 fw-normal mb-5'>
            Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors
            about driving and keep you focused on the overall structure of your post
          </p> */}
          <div className='d-lg-flex d-block gap-12'>
            <div className='d-flex'>
              <div className='fw-bolder'>
                <ol className='p-0'>Name</ol>
                <ol className='p-0'>Symbol</ol>
                <ol className='p-0'>Total supply</ol>
              </div>
              <div>
                <ol>{nft.name}</ol>
                <ol>{nft.symbol}</ol>
                <ol>{nft.total_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ol>
              </div>
            </div>
            <div className='d-flex'>
              <div className='fw-bolder'>
                <ol className='p-0'>Holders</ol>
                <ol className='p-0'>Event count</ol>
              </div>
              <div>
                <ol>{nft.holder_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ol>
                <ol>
                  {nft.event_count
                    ? nft.event_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : 0}
                </ol>
              </div>
            </div>
          </div>

          {/* end::Text */}
        </div>
        {/* end::Post */}

        {/* begin::Separator */}
        <div className='separator mb-4'></div>
        {/* end::Separator */}

        {/* begin::Footer */}
        <div className='d-flex justify-content-between align-items-center mb-6'>
          <a
            href={nft.homepage}
            target='_blank'
            rel='noopener noreferrer'
            className='text-dark text-hover-primary text-'
          >
            {nft.homepage}
          </a>

          <Link
            to={`/nft/collections/${nft.contract}`}
            className='btn btn-sm btn-active-color-primary pe-0 me-2'
          >
            See More
          </Link>
        </div>
        {/* edit::Footer */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {FeedsWidget}
