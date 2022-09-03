import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTDeleteAPI(arg: INFTBaseAPI) {
  const request = await axios
    .delete(`${process.env.REACT_APP_HOST_API_URL}/api/nft${arg.nft_address}`, {
      headers: {
        Authorization: arg.jwt,
      },
    })
    .then((res) => res.data.result)

  return request
}
