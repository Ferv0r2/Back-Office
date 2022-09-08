import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTDetailAPI(arg: INFTBaseAPI) {
  const request = await axios.get(`/api/project/${arg.pid}`, {}).then((res) => res.data)

  return request
}
