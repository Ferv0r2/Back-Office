import axios from 'axios'
import {INFTCreateAPI} from '../APIModels'

export async function NFTCreateAPI(args: INFTCreateAPI) {
  const request = await axios
    .post(`${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}`, {
      headers: {
        Authorization: args.jwt,
      },
      wallet: args.wallet,
      args: args.contract,
    })
    .then((res) => res.data)

  return request
}
