import {FC} from 'react'
import clsx from 'clsx'
import {KTSVG, WithChildren} from 'src/utils'
import {useLayout} from 'src/layout/core'

type Props = {
  title: string
  icon?: string
  fontIcon?: string
}

const AsideMenuUser: FC<Props & WithChildren> = ({children, title, icon, fontIcon}) => {
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='menu-item menu-user pb-6'>
      <div className='without-subs px-8 py-4 rounded border border-light mx-7'>
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)} />}
        <span className='menu-wallet-title px-6 text-light'>{title}</span>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuUser}
