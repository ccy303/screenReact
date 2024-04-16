import React, { FC, useRef } from 'react'
import { Icon } from '@kdcloudjs/kdesign'
import ComponentContainer from 'dw/views/Design/layout/Center/ComponentContainer'
import useBase from 'dw/store/useBase'
import useMain from 'dw/store/useMain'

import './index.less'

export const prefixClxCenter = 'dw-design-center'

const Center: FC<any> = (props) => {
  const {
    base: { showRight, showLeft },
    setRight,
    setLeft,
  } = useBase()
  const {
    selectPageGroup,
    addItemWithType,
    globalConfig: {
      pageControl: { pageConfig },
    },
  } = useMain()
  const { width, height, backgroundSize, backgroundColor, url } = pageConfig || {}

  const refCanvas = useRef(null)

  const getCanvasStyle = () => {
    return {
      width,
      height,
      backgroundImage: `url(${url})`,
      backgroundSize,
      backgroundColor,
      backgroundRepeat: 'no-repeat',
    }
  }

  const clickCenter = (e: any) => {
    if (!e.target.className.includes('react-draggable')) {
      selectPageGroup()
    }
  }

  const onDragOver = (e: any) => {
    console.log('onDragOver')
    e.preventDefault()
  }

  const onDrop = (e: any) => {
    console.log('onDrop', e?.dataTransfer?.getData('Data'))
    e.preventDefault()
    const data = JSON.parse(e?.dataTransfer?.getData('Data'))
    const sources = {
      x: e.clientX - 350,
      y: e.clientY - 35,
    }
    if (data) {
      addItemWithType(data, sources)
    }
  }

  return (
    <div className={prefixClxCenter} onClick={clickCenter}>
      <Icon onClick={() => setLeft(true)} className="dw-design-arrow" type="arrow-right-solid" />
      <div className={`${prefixClxCenter}-container`}>
        {!showRight && (
          <Icon onClick={() => setRight(true)} className={`${prefixClxCenter}-container-setting`} type="setting" />
        )}
        <div
          id={`${prefixClxCenter}-container-canvas`}
          className={`${prefixClxCenter}-container-canvas`}
          ref={refCanvas}
          onDragOver={onDragOver}
          onDrop={onDrop}
          style={getCanvasStyle()}
        >
          <ComponentContainer prefixClx={`${prefixClxCenter}-container-canvas`} />
        </div>
      </div>
    </div>
  )
}

export default Center
