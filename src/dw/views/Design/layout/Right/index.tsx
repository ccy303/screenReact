import React, { FC } from 'react'
import { Icon, Tabs } from '@kdcloudjs/kdesign'
import useMain from 'dw/store/useMain'

import './index.less'
import useBase from 'dw/store/useBase'
import { PropertiesContainer } from 'dw/views/Design/layout/Right/PropertiesContainer'
import { LAYOUT } from 'dw/control/common'
import DisplayContainer from 'dw/views/Design/layout/Right/DisplayContainer'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import NavCard from 'dw/components/common/NavCard'

const Right: FC<any> = (props) => {
  const { setRight } = useBase()
  const {
    group: { groups, current },
    changeGroupCurrent,
  } = useMain()

  const closeConfig = () => {
    setRight(false)
  }

  const tabChange = (v: any) => {
    changeGroupCurrent(v)
  }

  return (
    <div className="dw-design-right">
      <NavCard title="配置" operate={<Icon style={{ cursor: 'pointer' }} onClick={closeConfig} type="close" />}>
        <Tabs activeKey={current} onChange={tabChange} size={'large' as any}>
          {groups.map((item: any) => (
            <Tabs.TabPane key={item.id} tab={item.name} />
          ))}
        </Tabs>
      </NavCard>

      {current === LAYOUT ? (
        <DndProvider backend={HTML5Backend}>
          <DisplayContainer />
        </DndProvider>
      ) : (
        <PropertiesContainer />
      )}
    </div>
  )
}

export default Right
