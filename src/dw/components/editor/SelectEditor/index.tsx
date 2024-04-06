import { Select } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const SelectEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    node: { id, actions = [], editor },
  } = props
  const { dataType, options = [], component, ...rest } = editor || {}
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const changeHandle = (v: any) => {
    onChange([{ prop: id, value: v, actions }])
  }

  return (
    <Select onChange={changeHandle} value={innerValue} {...rest}>
      {options?.map((o) => {
        return (
          <Select.Option key={`${o.value}`} value={o.value}>
            {o.name}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default SelectEditor
