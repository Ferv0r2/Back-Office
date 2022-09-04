import axios from 'axios'
import {INFTHolderDetailAPI} from '../APIModels'

export async function NFTHolderDetailAPI(args: INFTHolderDetailAPI) {
  const request = await axios
    .get(`/api/nft/${args.nft_address}/holder/${args.wallet_address}`, {})
    .then((res) => res.data)

  return request
}
