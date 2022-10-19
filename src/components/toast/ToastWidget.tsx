import {FC, MouseEventHandler, useEffect, useState} from 'react'

interface Props {
  content: string
  type?: string
  delay: number
  close: MouseEventHandler<HTMLButtonElement>
}

const ToastWidget: FC<Props> = ({content, type, delay, close}) => {
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFade(false)
    }, delay)
  }, [delay])

  return (
    <div aria-live='polite' aria-atomic='true'>
      <div
        className='position-fixed start-50 translate-middle-x p-4'
        style={{
          top: '60px',
        }}
      >
        <div
          className={`animate__animated ${fade ? 'animate__fadeIn' : 'animate__fadeOut'} bg-${
            type || 'primary'
          } animate__fast show toast align-items-center text-white border-0`}
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
          data-bs-autohide='false'
        >
          <div className='d-flex mx-2'>
            <div className='toast-body fs-4'>{content}</div>
            <button
              type='button'
              onClick={close}
              className='btn-close btn-close-white me-2 m-auto'
              data-bs-dismiss='toast'
              aria-label='Close'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export {ToastWidget}
