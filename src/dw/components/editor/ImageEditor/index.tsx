import { Button, Icon, Input, Message, Stepper } from '@kdcloudjs/kdesign'
import React, { useContext, useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'
import i18n from 'dw/api/I18n'
import * as vfy from 'dw/api/ComponentVerifyCheck'
import _ from 'lodash'
import * as constants from 'dw/api/Constants'
import { ViewItemContext } from 'dw/views/ViewItem'
import useMain from 'dw/store/useMain'

const ImageEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    node: { id, editor, actions },
  } = props
  const {
    globalConfig: {
      pageControl: { pageConfig },
    },
  } = useMain()
  const { invoke } = useContext(ViewItemContext)
  const { component, label, ...rest } = editor as any

  const onClick = () => {
    invoke(constants.CallBackType.EVENT_SELECTIMAGE, { itemId: pageConfig?.id || '' })
  }

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
