import { Button, Message, Stepper } from '@kdcloudjs/kdesign'
import React, { useContext, useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'
import i18n from 'dw/api/I18n'
import * as vfy from 'dw/api/ComponentVerifyCheck'
import _ from 'lodash'
import * as constants from 'dw/api/Constants'
import { ViewItemContext } from 'dw/views/ViewItem'

const ButtonEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    currentItem,
    node: { id, editor },
  } = props
  const { invoke } = useContext(ViewItemContext)
  const { component, label, ...rest } = editor as any

  const onClick = () => {
    if (currentItem) {
      const verify = vfy.verifyCheck([currentItem])
      if (!verify.success) {
        Message.error(verify.message)
        return
      }

      const temp = _.cloneDeep(currentItem)
      temp.data = []
      temp.pid = '0'
      invoke(constants.CallBackType.EVENT_MODULE_SAVE, {
        item: currentItem,
      })
    }
  }

  return (
    <div style={{ lineHeight: '30px' }}>
      <Button {...rest} onClick={onClick}>
        {label}
      </Button>
    </div>
  )
}

export default ButtonEditor
