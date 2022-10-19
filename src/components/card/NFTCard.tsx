import {FC, useEffect} from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from 'src/utils'

/* API */
import {NFTDeleteAPI, NFTModifyAPI} from 'src/api'

/* Components */
import {Dropdown} from '../dropdown/Dropdown'

/* State */
import {CollectionTypes} from '../states/nftState'
import {DeleteCheckModal} from '../modal/DeleteCheckModal'
import {ToastWidget} from '../toast/ToastWidget'

interface Props {
  className: string
  nft: CollectionTypes
  mode?: string
}

const NFTCard: FC<Props> = ({className, nft, mode}) => {
  const navigate = useNavigate()

  const [homepage, setHomepage] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')

  useEffect(() => {
    let timer
    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false)
      }, 4000)
    } else {
      clearTimeout(timer)
    }
  }, [isToast])

  const editHandler = async () => {
    await NFTModifyAPI({
      pid: nft.id,
      homepage: homepage,
      thumbnail: thumbnail,
    })
      .then((res) => {
        setIsType('success')
        setToastContent('The change has been completed.')
        setIsToast(true)
      })
      .catch((err) => {
        setIsType('danger')
        setToastContent('An error occurred while processing.')
        setIsToast(true)
      })

    setThumbnail('')
    setHomepage('')
  }

  const deleteHandler = async () => {
    await NFTDeleteAPI(nft.id)
      .then((res) => {
        setIsType('success')
        setToastContent('Deletion completed successfully.')
        setIsToast(true)
      })
      .catch((err) => {
        setIsType('danger')
        setToastContent('An error occurred while processing.')
        setIsToast(true)
      })
  }

  const getThumbnailHandler = (e: any) => {
    setThumbnail(e.target.value)
  }

  const getHomepageHandler = (e: any) => {
    setHomepage(e.target.value)
  }

  return (
    <>
      {isToast && (
        <ToastWidget
          content={toastContent}
          type={isType}
          delay={3500}
          close={() => setIsToast(false)}
        />
      )}
      <DeleteCheckModal deleteHandler={deleteHandler} />
      <div className={clsx(`card card-custom shadow py-3 ${className}`, mode && 'fs-5 ps-8 pt-10')}>
        <div
          className={clsx(
            'position-relative card-header px-sm-11 px-3 pt-4 d-flex align-items-center mb-5 overflow-hidden',
            'pb-6'
          )}
        >
          <div className={`${mode ? 'd-block d-md-flex' : 'd-flex px-8'} align-items-center`}>
            <div className={clsx('symbol me-5', mode ? 'symbol-60px' : 'symbol-45px')}>
              <img src={nft.thumbnail || toAbsoluteUrl('/media/avatars/blank.png')} alt='icon' />
            </div>
            <div className='d-flex flex-column pt-4 pt-md-0'>
              <p className={clsx('mb-1 text-gray-800 fw-bold', mode ? 'fs-3' : 'fs-6')}>
                {nft.name}
              </p>
              <span className='d-none d-md-inline text-gray-400 fw-semibold'>{nft.contract}</span>
              <span className='d-inline d-md-none text-gray-400 fw-semibold'>
                {nft.contract.replace(nft.contract.substring(6, 36), '...')}
              </span>
            </div>
          </div>

          {mode && (
            <div className='d-flex card-toolbar mb-auto'>
              <button
                type='button'
                className='btn btn-sm btn-md-md btn-color-muted btn-active-light-primary fs-6'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
              >
                <KTSVG path='/media/icons/edit.svg' className='svg-icon-2 me-2' />
                Edit
              </button>
              <Dropdown
                thumbnailValue={thumbnail}
                homepageValue={homepage}
                inputThumbnail={getThumbnailHandler}
                inputHomepage={getHomepageHandler}
                editHandler={editHandler}
              />
            </div>
          )}
        </div>
        <div className={clsx('card-body', mode ? 'mx-0 mx-md-4 fs-7 fs-md-5' : 'mx-4')}>
          <div className={clsx('d-lg-flex d-block ', mode ? 'gap-20 lh-xl' : 'gap-20')}>
            <div className={clsx('d-flex', mode && 'min-w-200px')}>
              <div className='fw-bolder'>
                <ol className={clsx('p-0', mode && 'pe-4')}>Name</ol>
                <ol className={clsx('p-0', mode && 'pe-4')}>Symbol</ol>
                <ol className={clsx('p-0', mode && 'pe-4')}>Total supply</ol>
              </div>
              <div>
                <ol>{nft.name}</ol>
                <ol>{nft.symbol}</ol>
                <ol>{String(nft.total_supply).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ol>
              </div>
            </div>
            <div className='d-flex'>
              <div className='fw-bolder'>
                <ol className={clsx('p-0', mode && 'pe-4')}>Holders</ol>
                <ol className={clsx('p-0', mode && 'pe-4')}>Event count</ol>
                {mode && <ol className='p-0 pe-4'>Official Site</ol>}
              </div>
              <div>
                <ol>{String(nft.holder_count).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ol>
                <ol>
                  {nft.eventCount
                    ? String(nft.eventCount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : 0}
                </ol>
                {mode && (
                  <ol>
                    <a
                      target='_blank'
                      className='text-dark text-hover-primary'
                      href={nft.homepage}
                      rel='noreferrer'
                    >
                      {nft.homepage || ''}
                    </a>
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
        {mode ? (
          ''
        ) : (
          <div className='card-footer d-flex justify-content-between align-items-center py-3'>
            <a
              href={nft.homepage}
              target='_blank'
              rel='noopener noreferrer'
              className='text-dark text-hover-primary text-'
            >
              {nft.homepage}
            </a>

            <button
              type='button'
              onClick={() => {
                navigate(`/nft/${nft.contract}/home`)
              }}
              className='btn btn-sm btn-active-color-primary pe-0 me-2'
            >
              See More
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export {NFTCard}
