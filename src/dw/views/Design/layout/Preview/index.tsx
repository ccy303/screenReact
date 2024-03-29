import { ComponentItemProps } from 'dw/control/interface'
import itemMap from 'dw/components/item'
import React from 'react'
import useMain from 'dw/store/useMain'
import { Button } from '@kdcloudjs/kdesign'
import useBase from 'dw/store/useBase'
import FloatButton from 'dw/views/Design/layout/Center/FloatButton'

const Preview = () => {
  const {
    itemList,
    globalConfig: {
      pageControl: { pageConfig },
    },
  } = useMain()
  const { setDesignMode, viewUrl } = useBase()

  const { width, height, backgroundSize, backgroundColor, url } = pageConfig

  const backDesign = () => {
    setDesignMode(true)
  }

  return (
    <div>
      {viewUrl === 'Design' && <Button onClick={backDesign}>back</Button>}
      <div
        style={{
          position: 'relative',
          width: Number(width),
          height: Number(height),
          backgroundImage: url ? `url(${url})` : undefined,
          backgroundSize,
          backgroundColor,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <FloatButton />
        {itemList.map((it: ComponentItemProps) => {
          const { id, type, x, y, w, h, zIndex } = it
          const Component = itemMap[type]
          const style: React.CSSProperties = {
            position: 'absolute',
            zIndex,
            width: w,
            height: h,
            top: y,
            left: x,
          }
          return (
            <div style={style} key={id}>
              <Component {...it} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Preview
