import { atom, RecoilState, useRecoilState } from 'recoil'
import znCNData from '../../../mock/Lang/zh-CN.json'
import twCNData from '../../../mock/Lang/zh-TW.json'
import enCNData from '../../../mock/Lang/en-US.json'

let _langData = znCNData

export const setI18n = (lang: string) => {
  let langData: any = znCNData
  switch (lang) {
    default:
      langData = znCNData
      break
    case 'zh-TW':
      langData = twCNData
      break
    case 'en-US':
      langData = enCNData
      break
  }
  _langData = langData
}

export const msg = (key: string) => {
  if (!key) return ''

  if (_langData.hasOwnProperty(key)) {
    // @ts-ignore
    const value = _langData[key]
    if (!value) {
      return key
    }
    return value
  }
  return ''
}

const i18n = {
  msg,
  setI18n,
}

export default i18n
