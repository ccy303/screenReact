// noinspection DuplicatedCode

import React, { useEffect, useState } from 'react'
import useMain from 'dw/store/useMain'
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd'
import { ComponentItemProps } from 'dw/control/interface'
import editorMap from 'dw/components/editor'
import itemMap from 'dw/components/item'
import Ruler from 'dw/views/Design/layout/Center/Ruler'
import ComponentItem from 'dw/views/Design/layout/Center/ComponentItem'

const _bak = (props: any) => {
  const { prefixClx } = props
  const {
    itemList,
    changeItem,
    selectItem,
    globalConfig: {
      pageControl: { pageConfig },
    },
  } = useMain()

  const onDragStop = (id: string, xo: number, yo: number, e: any, data: DraggableData) => {
    e.stopPropagation()
    const { x = 0, y = 0 } = data
    if (xo !== x || yo !== y) {
      const arr = [
        { prop: 'x', value: data.x },
        { prop: 'y', value: data.y },
      ]
      changeItem(arr, id)
    }
  }

  const onResizeStop = (
    id: string,
    wo: number,
    ho: number,
    e: MouseEvent | TouchEvent,
    dir: any,
    ref: HTMLElement,
    delta: ResizableDelta,
    position: any,
  ) => {
    e.stopPropagation()
    const w = Number.parseInt(ref.style.width || '0', 10)
    const h = Number.parseInt(ref.style.height || '0', 10)
    if (w !== wo || h !== ho) {
      const arr = [
        { prop: 'w', value: w },
        { prop: 'h', value: h },
      ]
      changeItem(arr, id)
    }
  }

  return (
    <>
      <Ruler length={pageConfig.width} actives={[]} />
      <Ruler length={pageConfig.height} actives={[]} type="vertical" />
      {itemList.map((it: ComponentItemProps) => {
        const { x, y, w, h, id, zIndex } = it
        return (
          <Rnd
            className={`${prefixClx}-item`}
            style={{ background: '#fff', zIndex }}
            key={it.id}
            position={{ x, y }}
            size={{ width: w, height: h }}
            onDrag={(...arg) => {
              // onDrag({ width: w, height: h, id }, ...arg)
            }}
            onDragStop={(...arg) => {
              onDragStop(id, x, y, ...arg)
            }}
            onResizeStop={(...arg) => {
              onResizeStop(id, w, h, ...arg)
            }}
          >
            <ComponentItem {...it} prefixClx={prefixClx} />
          </Rnd>
        )
      })}
    </>
  )
}

export default _bak
