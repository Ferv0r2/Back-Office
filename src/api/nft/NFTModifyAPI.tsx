import axios from 'axios'
import {INFTModifyAPI} from '../APIModels'

export async function NFTModifyAPI(args: INFTModifyAPI) {
  const request = await axios
    .put(`/api/nft/${args.nft_address}`, {
      homepage: args.homepage,
      thumnail: args.thumnail,
    })
    .then((res) => res.data.authorizationUrl)

  return request
}
