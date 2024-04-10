import React, { FC, useEffect, useContext } from 'react'
import { RecoilRoot } from 'recoil'
import 'dw/style/reset.less'
import '@kdcloudjs/kdesign/dist/kdesign.css'
import 'dw/style/reset-kdesign.less'
import JSON from '../../../../mock/PropsDataType/DATA_INIT.json'
// main
import './index.less'
import Design from 'dw/views/Design/Design'
import useMain from '@/dw/store/useMain'

export interface ViewItemProps {
  model: any
  propsData: any
  getLangMsg: any
  invoke: any
  invokeAsync: any
  designMode: boolean
}

export const defaultViewItemContext: ViewItemProps = {
  model: { test: true },
  propsData: {},
  getLangMsg: () => {},
  invoke: () => {},
  invokeAsync: () => {},
  designMode: true,
}

export const ViewItemContext = React.createContext<ViewItemProps>(defaultViewItemContext)

const BaseView = () => {
  const { initPage } = useMain()

  useEffect(() => {
    initPage(JSON)
  }, [])

  return (
    <div className="dw-view-item">
      <Design />
    </div>
  )
}

const ViewItem: FC<any> = (props) => {
  const value = {
    ...props,
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
