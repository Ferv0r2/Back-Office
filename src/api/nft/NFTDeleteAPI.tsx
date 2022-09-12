import axios from 'axios'

export async function NFTDeleteAPI(pid: string) {
  const request = await axios.delete(`/api/project/${pid}`).then((res) => res.data.result)

  return request
}
