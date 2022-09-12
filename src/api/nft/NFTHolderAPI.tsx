import axios from 'axios'

export async function NFTHolderAPI(pid: string) {
  const request = await axios.get(`/api/project/${pid}/holder`, {}).then((res) => res.data)

  return request
}
