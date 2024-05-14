import { Stepper } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const StepperEditor = (props: PropertiesItemProps) => {
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
    let v = e.target.value
    if (dataType === 'number') {
      v = Number(v)
    }
    onChange([{ prop: id, value: v, actions }])
  }

  return <Stepper value={innerValue} onChange={changeHandle} {...rest} />
}

export default StepperEditor
