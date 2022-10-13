import {atom} from 'recoil'
import {v1} from 'uuid'

interface EventItem {
  id: string
  sns: string
  options: string[]
}

interface ResultItem {
  id: string
  title: string
  content: string
  type: string
  point: number
}

export interface Event {
  id: number
  project_id: number
  title: string
  content: string
  metadata?: any
  start_dt: Date
  end_dt: Date
  event_item: any
}

const basketState = atom<EventItem[]>({
  key: `basketState/${v1()}`,
  default: [],
})

const itemOptionState = atom({
  key: `itemOptionState/${v1()}`,
  default: new Map(),
})

const resultState = atom<ResultItem[]>({
  key: `resultState/${v1()}`,
  default: [],
})

const eventTitleState = atom<string>({
  key: `eventTitleState/${v1()}`,
  default: '',
})

const eventContentState = atom<string>({
  key: `eventContentState/${v1()}`,
  default: '',
})

const currentNFTIndexState = atom<number>({
  key: `currentNFTIndexState/${v1()}`,
  default: 0,
})

const eventListState = atom({
  key: `eventListState/${v1()}`,
  default: [],
})

export {
  basketState,
  itemOptionState,
  resultState,
  eventTitleState,
  eventContentState,
  currentNFTIndexState,
  eventListState,
}
