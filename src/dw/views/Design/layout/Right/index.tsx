import React, { FC, useContext } from 'react'
import { Icon, Tabs, Button } from '@kdcloudjs/kdesign'
import useMain from 'dw/store/useMain'
import { ViewItemContext } from 'dw/views/ViewItem'
import useBase from 'dw/store/useBase'
import { PropertiesContainer } from 'dw/views/Design/layout/Right/PropertiesContainer'
import NavCard from 'dw/components/common/NavCard'
import './index.less'

const Right: FC<any> = (props) => {
  const { setRight } = useBase()
  const { model } = useContext(ViewItemContext)

  const {
    group: { groups, current },
    changeGroupCurrent,
    globalConfig,
    itemList,
  } = useMain()

  const closeConfig = () => {
    setRight(false)
  }

  const tabChange = (v: any) => {
    changeGroupCurrent(v)
  }

  const save = () => {
    const data = { ...(globalConfig as any), itemList }
    console.log(`%c提交数据`, 'color:#00ff00', data)
    model?.invoke?.('save', JSON.stringify(data))
  }

  return (
    <div className="dw-design-right">
      <NavCard title="" operate={<Icon style={{ cursor: 'pointer' }} onClick={closeConfig} type="close" />}>
        <div className="action-group">
          <Button type="primary" onClick={save}>
            保存
          </Button>
        </div>
        <Tabs activeKey={current} onChange={tabChange} size={'middle' as any}>
          {groups.map((item: any) => (
            <Tabs.TabPane key={item.id} tab={item.name} />
          ))}
        </Tabs>
      </NavCard>
      <PropertiesContainer />
    </div>
  )
}

export default Right
