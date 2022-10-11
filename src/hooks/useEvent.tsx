import {useEffect} from 'react'
import {useQuery} from 'react-query'
import {useRecoilState} from 'recoil'
import {EventListAPI} from 'src/api'
import {eventListState} from 'src/components/states/eventState'

const useEvent = (pid: number) => {
  const {isLoading, data} = useQuery(['EventList'], async () => {
    const res = await EventListAPI(pid)
    return res
  })
  const [eventList, setEventList] = useRecoilState(eventListState)

  useEffect(() => {
    setEventList(data)
  }, [data, setEventList])

  return {isLoading, eventList}
}

export default useEvent
