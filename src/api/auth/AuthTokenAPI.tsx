import axios from 'axios'
import {IAuthTokenAPI} from '../APIModels'

export async function AuthTokenAPI(args: IAuthTokenAPI) {
  const request = await axios
    .post(`${process.env.REACT_APP_HOST_API_URL}/api/auth/klaytn`, {
      headers: {
        Authorization: process.env.REACT_APP_AXIOS_HEADERS_TOKEN,
      },
      chain_id: args.chain_id,
      nonce: args.nonce,
      wallet: args.wallet,
      signature: args.signature,
    })
    .then((res) => res.data)

  return request
}
