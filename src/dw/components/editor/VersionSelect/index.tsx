import React, { useEffect, useState, useContext } from 'react'
import { Select, Tooltip } from '@kdcloudjs/kdesign'
import useMain from 'dw/store/useMain'
import { ViewItemContext } from 'dw/views/ViewItem'

const TextEditor = (props: any) => {
  const { value, node, onChange } = props

  const {
    globalConfig: {
      pageControl: {
        pageConfig: { configversion },
      },
    },
    getCurrentItem,
  } = useMain()

  const { model } = useContext(ViewItemContext)

  const currentItem = getCurrentItem()

  const formatVersionCfg = () => {
    let list: any = []

    if (node.type == 'screenConfig') {
      list = configversion || []
    } else {
      list = currentItem.optionversion
    }

    const data = (list || []).map((item: any) => {
      if (item.isinitial) {
        return { ...item, versionLabel: `${item.version}(初始)` }
      } else {
        return { ...item, versionLabel: item.version }
      }
    })
    return data
  }

  const versinChange = (id: any) => {
    if (node.type == 'screenConfig') {
      const target = configversion.find((item: any) => item.version == id)
      console.log(`%c大屏版本修改`, 'color:#00ff00', target)
      model.invokeAsync?.('configversion', JSON.stringify(target))
    } else {
      const target = currentItem.optionversion.find((item: any) => item.version == id)
      console.log(`%c图表版本修改`, 'color:#00ff00', target)
      model.invokeAsync?.('optionversion', JSON.stringify(target))
    }
  }

  return (
    <div>
      <Select placeholder="版本" style={{ width: '100%' }} onChange={versinChange}>
        {formatVersionCfg().map((v: any) => {
          return (
            <Select.Option style={{ width: '100%' }} value={v.version} key={`${v.version}`}>
              <Tooltip tip={v.versiondescribe}>
                <div style={{ width: '100%' }}>{v.versionLabel}</div>
              </Tooltip>
            </Select.Option>
          )
        })}
      </Select>
    </div>
  )
}

export default TextEditor
