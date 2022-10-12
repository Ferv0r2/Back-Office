import {useEffect} from 'react'
import {useQuery} from 'react-query'
import {useRecoilState} from 'recoil'
import {AllinOneAPI} from 'src/api'
import {eventListState} from 'src/components/states/eventState'

const useEvent = () => {
  const {isLoading, data} = useQuery(['EventList'], async () => {
    const res = await AllinOneAPI()
    return res
  })
  const [eventList, setEventList] = useRecoilState(eventListState)

  useEffect(() => {
    setEventList(data)
  }, [data, setEventList])

  return {isLoading, eventList}
}

export default useEvent
