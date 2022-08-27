import {atom} from 'recoil'

const userAuthState = atom({
  key: 'userAuthState',
  default: false,
})

const selectedWalletState = atom({
  key: 'selectedWalletState',
  default: '',
})

const metamaskAddressState = atom({
  key: 'metamaskAddressState',
  default: '',
})

const metamaskBalanceState = atom({
  key: 'metamaskBalanceState',
  default: 0,
})

const metamaskNetworkState = atom({
  key: 'metamaskNetworkState',
  default: '',
})

const kaikasAddressState = atom({
  key: 'kaikasAddressState',
  default: '',
})

const kaikasBalanceState = atom({
  key: 'kaikasBalanceState',
  default: 0,
})

const kaikasNetworkState = atom({
  key: 'kaikasNetworkState',
  default: '',
})

export {
  userAuthState,
  selectedWalletState,
  metamaskAddressState,
  metamaskBalanceState,
  metamaskNetworkState,
  kaikasAddressState,
  kaikasBalanceState,
  kaikasNetworkState,
}
