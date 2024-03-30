import React, { FC } from 'react'
import Collapse from 'dw/components/common/Collapse'
import useMain, { ChangeItemProps } from 'dw/store/useMain'
import { ControlNodeProps, PropertiesItemProps, VisibleProp } from 'dw/control/interface'
import NameTipWrapper from 'dw/components/common/NameTipWrapper'
import editorMap from 'dw/components/editor'
import { Button } from '@kdcloudjs/kdesign'
import _ from 'lodash'
import './PropertiesContainer.less'

export const PropertiesItem: FC<PropertiesItemProps> = (props) => {
  const {
    prefixCls,
    node: { name = '', editor, id, style },
  } = props
  if (editor?.component) {
    const comp = editor.component
    const Component = editorMap[comp]

    return (
      <div className={`${prefixCls}-item`} key={id} style={style}>
        {name && <NameTipWrapper className={`${prefixCls}-item-label`} label={name} />}
        <div className={`${prefixCls}-item-component`}>
          <Component {...props} />
        </div>
      </div>
    )
  }

  return null
}

export const PropertiesContainer: FC<any> = (props) => {
  const {
    properties,
    globalConfig: { selectId, selectType, pageControl },
    group,
    changeItem,
    getCurrentItem,
  } = useMain()

  const prefixCls = 'dw-design-right-properties-view'
  const currentItem = getCurrentItem()

  const getVisible = (visible: VisibleProp = true) => {
    let ret = visible
    if (typeof visible === 'object') {
      const { conditionId, mark, type = 'array' } = visible
      const temp = _.get(currentItem, conditionId)
      switch (mark) {
        case 'noEmpty':
          ret = type === 'string' ? !!temp : Array.isArray(temp) && temp.length > 0
          break
      }
    }
    return ret
  }

  const onChange = (arr: ChangeItemProps[]) => {
    changeItem(arr, selectId)
  }

  return (
    <div className={prefixCls}>
      {Array.isArray(properties) && properties.length > 0
        ? properties.map((p) => {
            const { id, name = '', visible = true, show, nodes, defaultOpen } = p
            const v = getVisible(visible)

            if (v) {
              return (
                <Collapse
                  title={name}
                  key={id}
                  id={id}
                  rootId={selectId}
                  defaultOpen={defaultOpen || false}
                  show={show?.value}
                  actions={show?.actions}
                >
                  <div style={{ padding: 10 }}>
                    {nodes.map((node: ControlNodeProps) => {
                      const propertiesItemProps: PropertiesItemProps = {
                        value: _.get(selectId ? currentItem : pageControl, node.id),
                        node,
                        onChange,
                        selectType,
                        selectId,
                        currentItem,
                        prefixCls,
                      }
                      const vn = getVisible(node.visible)
                      if (vn) {
                        return <PropertiesItem key={node.id} {...propertiesItemProps} />
                      }
                      return null
                    })}
                  </div>
                </Collapse>
              )
            }
            return null
          })
        : null}

      {group.current == 'screenConfig' && (
        <div className='w-100 flex-center mb-20'>
          <Button type='primary'>大屏数据保存</Button>
        </div>
      )}
    </div>
  )
}
