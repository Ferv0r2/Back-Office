import {useEffect} from 'react'
import {useQuery} from 'react-query'
import {useRecoilState} from 'recoil'
import {AllinOneAPI} from 'src/api'
import {eventListState} from 'src/components/states/eventState'
import useCollection from './useCollection'

const useEvent = () => {
  const {collections} = useCollection()
  const {isLoading, data} = useQuery(['EventList'], async () => {
    const res = await AllinOneAPI()
    return res
  })
  const [eventList, setEventList] = useRecoilState(eventListState)

  useEffect(() => {
    if (collections && data) {
      const pids = collections.map((row) => row.id)
      const result: any = []
      data.map((obj: any) =>
        obj.event.map((ev: any) => {
          if (pids.includes(ev.project_id)) result.push(ev)
          return ev
        })
      )

      setEventList(result)
    }
  }, [collections, data, setEventList])

  return {isLoading, eventList}
}

export default useEvent
