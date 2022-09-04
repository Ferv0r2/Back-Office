import axios from 'axios'
import {INFTCreateAPI} from '../APIModels'

export async function NFTCreateAPI(args: INFTCreateAPI) {
  const request = await axios
    .post(`/api/nft`, {
      wallet: args.wallet,
      contract: args.contract,
    })
    .then((res) => res.data)

  return request
}
