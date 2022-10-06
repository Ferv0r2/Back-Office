import React, {FC, useState} from 'react'
import {useRecoilState} from 'recoil'
import {resultState} from '../states/eventState'

interface Props {
  sns: string
  option: string
}

const InputComponent: FC<Props> = ({sns, option}) => {
  const [isResult, setResult] = useRecoilState(resultState)
  const [isConfirm, setIsConfirm] = useState(false)
  const [inputs, setInputs] = useState({
    title: sns,
    content: '',
    point: 0,
  })

  const {content, point} = inputs // 비구조화 할당을 통해 값 추출

  const onChange = (e: any) => {
    const {name, value} = e.target // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    })
  }

  const confirmHandler = (e: any) => {
    setResult([...isResult, inputs])
    setIsConfirm(true)
  }

  const editHandler = (e: any) => {
    setResult([])
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

export default InputComponent
