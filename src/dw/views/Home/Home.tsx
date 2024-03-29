import React, { FC, useEffect, forwardRef, useImperativeHandle, useContext, useState, useMemo } from 'react'
import { ViewItemContext } from 'dw/views/ViewItem'
import usePropsData from 'dw/store/usePropsData'
import Preview from 'dw/views/Design/layout/Preview'

import './index.less'

const Home = () => {
  const prefixClx = `dw-home`

  const { propsData } = useContext(ViewItemContext)
  const { updatePropsData } = usePropsData()

  useEffect(() => {
    console.log('---home-propsData---', propsData)
    updatePropsData(propsData)
  }, [propsData, propsData?.t])

  return (
    <div className={prefixClx}>
      <div className={`${prefixClx}-container`}>
        <Preview />
      </div>
    </div>
  )
}

export default Home
