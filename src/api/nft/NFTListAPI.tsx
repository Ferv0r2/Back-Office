import axios from 'axios'

export async function NFTListAPI(jwt: string) {
  const request = await axios
    .get(`${process.env.REACT_APP_HOST_API_URL}/api/nft`, {
      headers: {
        Authorization: jwt,
      },
    })
    .then((res) => res.data)

  return request
}
