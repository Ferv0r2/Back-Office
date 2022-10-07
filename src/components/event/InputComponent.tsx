import {FC, useState} from 'react'
import {useRecoilState} from 'recoil'
import {resultState} from '../states/eventState'

interface Props {
  id: string
  sns: string
  option: string
}

const InputComponent: FC<Props> = ({id, sns, option}) => {
  const [isResult, setResult] = useRecoilState(resultState)
  const [isConfirm, setIsConfirm] = useState(false)
  const [inputs, setInputs] = useState({
    id: id,
    title: sns,
    content: '',
    point: 0,
  })

  const {content, point} = inputs

  const onChange = (e: any) => {
    const {name, value} = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const confirmHandler = (e: any) => {
    if (!content) {
      alert('내용을 입력해 주세요.')
      return
    }

    if (point <= 0) {
      alert('포인트는 0보다 커야 합니다.')
      return
    }

    setResult([...isResult, inputs])
    setIsConfirm(true)
  }

  const editHandler = () => {
    setResult(isResult.filter((isResult) => isResult.id !== id))
    setIsConfirm(false)
  }

  return (
    <>
      <div className='pb-4'>
        <label className='form-label px-2'>Content</label>
        <textarea
          className='form-control'
          name='content'
          defaultValue={content}
          onChange={onChange}
          placeholder={`${option} on @metaoneer`}
        />
      </div>
      <div className='d-flex justify-content-between'>
        <div>
          <label className='form-label px-2'>Point</label>
          <input
            type='number'
            className='w-150px form-control text-center'
            name='point'
            defaultValue={point}
            onChange={onChange}
            placeholder='0'
          />
        </div>
        {isConfirm ? (
          <button
            type='button'
            onClick={editHandler}
            className='mt-auto ml-auto btn btn-primary btn-active-light-primary'
          >
            Edit
          </button>
        ) : (
          <button
            type='button'
            onClick={confirmHandler}
            className='mt-auto ml-auto btn btn-primary'
          >
            Confirm
          </button>
        )}
      </div>
    </>
  )
}

export {InputComponent}
