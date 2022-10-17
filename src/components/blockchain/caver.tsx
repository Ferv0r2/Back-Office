import Caver from 'caver-js'

declare global {
  interface Window {
    klaytn: any
  }
}

const caver = new Caver(window.klaytn)
export {caver}
