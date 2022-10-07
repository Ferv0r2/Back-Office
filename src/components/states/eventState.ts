import {atom} from 'recoil'

interface EventItem {
  id: string
  sns: string
  options: string[]
}

interface ResultItem {
  id: string
  title: string
  content: string
  point: number
}

const basketState = atom<EventItem[]>({
  key: 'basketState',
  default: [],
})

const itemOptionState = atom({
  key: 'itemOptionState',
  default: new Map(),
})

const resultState = atom<ResultItem[]>({
  key: 'resultState',
  default: [],
})

const eventTitleState = atom<string>({
  key: 'eventTitleState',
  default: '',
})

const eventContentState = atom<string>({
  key: 'eventContentState',
  default: '',
})

export {basketState, itemOptionState, resultState, eventTitleState, eventContentState}
