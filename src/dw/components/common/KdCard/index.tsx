import React, { FC, useMemo } from 'react'
import { Icon, Tooltip } from '@kdcloudjs/kdesign'
import './index.less'
import { ComponentItemProps } from 'dw/control/interface'

export type KdCardProps = {
  item: ComponentItemProps
  children?: React.ReactNode
  showTitle: boolean
}

const prefix = 'dw-kd-card'

const KdCardTitle: FC<{ item: ComponentItemProps; showDesp: boolean }> = ({ item, showDesp = false }) => {
  const styleMain = {
    textAlign: item.content.title.align,
    background: item.content.title.backColor,
    width: '100%',
    maxWidth: '-webkit-fill-available',
    padding: 10,
    marginBottom: 6,
  }

  const styleSpan = {
    fontSize: item.content.title.fontSize,
    fontWeight: item.content.title.fontWeight,
    fontStyle: item.content.title.fontStyle,
    textDecoration: item.content.title.underline,
    color: item.content.title.foreColor,
    background: item.content.title.backColor,
  }

  return (
    <div style={styleMain} id={`${item.id}_title`}>
      <span style={styleSpan}>&nbsp;&nbsp; {item.title} &nbsp;&nbsp;</span>
      {showDesp && (
        <Tooltip tip={item.content.desp.content}>
          <Icon type="question" />
        </Tooltip>
      )}
    </div>
  )
}

const KdCard: FC<KdCardProps> = ({ item, children, showTitle }) => {
  const showDesp = useMemo(() => item && item.content && item.content.desp && item.content.desp.show, [item])

  const style = {
    background: item.content.bkColor,
    borderWidth: item.content.showBorder ? item.content.borderWidth : 0,
    borderStyle: item.content.borderStyle,
    borderColor: item.content.borderColor,
    backgroundColor: item.content.bkColor,
    boxShadow: item.content.showBorder ? '0 2px 12px 0 rgba(0,0,0,.1)' : 'none',
  }

  return (
    <div className={prefix} style={style}>
      {showTitle && <KdCardTitle showDesp={showDesp} item={item} />}
      {!showTitle && showDesp && (
        <Tooltip tip={item.content.desp.content}>
          <Icon type="question" />
        </Tooltip>
      )}
      <div className={`${prefix}-main`}>{children}</div>
    </div>
  )
}

export default KdCard
