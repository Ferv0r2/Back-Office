import {FC} from 'react'
import {useLocation} from 'react-router-dom'
import {AuthDiscordAPI} from 'src/api'
import {Empty} from 'src/components/empty/Empty'

const DiscordAuthPage: FC = () => {
  const location = useLocation()
  const getCode = () => {
    return new URLSearchParams(location.search).get('code')
  }

  const authHandler = async () => {
    const res = await AuthDiscordAPI(String(getCode()))
    console.log(res)
  }

  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <div className='d-flex mx-auto mt-12 align-items-center'>
        <Empty>{getCode()}</Empty>
        <button onClick={authHandler} type='button' className='btn btn-primary'>
          버튼
        </button>
      </div>
    </div>
  )
}

export default DiscordAuthPage
