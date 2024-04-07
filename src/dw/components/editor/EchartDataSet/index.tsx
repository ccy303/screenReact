import useMain from '@/dw/store/useMain'
import { Select } from '@kdcloudjs/kdesign'
import React, { useMemo } from 'react'

export default (props: any) => {
  const {
    value,
    onChange,
    node: { id, actions = [], editor },
  } = props

  const {
    getCurrentItem,
    globalConfig: { selectId },
    changeItem,
    changeDataSet,
  } = useMain()

  const { dataset, userXIndex, userYIndex } = getCurrentItem()

  const xIndex = useMemo(() => {
    const { dataindex } = dataset || {}
    if (!dataindex) return
    const xIndex = []
    for (let i = 0; i < dataindex.length; i++) {
      const item = dataindex[i]
      if (item[2] != 2 && item[2] != 3) {
        xIndex.push({ name: item[1], value: item[1] })
      }
    }
    return xIndex
  }, [dataset])

  const yIndex = useMemo(() => {
    const { dataindex } = dataset || {}
    if (!dataindex) return
    const xIndex = []
    for (let i = 0; i < dataindex.length; i++) {
      const item = dataindex[i]
      if (item[2] == 2 || item[2] == 3) {
        xIndex.push({ name: item[1], value: item[1] })
      }
    }
    return xIndex
  }, [dataset])

  const onSelChange = (type: any, e: any) => {
    if (type == 'xIndex') {
      onChange([{ prop: 'userXIndex', value: e }])
    } else if (type == 'yIndex') {
      onChange([{ prop: 'userYIndex', value: e }])
    }
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '20px', height: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '50px' }}>横轴</div>
        <div style={{ flex: 1 }}>
          <Select
            onChange={(e) => onSelChange('xIndex', e)}
            style={{ width: '100%' }}
            placeholder="横轴"
            mode="multiple"
            value={userXIndex}
          >
            {xIndex?.map((o) => {
              return (
                <Select.Option key={`${o.value}`} value={o.value}>
                  {o.name}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
        <div style={{ width: '50px' }}>纵轴</div>
        <div style={{ flex: 1 }}>
          <Select
            onChange={(e) => onSelChange('yIndex', e)}
            style={{ width: '100%' }}
            placeholder="纵轴"
            mode="multiple"
            value={userYIndex}
          >
            {yIndex?.map((o) => {
              return (
                <Select.Option key={`${o.value}`} value={o.value}>
                  {o.name}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div>
    </div>
  )
}
