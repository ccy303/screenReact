import { Input } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const InputEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    node: { id, actions = [], editor },
  } = props
  const { dataType, component, ...rest } = editor || {}
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const changeHandle = (e: any) => {
    const v = e.target.value
    onChange([{ prop: id, value: v, actions }])
  }

  return <Input value={innerValue} onChange={changeHandle} {...rest} />
}

export default InputEditor
