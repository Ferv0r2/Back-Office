import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTDeleteAPI(arg: INFTBaseAPI) {
  const request = await axios
    .delete(`/api/nft${arg.nft_address}`, {})
    .then((res) => res.data.result)

  return request
}
