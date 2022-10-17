import clsx from 'clsx'
import {FC} from 'react'
import {ThemeModeSwitcher} from 'src/components/theme-mode'
import {Logout} from 'src/components/auth/Logout'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px'

const Topbar: FC = () => {
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
        />
      </div>
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <Logout toggleBtnClass={clsx('btn-active-light-primary')} />
      </div>
    </div>
  )
}

export {Topbar}
