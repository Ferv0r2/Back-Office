import axios from 'axios'
import {IEventJoinAPI} from '../APIModels'

export async function EventJoinAPI(args: IEventJoinAPI) {
  const request = await axios
    .post(`/api/${args.nft_address}/event/${args.event_id}`, {
      event_id: args.event_id,
      event_item_id: args.event_item_id,
    })
    .then((res) => res.data.result)

  return request
}
