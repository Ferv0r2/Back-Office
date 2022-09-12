import {useState} from 'react'
import {NFTDeleteAPI, NFTModifyAPI} from 'src/api'

interface Props {
  id?: number
}

const Dropdown = ({id}: Props) => {
  const [homepage, setHomepage] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const editHandler = async () => {
    await NFTModifyAPI({
      pid: Number(id),
      homepage: homepage,
      thumbnail: thumbnail,
    })
      .then((res) => {
        alert('변경이 완료되었습니다.')
      })
      .catch((err) => alert('처리 과정 중에 에러가 발생하였습니다.'))

    setThumbnail('')
    setHomepage('')
  }

  const deleteHandler = async () => {
    await NFTDeleteAPI(Number(id))
      .then((res) => {
        alert('삭제가 완료되었습니다.')
      })
      .catch((err) => alert('처리 과정 중에 에러가 발생하였습니다.'))
  }

  const getThumnailHandler = (e: any) => {
    setThumbnail(e.target.value)
  }

  const getHomepageHandler = (e: any) => {
    setHomepage(e.target.value)
  }

  console.log(thumbnail)
  console.log(homepage)

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>Edit Contents</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>Thumnail URL:</label>

          <div>
            <input
              type='text'
              onChange={getThumnailHandler}
              value={thumbnail}
              className='form-control'
              placeholder='https://...'
            />
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Homepage URL:</label>

          <div>
            <input
              type='text'
              onChange={getHomepageHandler}
              value={homepage}
              className='form-control'
              placeholder='https://...'
            />
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Notifications:</label>

          <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              name='notifications'
              defaultChecked={true}
            />
            <label className='form-check-label'>준비중</label>
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='button'
            onClick={deleteHandler}
            className='btn btn-sm btn-light-danger me-2'
          >
            Delete
          </button>

          <button type='button' onClick={editHandler} className='btn btn-sm btn-primary'>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export {Dropdown}
