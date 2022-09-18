import {atom} from 'recoil'

interface EventItem {
  id: string
  sns: string
  options: string[]
}

const basketState = atom<EventItem[]>({
  key: 'basketState',
  default: [
    {
      id: 'f1',
      sns: 'Facebook',
      options: ['Visit'],
    },
    {
      id: 'f2',
      sns: 'Discord',
      options: ['Check holder', 'Role'],
    },
  ],
})

export {basketState}
