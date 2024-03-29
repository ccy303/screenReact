import React, { FC, useEffect, forwardRef, useImperativeHandle, useContext, useState, useMemo } from 'react'
import { Message } from '@kdcloudjs/kdesign'
import { ViewItemContext, ViewItemProps } from 'dw/views/ViewItem'
import $_ from 'lodash'
import linq from 'linq'
import useBase from 'dw/store/useBase'
import Center from 'dw/views/Design/layout/Center'
import Left from 'dw/views/Design/layout/Left'
import Right from 'dw/views/Design/layout/Right'
import useMain from 'dw/store/useMain'
import usePropsData from 'dw/store/usePropsData'

import './index.less'
import Preview from 'dw/views/Design/layout/Preview'

const Design = () => {
  const {
    base: { showRight, showLeft, designMode },
  } = useBase()
  const { globalConfig, selectPageGroup } = useMain()

  const { propsData, invoke } = useContext(ViewItemContext)
  const { updatePropsData } = usePropsData()

  useEffect(() => {
    console.log('---design-propsData---', propsData)
    updatePropsData(propsData)
  }, [propsData, propsData?.t])

  useEffect(() => {
    selectPageGroup(true)
  }, [])

  return (
    <div className="dw-design">
      {!designMode ? (
        <Preview />
      ) : (
        <>
          {showLeft && <Left />}
          <Center />
          {showRight && <Right />}
        </>
      )}
    </div>
  )
}

export default Design
