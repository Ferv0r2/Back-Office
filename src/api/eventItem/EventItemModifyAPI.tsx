import axios from 'axios'
import {IEvent} from '../APIModels'

export async function EventItemModifyAPI(args: IEvent) {
  const request = await axios
    .post(`/api/event/item/${args.event_id}`, {
      title: args.title,
      content: args.content,
      point: args.point,
      type: args.type,
      metadata: args.metadata,
    })
    .then((res) => res.data)

  return request
}
