import {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {KTSVG} from 'src/utils'

/* API */
import {AuthDiscordAPI} from 'src/api'

/* Components */
import {ToastWidget} from 'src/components/toast/ToastWidget'

const DiscordAuthPage: FC = () => {
  const location = useLocation()
  const [isToast, setIsToast] = useState(false)
  const [isType, setIsType] = useState('primary')
  const [toastContent, setToastContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let timer
    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false)
      }, 4000)
    } else {
      clearTimeout(timer)
    }
  }, [isToast])

  const getCode = () => {
    return new URLSearchParams(location.search).get('code')
  }

  const authHandler = async () => {
    setIsLoading(true)
    const res = await AuthDiscordAPI(String(getCode())).catch(() => {
      setIsType('danger')
      setToastContent('Discord authentication failed. Please try again.')
      setIsToast(true)
      setIsLoading(false)
      return
    })

    console.log(res)

    // localStorage.setItem("DISCORD_TOKEN", res)
    // window.close()
    setIsLoading(false)
  }

  return (
    <>
      {isToast && (
        <ToastWidget
          content={toastContent}
          type={isType}
          delay={2500}
          close={() => setIsToast(false)}
        />
      )}

      <div className='d-flex flex-column mt-12'>
        <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
          <div className='d-flex mb-12 align-items-center'>
            <img alt='Logo' src='/media/logos/favicon.ico' className='h-45px' />
            <h2 className='display-6 m-3'>METAONEER</h2>
          </div>
          <div className='card shadow mx-auto'>
            <div className='card-header border-0 pt-6'>
              <KTSVG
                path='/media/icons/warning.svg'
                className='svg-icon-4x svg-icon-primary mx-auto'
              />
            </div>
            <div className='card-body'>
              <div className='card-title fs-5 text-center'>
                Press button to complete authentication.
              </div>
            </div>
            <div className='card-footer d-flex justify-content-center'>
              <button
                onClick={authHandler}
                type='button'
                data-kt-indicator={isLoading && 'on'}
                className='btn btn-primary'
              >
                <span className='indicator-label'>Connect</span>
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscordAuthPage
