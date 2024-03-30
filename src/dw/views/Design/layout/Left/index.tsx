import React, { FC, useEffect, forwardRef, useImperativeHandle, useState, useContext } from 'react'
import { Button, Icon, Input, Tabs, Tree, Message } from '@kdcloudjs/kdesign'
import classNames from 'classnames'
import { ViewItemContext, ViewItemProps } from 'dw/views/ViewItem'
import NavCard from 'dw/components/common/NavCard'
import * as constants from 'dw/api/Constants'
import i18n from 'dw/api/I18n'
import useMain, { ModuleProps } from 'dw/store/useMain'
import { ControlProps } from 'dw/control/interface'
import useBase from 'dw/store/useBase'
import ComponentItem from 'dw/views/Design/layout/Center/ComponentItem'
import { Rnd } from 'react-rnd'
import { gnrModulesTree, vslzModulesTree } from 'dw/api/Constants'
import CompModule from 'dw/views/Design/layout/Left/CompModule'
import CompItem from 'dw/views/Design/layout/Left/CompItem'
import CompList from 'dw/views/Design/layout/Left/CompList'
import CompVariable from 'dw/views/Design/layout/Left/CompVariable'
import CompDataSet from 'dw/views/Design/layout/Left/CompDataSet'

import './index.less'

export const prefixClsLeft = 'dw-design-left'

const Left: FC<any> = (props) => {
  const {
    base: { showRight, showLeft },
    setRight,
    setLeft,
    setViewUrl,
    setDesignMode,
  } = useBase()
  const {
    addItemWithType,
    moduleList,
    globalConfig: { selectId, selectType },
  } = useMain()
  const { model, invoke } = useContext(ViewItemContext)

  const [active, setActive] = useState<any>('design')

  return (
    <div className={`${prefixClsLeft}`}>
      <Icon onClick={() => setLeft(false)} className="dw-design-arrow left" type="arrow-left-solid" />
      <Tabs activeKey={active} onChange={(v) => setActive(v)}>
        <Tabs.TabPane key="design" tab="设计">
          <div>
            <CompList list={vslzModulesTree[0].nodes} title="可视化组件" />
            <CompList list={gnrModulesTree[0].nodes} title="通用组件" />
            {/* <CompModule moduleList={moduleList} /> */}
            <CompItem />
          </div>
        </Tabs.TabPane>
        {/* <Tabs.TabPane key="data" tab={i18n.msg('design7')}>
          <div>
            <CompVariable />
            <CompDataSet />
          </div>
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  )
}

export default Left
