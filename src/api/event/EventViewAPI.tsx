import axios from 'axios'
import {IEventBaseAPI} from '../APIModels'

export async function EventViewAPI(args: IEventBaseAPI) {
  const request = await axios
    .get(
      `${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}/event/${args.event_id}`,
      {
        headers: {
          Authorization: args.jwt,
        },
      }
    )
    .then((res) => res.data)

  return request
}
