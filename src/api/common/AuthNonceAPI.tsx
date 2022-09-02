import axios from 'axios'

export async function AuthNonceAPI() {
  const request = await axios
    .post(`${process.env.REACT_APP_HOST_API_URL}/api/auth/klaytn/prepare`, {
      headers: {
        Authorization: process.env.REACT_APP_AXIOS_HEADERS_TOKEN,
      },
    })
    .then((res) => res.data.code)

  return request
}
