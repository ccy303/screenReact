import React, { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import i18n from 'dw/api/I18n'
import { displayClx, displayType } from 'dw/views/Design/layout/Right/DisplayContainer'

const DisplayBox: FC<{
  data: any
  onSort: any
  onClick?: any
  index: number
}> = ({ data, index, onSort, onClick }) => {
  const { name } = data
  const ref: any = useRef(null)
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: displayType,
      item: { data, index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  )

  const [{ handlerId }, drop] = useDrop({
    accept: [displayType],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (index !== -1) {
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex !== hoverIndex) {
          if (dragIndex !== -1) {
            onSort(dragIndex, hoverIndex)
          }
        }
      } else {
        onSort(0, 0, item)
      }
    },
  })

  drag(drop(ref))

  return (
    <div ref={ref} className={`${displayClx}-item`} data-handler-id={handlerId} style={{ opacity }} onClick={onClick}>
      <div>{name}</div>
    </div>
  )
}

export default DisplayBox
