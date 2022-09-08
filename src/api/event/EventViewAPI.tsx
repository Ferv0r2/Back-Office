import axios from 'axios'
import {IEventBaseAPI} from '../APIModels'

export async function EventViewAPI(args: IEventBaseAPI) {
  const request = await axios
    .get(`/api/project/${args.pid}/event/${args.eid}`, {})
    .then((res) => res.data)

  return request
}
