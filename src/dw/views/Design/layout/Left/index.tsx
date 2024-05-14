import React, { FC, useState } from 'react'
import { Icon, Tabs } from '@kdcloudjs/kdesign'
import useBase from 'dw/store/useBase'
import CompItem from 'dw/views/Design/layout/Left/CompItem'
import CompList from 'dw/views/Design/layout/Left/CompList'
import { chartList, otherComp } from './LeftControl'
import './index.less'

export const prefixClsLeft = 'dw-design-left'

const Left: FC<any> = (props) => {
  const { setLeft } = useBase()

  const [active, setActive] = useState<any>('design')

  return (
    <div className={`${prefixClsLeft}`}>
      <Icon onClick={() => setLeft(false)} className="dw-design-arrow left" type="arrow-left-solid" />
      <Tabs activeKey={active} onChange={(v) => setActive(v)}>
        <Tabs.TabPane key="design" tab="设计">
          <div>
            <CompList list={chartList} title="可视化组件" />
            <CompList list={otherComp} title="通用组件" />
            <CompItem />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Left
