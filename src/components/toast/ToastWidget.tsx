import {FC, useEffect, useState} from 'react'

interface Props {
  content: string
  type?: string
}

const ToastWidget: FC<Props> = ({content, type}) => {
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFade(false)
    }, 1500)
  }, [])

  return (
    <div aria-live='polite' aria-atomic='true'>
      <div
        className='position-fixed start-50 translate-middle-x p-4'
        style={{
          top: '60px',
        }}
      >
        <div
          className={`animate__animated ${
            fade ? 'animate__fadeIn' : 'animate__fadeOut'
          } animate__fast toast show`}
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <div className='toast-header'>
            <img src='/favicon.ico' className='rounded me-2 h-20px' alt='logo' />
            <strong className='me-auto'>Alert</strong>
          </div>
          <div className='toast-body'>{content}</div>
        </div>
      </div>
    </div>
  )
}

export {ToastWidget}
