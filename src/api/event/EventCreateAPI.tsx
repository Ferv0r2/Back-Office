import axios from 'axios'
import {IEventCreateAPI} from '../APIModels'

export async function EventCreateAPI(args: IEventCreateAPI) {
  const request = await axios
    .post(`/api/project/${args.pid}/event`, {
      start_dt: args.start_dt,
      end_dt: args.end_dt,
      content: args.content,
      items: args.items,
    })
    .then((res) => res.data)

  return request
}
