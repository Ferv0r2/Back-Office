import {atom} from 'recoil'

export interface WalletTypes {
  address: string
  balance: number
  network: number
}

const authState = atom<boolean>({
  key: 'authState',
  default: false,
})

const selectedWalletState = atom<string>({
  key: 'selectedWalletState',
  default: '',
})

const metamaskState = atom<WalletTypes>({
  key: 'metamaskState',
  default: {
    address: '',
    balance: 0,
    network: 8217,
  },
})

const kaikasState = atom<WalletTypes>({
  key: 'kaikasState',
  default: {
    address: '',
    balance: 0,
    network: 8217,
  },
})

export {authState, selectedWalletState, metamaskState, kaikasState}
