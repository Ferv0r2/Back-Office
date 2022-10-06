import axios from 'axios'
import {IEvent} from '../APIModels'

export async function EventItemCreateAPI(args: IEvent) {
  const request = await axios
    .post(`/api/event/item`, {
      title: args.title,
      content: args.content,
      point: args.point,
      type: args.type,
      metadata: args.metadata,
    })
    .then((res) => res.data)

  return request
}
