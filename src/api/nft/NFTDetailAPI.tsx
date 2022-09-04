import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTDetailAPI(arg: INFTBaseAPI) {
  const request = await axios.get(`/api/nft${arg.nft_address}`, {}).then((res) => res.data)

  return request
}
