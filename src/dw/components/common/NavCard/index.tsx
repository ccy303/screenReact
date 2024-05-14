import React, { FC, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Message } from '@kdcloudjs/kdesign'
import { ViewItemProps } from 'dw/views/ViewItem'
import './index.less'

export type NavCardProps = {
  title: string
  operate?: React.ReactNode
  children?: React.ReactNode
}

const prefix = 'dw-nav-card'

const NavCard: FC<NavCardProps> = ({ title, operate, children }) => {
  return (
    <div className={prefix}>
      <div className={`${prefix}-top`}>
        <div>{title}</div>
        {operate && <div>{operate}</div>}
      </div>
      <div className={`${prefix}-main`}>{children}</div>
    </div>
  )
}

export default NavCard
