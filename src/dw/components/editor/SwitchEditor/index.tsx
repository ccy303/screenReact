import { Switch } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const SwitchEditor = (props: PropertiesItemProps) => {
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

  const changeHandle = (v: any) => {
    onChange([{ prop: id, value: v, actions }])
  }

  return <Switch checked={innerValue} onChange={changeHandle} {...rest} />
}

export default SwitchEditor
