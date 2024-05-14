import { Checkbox } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const CheckboxEditor = (props: PropertiesItemProps) => {
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

  // return <Checkbox value={innerValue} onChange={changeHandle} {...rest} />
  return (
    <Checkbox.Group value={innerValue} onChange={changeHandle} {...rest}>
      {options?.map((o: any) => {
        return (
          <Checkbox key={o.value} value={o.value}>
            {o.name}
          </Checkbox>
        )
      })}
    </Checkbox.Group>
  )
}

export default CheckboxEditor
