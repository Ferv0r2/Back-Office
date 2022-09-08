import axios from 'axios'
import {INFTCreateAPI} from '../APIModels'

export async function NFTCreateAPI(args: INFTCreateAPI) {
  const request = await axios
    .post(`/api/project`, {
      wallet: args.wallet,
      chain_id: args.chain_id,
      contract: args.contract,
      interface: args.interface,
      thumbnail: args.thumbnail,
      homepage: args.homepage,
    })
    .then((res) => res.data)

  return request
}
