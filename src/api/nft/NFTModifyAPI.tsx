import axios from 'axios'
import {INFTModifyAPI} from '../APIModels'

export async function NFTModifyAPI(args: INFTModifyAPI) {
  const request = await axios
    .put(`${process.env.REACT_APP_HOST_API_URL}/api/nft/${args.nft_address}`, {
      headers: {
        Authorization: args.jwt,
      },
      homepage: args.homepage,
      thumnail: args.thumnail,
    })
    .then((res) => res.data.authorizationUrl)

  return request
}
