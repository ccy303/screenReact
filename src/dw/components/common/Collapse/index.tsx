import React, { FC, useState } from 'react'
import { Icon, Switch } from '@kdcloudjs/kdesign'

import './index.less'
import { ControlAction } from 'dw/control/interface'
import useMain from 'dw/store/useMain'

export type CollapseProps = {
  title: string
  id?: string
  rootId?: string
  defaultOpen?: boolean
  show?: boolean
  children?: any
  actions?: ControlAction[]
  leave?: 1 | 2
}

const Collapse: FC<CollapseProps> = ({
  children,
  id,
  title = '',
  rootId,
  defaultOpen = false,
  show = undefined,
  actions = [],
  leave = 1,
}) => {
  const { changeItem } = useMain()

  const [open, setOpen] = useState<boolean>(defaultOpen)
  const showCheck = typeof show === 'boolean'

  const onChange = (c: boolean) => {
    changeItem([], rootId, { showId: id, show: c, actions })
  }

  return (
    <div className="dw-collapse">
      {leave === 1 && (
        <div className="dw-collapse-level-one">
          <div
            onClick={() => {
              setOpen(!open)
            }}
          >
            <div>{title}</div>
            {open ? <Icon type="hide" /> : <Icon type="preview" />}
          </div>
          {showCheck && (
            <div>
              <Switch checked={show} onChange={onChange} />
            </div>
          )}
        </div>
      )}
      {leave === 2 && (
        <div
          className="dw-collapse-level-two"
          onClick={() => {
            setOpen(!open)
          }}
        >
          <div>
            {open ? <Icon type="hide" /> : <Icon type="preview" />}
            <div>{title}</div>
          </div>
        </div>
      )}
      <div className="dw-collapse-main" style={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}>
        {children}
      </div>
    </div>
  )
}

export default Collapse
