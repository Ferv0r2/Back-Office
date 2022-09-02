import axios from 'axios'
import {INFTDetailAPI} from '../APIModels'

export async function NFTDetailAPI(arg: INFTDetailAPI) {
  const request = await axios
    .get(`${process.env.REACT_APP_HOST_API_URL}/api/nft${arg.nft_address}`, {
      headers: {
        Authorization: arg.jwt,
      },
    })
    .then((res) => res.data)

  return request
}
