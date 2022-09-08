import axios from 'axios'
import {INFTBaseAPI} from '../APIModels'

export async function NFTHolderAPI(args: INFTBaseAPI) {
  const request = await axios.get(`/api/project/${args.pid}/holder`, {}).then((res) => res.data)

  return request
}
