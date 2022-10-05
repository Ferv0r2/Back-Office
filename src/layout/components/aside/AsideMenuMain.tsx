/* eslint-disable react/jsx-no-target-blank */
import {KTSVG} from 'src/utils'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuUser} from './AsideMenuUser'
import {Fragment} from 'react'
import useCollection from 'src/hooks/useCollection'

export function AsideMenuMain() {
  const {isLoading, collections} = useCollection()

  const currentWallet = sessionStorage.getItem('CONNECT')
  const currentUser = sessionStorage.getItem('WALLET_ADDRESS')

  return (
    <>
      <AsideMenuUser
        icon={String(currentWallet) && `/media/svg/brand-logos/${currentWallet}.svg`}
        title={String(currentUser?.replace(currentUser.substring(6, 36), '...'))}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title='Dashboard'
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>NFT</span>
        </div>
      </div>

      <AsideMenuItem
        to='/nft/management'
        title='NFT Management'
        icon='/media/icons/duotune/coding/cod001.svg'
      />

      <AsideMenuItemWithSub
        to='/nft/collections'
        title='Collections'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        {isLoading && <p className='fs-5'>Loading...</p>}

        {!isLoading && collections?.length !== 0
          ? collections?.map((nft) => (
              <Fragment key={nft.contract}>
                <AsideMenuItemWithSub
                  to={`/nft/${nft.contract}`}
                  title={nft.name}
                  url={nft.thumbnail}
                  hasBullet={!nft.thumbnail && true}
                >
                  <AsideMenuItem to={`/nft/${nft.contract}/home`} title='Home' hasBullet={true} />
                  <AsideMenuItem to={`/nft/${nft.contract}/event`} title='Event' hasBullet={true} />
                </AsideMenuItemWithSub>
              </Fragment>
            ))
          : ''}
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Event</span>
        </div>
      </div>

      <AsideMenuItem
        to='/event/create'
        icon='/media/icons/duotune/general/gen017.svg'
        title='Event Create'
      />

      <AsideMenuItemWithSub
        to='/event/status'
        title='Event Status'
        icon='/media/icons/duotune/general/gen032.svg'
      >
        <AsideMenuItem to='/event/status/live' title='Live' hasBullet={true} />
        <AsideMenuItem to='/event/status/end' title='End' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4' />
        </div>
      </div>

      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Document</span>
        </a>
      </div>
    </>
  )
}
