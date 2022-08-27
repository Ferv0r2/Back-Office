/* eslint-disable react/jsx-no-target-blank */
import {KTSVG} from 'src/utils'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuUser} from './AsideMenuUser'

export function AsideMenuMain() {
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

      <AsideMenuItem to='/nft/add' title='Add NFT' icon='/media/icons/duotune/coding/cod001.svg' />

      <AsideMenuItemWithSub
        to='/nft/colletions'
        title='Collections'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub
          to='/nft/colletions/weasel'
          title='Weasel'
          icon='/media/icons/duotune/coding/cod002.svg'
        >
          <AsideMenuItem to='/nft/colletions/weasel/holders' title='Holders' hasBullet={true} />
          <AsideMenuItem to='/nft/colletions/weasel/event' title='Event' hasBullet={true} />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/nft/colletions/kepler'
          title='Kepler'
          icon='/media/icons/duotune/coding/cod003.svg'
        >
          <AsideMenuItem to='/nft/colletions/weasel/holders' title='Holders' hasBullet={true} />
          <AsideMenuItem to='/nft/colletions/weasel/event' title='Event' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Event</span>
        </div>
      </div>

      <AsideMenuItem
        to='/event/create'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Create Event'
        fontIcon='bi-layers'
      />

      <AsideMenuItemWithSub
        to='/event/status'
        title='Event Status'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
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
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
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
