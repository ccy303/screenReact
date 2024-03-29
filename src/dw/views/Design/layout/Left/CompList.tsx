import React, { FC, useCallback, useMemo, useState } from 'react'
import NavCard from 'dw/components/common/NavCard'
import useMain from 'dw/store/useMain'
import { prefixClsLeft } from 'dw/views/Design/layout/Left/index'

export type CompListProp = {
  title: string
  list: any[]
}

const CompList: FC<CompListProp> = ({ title, list }) => {
  const { addItemWithType } = useMain()

  const addComponents = (d: string) => {
    addItemWithType(d)
  }

  const onDragStart = (e: any, d: any) => {
    e.dataTransfer.setData('Type', d.componentType)
  }

  return (
    <NavCard title={title}>
      <div className={`${prefixClsLeft}-container`}>
        {list.map((d: any) => {
          return (
            <div
              className={`${prefixClsLeft}-main-item`}
              key={d.componentType}
              draggable
              onDragStart={(e: any) => onDragStart(e, d)}
              onClick={() => addComponents(d.componentType)}
            >
              <img className={`${prefixClsLeft}-main-item-img`} src={require(`assets/img/${d.componentImgName}.png`)} />
            </div>
          )
        })}
      </div>
    </NavCard>
  )
}

export default CompList
