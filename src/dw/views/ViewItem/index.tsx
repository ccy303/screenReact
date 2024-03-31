import React, { FC, useState } from 'react'
import { RecoilRoot } from 'recoil'
import 'dw/style/reset.less'
import '@kdcloudjs/kdesign/dist/kdesign.css'
import 'dw/style/reset-kdesign.less'

// main
import './index.less'
import Design from 'dw/views/Design/Design'
import Home from 'dw/views/Home/Home'
import useBase from 'dw/store/useBase'

export interface ViewItemProps {
  model: any
  propsData: any
  getLangMsg: any
  invoke: any
  invokeAsync: any
  designMode: boolean
}

export const defaultViewItemContext: ViewItemProps = {
  model: {},
  propsData: {},
  getLangMsg: () => {},
  invoke: () => {},
  invokeAsync: () => {},
  designMode: true,
}

export const ViewItemContext = React.createContext<ViewItemProps>(defaultViewItemContext)

const BaseView = () => {
  const { viewUrl } = useBase()
  return (
    <div className="dw-view-item">
      {viewUrl === 'Design' && <Design />}
      {viewUrl === 'Home' && <Home />}
    </div>
  )
}

const ViewItem: FC<any> = (props) => {
  const value = {
    ...props,
    invoke: (...arr: any) => {
      console.log('---invoke---', ...arr)
      props?.invoke(...arr)
    },
  }

  return (
    <RecoilRoot>
      <ViewItemContext.Provider value={value}>
        <BaseView />
      </ViewItemContext.Provider>
    </RecoilRoot>
  )
}

export default ViewItem
