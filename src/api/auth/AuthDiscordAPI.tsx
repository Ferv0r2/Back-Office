import axios from 'axios'

export async function AuthDiscordAPI(args: {id: number; address: string; chain_id: number}) {
  const request = await axios
    .post('/api/signin/discord', {
      id: args.id,
      address: args.address,
      chain_id: args.chain_id,
      discord: process.env.REACT_APP_DISCORD_SERIAL,
    })
    .then((res) => res.data)

  return request
}
