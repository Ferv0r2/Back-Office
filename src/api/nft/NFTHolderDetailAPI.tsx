import axios from 'axios'
import {INFTHolderDetailAPI} from '../APIModels'

export async function NFTHolderDetailAPI(args: INFTHolderDetailAPI) {
  const request = await axios
    .get(
      `${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}/holder/${args.wallet_address}`,
      {
        headers: {
          Authorization: args.jwt,
        },
      }
    )
    .then((res) => res.data)

  return request
}
