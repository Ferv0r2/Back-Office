import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTHolderAPI(args: INFTBaseAPI) {
  const request = await axios
    .get(`${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}/holder`, {
      headers: {
        Authorization: args.jwt,
      },
    })
    .then((res) => res.data)

  return request
}
