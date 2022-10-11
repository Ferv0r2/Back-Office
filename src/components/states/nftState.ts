import {atom} from 'recoil'
import {v1} from 'uuid'

export interface CollectionTypes {
  id: number
  contract: string
  name: string
  interface: string
  symbol: string
  holder_count: number
  total_supply: number
  homepage?: string
  thumbnail?: string
  event_count?: number
}

const collectionState = atom<CollectionTypes[]>({
  key: `collectionState/${v1()}`,
  default: [],
})

export {collectionState}
