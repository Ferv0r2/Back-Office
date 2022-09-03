import axios from 'axios'
import {IEventCreateAPI} from '../APIModels'

export async function EventCreateAPI(args: IEventCreateAPI) {
  const request = await axios
    .post(`${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}/event`, {
      headers: {
        Authorization: args.jwt,
      },
      start_dt: args.start_dt,
      end_dt: args.end_dt,
      content: args.content,
      items: args.items,
    })
    .then((res) => res.data)

  return request
}
