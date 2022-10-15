import {FC} from 'react'
import {WithChildren} from 'src/utils'

const Empty: FC<WithChildren> = ({children}) => {
  return (
    <div className='col-4'>
      <div className='card'>
        <div className='card-header border-0 align-items-center'>
          <h3 className='card-title'>
            <span className='bullet bullet-vertical h-20px me-3' />
            <span className='card-label fw-bold text-dark fs-4'>{children}</span>
          </h3>
        </div>
      </div>
    </div>
  )
}

export {Empty}
