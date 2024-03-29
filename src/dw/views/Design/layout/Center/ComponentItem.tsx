import { ComponentItemProps } from 'dw/control/interface'
import useMain from 'dw/store/useMain'
import itemMap from 'dw/components/item'
import React from 'react'

export const ComponentItem = (props: ComponentItemProps) => {
  const { selectItem } = useMain()
  const { type, id } = props

  const Component = itemMap[type]

  const onItemClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectItem(id)
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('ComponentItem onDrop', e?.dataTransfer?.getData('Type'))
  }

  return (
    <div className={`${props.prefixClx}-item-main`} onClick={onItemClick} onDragOver={onDragOver} onDrop={onDrop}>
      <Component {...props} />
    </div>
  )
}

export default ComponentItem
