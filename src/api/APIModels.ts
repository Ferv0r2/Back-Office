export interface IAuthTokenAPI {
  chain_id: number
  nonce: string
  wallet: string
  signature: string
}

export interface INFTBaseAPI {
  nft_address: string
}

export interface INFTCreateAPI {
  wallet: string
  contract: string
}

export interface INFTModifyAPI {
  nft_address: string
  homepage: string
  thumnail: string
}

export interface INFTTokenDetailAPI {
  nft_address: string
  token_id: number
  id: number
  attributes: string[]
}

export interface INFTHolderDetailAPI {
  nft_address: string
  wallet_address: string
}

export interface IEventBaseAPI {
  event_id: number
  nft_address: string
}

export interface IEventJoinAPI extends IEventBaseAPI {
  event_item_id: number
}

export interface IEventCreateAPI {
  nft_address: string
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
