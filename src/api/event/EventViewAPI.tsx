import axios from 'axios'
import {IEventBaseAPI} from '../APIModels'

export async function EventViewAPI(args: IEventBaseAPI) {
  const request = await axios
    .get(`/api/nft/${args.nft_address}/event/${args.event_id}`, {})
    .then((res) => res.data)

  return request
}
