import axios from 'axios'
import {IEventViewAPI} from '../APIModels'

export async function EventViewAPI(args: IEventViewAPI) {
  const request = await axios
    .get(`${process.env.REACT_APP_HOST_API_URL}/api/event/${args.event_id}`, {
      headers: {
        Authorization: args.jwt,
      },
    })
    .then((res) => res.data)

  return request
}
