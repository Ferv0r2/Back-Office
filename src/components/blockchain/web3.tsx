import Web3 from 'web3'

declare global {
  interface Window {
    ethereum: any
  }
}

const web3 = new Web3(window.ethereum)
export {web3}
