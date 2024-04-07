import { ComponentItemProps } from 'dw/control/interface'
import useMain from 'dw/store/useMain'
import EchartItem from 'dw/components/item/EchartItem'
import Text from 'dw/components/item/Text'
import React from 'react'

export const ComponentItem = (props: ComponentItemProps) => {
  const { selectItem } = useMain()
  const { id } = props
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
      {props.category == 'charts' && <EchartItem {...props} />}
      {props.category == 'text' && <Text {...props} />}
    </div>
  )
}

export default ComponentItem
