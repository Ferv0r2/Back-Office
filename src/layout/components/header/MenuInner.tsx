import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'

export function MenuInner() {
  return (
    <>
      <MenuItem title='Dashboard' to='/dashboard' />
      <MenuInnerWithSub title='NFT' to='/nft' menuPlacement='bottom-start' menuTrigger='click'>
        {/* NFT */}
        <MenuItem title='Add NFT' to='/nft/add' fontIcon='bi-box' />

        {/* Collections */}
        <MenuInnerWithSub
          title='Collections'
          to='/nft/collections'
          fontIcon='bi-archive'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title='Weasel'
            to='/nft/collections/weasel'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/nft/collections/kepler/holders' title='Holders' hasBullet={true} />
            <MenuItem to='/nft/collections/kepler/event' title='Event' hasBullet={true} />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title='Kepler'
            to='/nft/collections/kepler'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/nft/collections/kepler/holders' title='Holders' hasBullet={true} />
            <MenuItem to='/nft/collections/kepler/event' title='Event' hasBullet={true} />
          </MenuInnerWithSub>
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Event' to='/event' menuPlacement='bottom-start' menuTrigger='click'>
        {/* Add */}
        <MenuItem
          title='Create Event'
          to='/event/create'
          icon='/media/icons/duotune/general/gen051.svg'
        />
        <MenuInnerWithSub
          title='Event Status'
          to='/event/status'
          icon='/media/icons/duotune/general/gen051.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/event/status/live' title='Live' hasBullet={true} />
          <MenuItem to='/event/status/end' title='End' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>
    </>
  )
}
