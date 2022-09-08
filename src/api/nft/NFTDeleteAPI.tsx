import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTDeleteAPI(arg: INFTBaseAPI) {
  const request = await axios.delete(`/api/project/${arg.pid}`, {}).then((res) => res.data.result)

  return request
}
