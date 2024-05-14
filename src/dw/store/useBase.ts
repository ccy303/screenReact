import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { useState } from 'react'

const baseState = atom({
  key: 'base',
  default: {
    showLeft: true,
    showRight: true,
    designMode: true,
  },
})

const urlState = atom({
  key: 'url',
  default: 'Design',
})

const useBase = () => {
  const [base, setBase] = useRecoilState(baseState)
  const [viewUrl, setViewUrl] = useRecoilState(urlState)

  const setRight = (v: boolean) => {
    setBase({
      ...base,
      showRight: v,
    })
  }
  const setLeft = (v: boolean) => {
    setBase({
      ...base,
      showLeft: v,
    })
  }
  const setDesignMode = (v: boolean) => {
    setBase({
      ...base,
      designMode: v,
    })
  }

  return {
    base,
    setRight,
    setLeft,
    viewUrl,
    setViewUrl,
    setDesignMode,
  }
}

export default useBase
