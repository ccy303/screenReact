import React, { FC, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Icon, Message, Tooltip } from '@kdcloudjs/kdesign'
import { ViewItemProps } from 'dw/views/ViewItem'
import './index.less'
import { ComponentItemProps } from 'dw/control/interface'
import { calculateUnitArea } from 'dw/api/ChartCompute'

export type KdCardProps = {
  item: ComponentItemProps
  children?: React.ReactNode
  showTitle: boolean
}

const prefix = 'dw-kd-card'

const KdCardTitle: FC<{ item: ComponentItemProps; showDesp: boolean }> = ({ item, showDesp = false }) => {
  const unit = useMemo(() => calculateUnitArea(item) as any, [item])

  const { unitareastyle = {}, notaftertitle = true, unitName = '' } = unit

  const styleMain = {
    textAlign: item.c.title.align,
    background: item.c.title.backColor,
    width: '100%',
    maxWidth: '-webkit-fill-available',
    padding: 10,
    marginBottom: 16,
  }

  const styleSpan = {
    fontSize: item.c.title.fontSize,
    fontWeight: item.c.title.fontWeight,
    fontStyle: item.c.title.fontStyle,
    textDecoration: item.c.title.underline,
    color: item.c.title.foreColor,
    background: item.c.title.backColor,
  }

  return (
    <div style={styleMain} id={`${item.id}_title`}>
      <span style={styleSpan}>&nbsp;&nbsp; {item.title} &nbsp;&nbsp;</span>
      <span style={{ ...unitareastyle, fontSize: notaftertitle ? 12 : undefined }}> {unitName} </span>
      {showDesp && (
        <Tooltip tip={item.c.desp.content}>
          <Icon type="question" />
        </Tooltip>
      )}
    </div>
  )
}

const KdCard: FC<KdCardProps> = ({ item, children, showTitle }) => {
  const showDesp = useMemo(() => item && item.c && item.c.desp && item.c.desp.show, [item])

  const style = {
    background: item.c.bkColor,
    borderWidth: item.c.showBorder ? item.c.borderWidth : 0,
    borderStyle: item.c.borderStyle,
    borderColor: item.c.borderColor,
    backgroundColor: item.c.bkColor,
    boxShadow: item.c.showBorder ? '0 2px 12px 0 rgba(0,0,0,.1)' : 'none',
  }

  return (
    <div className={prefix} style={style}>
      {showTitle && <KdCardTitle showDesp={showDesp} item={item} />}
      {!showTitle && showDesp && (
        <Tooltip tip={item.c.desp.content}>
          <Icon type="question" />
        </Tooltip>
      )}
      <div className={`${prefix}-main`}>{children}</div>
    </div>
  )
}

export default KdCard
