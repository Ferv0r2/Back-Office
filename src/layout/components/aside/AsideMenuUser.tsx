import {FC} from 'react'
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
      <div className='align-items-center px-8 py-4 rounded border border-light mx-7'>
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        <span className='menu-wallet-title px-md-3 px-6 text-light'>{title}</span>
        {children}
      </div>
    </div>
  )
}

export {AsideMenuUser}
