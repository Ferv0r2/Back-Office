import axios from 'axios'

export async function NFTListAPI(jwt: string) {
  const request = await axios.get(`/api/nft`, {}).then((res) => res.data)

  return request
}
