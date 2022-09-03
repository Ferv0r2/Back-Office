import axios from 'axios'
import {INFTTokenDetailAPI} from '../APIModels'

export async function NFTTokenDetailAPI(args: INFTTokenDetailAPI) {
  const request = await axios
    .get(
      `${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}/token/${args.token_id}`,
      {
        headers: {
          Authorization: args.jwt,
        },
      }
    )
    .then((res) => res.data)

  return request
}
