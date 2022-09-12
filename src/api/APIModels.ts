export interface IAuthTokenAPI {
  chain_id: number
  nonce: string
  wallet: string
  signature: string
}

export interface INFTCreateAPI {
  contract: string
  chain_id: number
  interface: string
  thumbnail?: string
  homepage?: string
}

export interface INFTModifyAPI {
  pid: number
  homepage: string
  thumbnail: string
}

export interface INFTTokenDetailAPI {
  pid: number
  token_id: number
  id: number
  attributes: string[]
}

export interface INFTHolderDetailAPI {
  pid: number
  wallet_address: string
}

export interface IEventBaseAPI {
  eid: number
  pid: number
}

export interface IEventJoinAPI extends IEventBaseAPI {
  event_item_id: number
}

export interface IEventCreateAPI {
  pid: number
  start_dt: Date
  end_dt: Date
  content: string
  items: IEvent[]
}

export interface IEvent {
  login_discord?: IEventItem
  login_twitter?: IEventItem
  connect_wallet?: IEventItem
  twitter_follow?: IEventItem
  twitter_retweet?: IEventItem
  click_link?: IEventItem
  click_callback_link?: IEventItem
  nft_hold?: IEventItem
}

export interface IEventItem {
  title: string
  point: number
  type?: string
  type_id?: string
  type_url?: string
  type_icon?: string
  type_contract?: string
  callback_url?: string
  count?: number
}
