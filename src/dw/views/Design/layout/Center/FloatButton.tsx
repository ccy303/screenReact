import React, { useRef, useState } from 'react'
import { prefixClxCenter } from 'dw/views/Design/layout/Center/index'
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd'
import useMain from 'dw/store/useMain'
import usePopper from '@kdcloudjs/kdesign/lib/_utils/usePopper'
import { useOnClickOutside } from '@kdcloudjs/kdesign/lib/_utils/hooks'

const DEFAULT_BUTTON = {
  width: 80,
  height: 80,
}

const FloatButton = () => {
  const {
    globalConfig: {
      pageControl: {
        queryConfig: { floatButton },
      },
    },
    changeItem,
  } = useMain()

  const ref: any = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)

  const onHide = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onDragStop = (e: any, data: DraggableData) => {
    e.stopPropagation()
    const { x = 0, y = 0 } = data
    if (floatButton.X !== x || floatButton.Y !== y) {
      const arr = [
        { prop: 'queryConfig.floatButton.X', value: parseInt(`${x}`) },
        { prop: 'queryConfig.floatButton.Y', value: parseInt(`${y}`) },
      ]
      changeItem(arr)
    } else {
      setTimeout(() => {
        setVisible(!visible)
      }, 10)
    }
  }

  // useOnClickOutside([ref], () => {
  //   setVisible(false)
  // })

  const renderUsePopper = usePopper(
    <div
      style={{
        width: DEFAULT_BUTTON.width,
        height: DEFAULT_BUTTON.height,
        background: `url(${require('assets/img/button_float.png')})`,
      }}
    />,
    <div className={`${prefixClxCenter}-float-button-container`}>111111111</div>,
    {
      visible,
      trigger: 'click',
      popperStyle: { zIndex: 9999999 },
      onVisibleChange: (v) => setVisible(v),
    },
  )

  if (floatButton.hide) {
    return null
  }

  return (
    <Rnd
      className={`${prefixClxCenter}-item`}
      style={{ background: 'transparent' }}
      key="floatButton"
      bounds="parent"
      position={{ x: floatButton.X, y: floatButton.Y }}
      size={{ width: DEFAULT_BUTTON.width, height: DEFAULT_BUTTON.height }}
      onDrag={onHide}
      enableResizing={false}
      onDragStop={onDragStop}
      onResizeStop={onHide}
    >
      <div className={`${prefixClxCenter}-float-button`} ref={ref}>
        {renderUsePopper}
      </div>
    </Rnd>
  )
}

export default FloatButton
