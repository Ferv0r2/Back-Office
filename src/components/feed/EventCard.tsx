import {FC, useRef, useEffect} from 'react'
import {toAbsoluteUrl} from 'src/utils'

type Props = {
  icon: string
  title: string
  description: string
}

const EventCard: FC<Props> = ({icon, title, description}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = description
    }
  }, [description])

  return (
    <div className='card h-100'>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <a href='/' className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-75px mb-6'>
            <img src={toAbsoluteUrl(icon)} alt='' />
          </div>
          <div className='fs-5 fw-bolder mb-2'>{title}</div>
        </a>
        <div ref={contentRef} className='fs-7 fw-bold text-gray-400 mt-auto'>
          {description}
        </div>
      </div>
    </div>
  )
}

export {EventCard}
