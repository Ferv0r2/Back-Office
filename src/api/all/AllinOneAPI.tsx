import axios from 'axios'

export async function AllinOneAPI(args: any) {
  const request = await axios.get(`/api/project/all`).then((res) => res.data)

  return request
}
