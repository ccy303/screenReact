import React, { useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'

const TextEditor = (props: PropertiesItemProps) => {
  const { value, node, onChange } = props

  return <div>{value}</div>
}

export default TextEditor
