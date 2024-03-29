import { Radio } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const RadioEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    node: { id, actions = [], editor },
  } = props
  const { dataType, options = [], radioType, component, ...rest } = editor || {}
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const changeHandle = (e: any, v: any) => {
    onChange([{ prop: id, value: v, actions }])
  }

  return (
    <Radio.Group value={innerValue} onChange={changeHandle} {...rest}>
      {options?.map((o: any) => {
        return (
          <Radio key={o.value} value={o.value} radioType={radioType}>
            {o.name}
          </Radio>
        )
      })}
    </Radio.Group>
  )
}

export default RadioEditor
