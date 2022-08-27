import {FC} from 'react'
import clsx from 'clsx'
import {KTSVG, WithChildren} from 'src/utils'
import {useLayout} from '../../core'

type Props = {
  title: string
  icon?: string
  fontIcon?: string
}

const AsideMenuUser: FC<Props & WithChildren> = ({children, title, icon, fontIcon}) => {
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='menu-item pb-6'>
      <div
        className={clsx(
          'without-subs px-8 py-4 rounded',
          !aside.minimized && 'border border-light mx-7'
        )}
      >
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className={clsx('menu-wallet-title px-6 text-light')}>{title}</span>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuUser}
