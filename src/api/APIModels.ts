export interface IAuthTokenAPI {
  chain_id: string
  nonce: string
  wallet: string
  signature: string
}

export interface IEventViewAPI {
  jwt: string
  event_id: number
}

export interface IEventJoinAPI {
  jwt: string
  event_id: number
  event_item_id: number
}

export interface INFTDetailAPI {
  jwt: string
  nft_address: string
}
