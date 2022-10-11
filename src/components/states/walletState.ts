import {atom} from 'recoil'
import {v1} from 'uuid'

export interface WalletTypes {
  address: string
  balance: number
  network: number
}

const authState = atom<boolean>({
  key: `authState/${v1()}`,
  default: false,
})

const selectedWalletState = atom<string>({
  key: `selectedWalletState/${v1()}`,
  default: '',
})

const metamaskState = atom<WalletTypes>({
  key: `metamaskState/${v1()}`,
  default: {
    address: '',
    balance: 0,
    network: 8217,
  },
})

const kaikasState = atom<WalletTypes>({
  key: `kaikasState/${v1()}`,
  default: {
    address: '',
    balance: 0,
    network: 8217,
  },
})

export {authState, selectedWalletState, metamaskState, kaikasState}
