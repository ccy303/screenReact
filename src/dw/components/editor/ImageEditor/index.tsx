import { Icon, Input } from '@kdcloudjs/kdesign'
import React from 'react'
import { PropertiesItemProps } from 'dw/control/interface'
import _ from 'lodash'
import useMain from 'dw/store/useMain'

const ImageEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    node: { id, editor, actions },
  } = props
  const {
    globalConfig: {},
  } = useMain()
  const { component, label, ...rest } = editor as any

  const onClick = () => {}

  const onDel = () => {
    onChange([{ prop: id, value: '', actions }])
  }

  return (
    <div style={{ lineHeight: '30px' }}>
      <Input
        borderType="bordered"
        readOnly
        value={value}
        suffix={value ? <Icon type="delete" onClick={onDel} /> : <Icon type="edit" onClick={onClick} />}
      />
    </div>
  )
}

export default ImageEditor
