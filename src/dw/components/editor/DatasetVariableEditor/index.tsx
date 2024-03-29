import { Button, DatePicker, Icon, Input, Modal, Select } from '@kdcloudjs/kdesign'
import React, { useContext, useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'
import * as constants from 'dw/api/Constants'
import { ViewItemContext } from 'dw/views/ViewItem'
import i18n from 'dw/api/I18n'
import _ from 'lodash'

import './index.less'

const DatasetVariableEditor = (props: PropertiesItemProps) => {
  const {
    value,
    onChange,
    selectId,
    selectType,
    currentItem,
    node: { id, actions = [], editor },
  } = props
  const { dataType, type, component, invokeType, ...rest } = editor || {}
  const { invoke } = useContext(ViewItemContext)

  const prefixCls = 'dw-design-editor-dataset-variable'

  const onSearch = (data: any, t = 'dim') => {
    if (selectId) {
      if (t === 'dim') {
        invoke(constants.CallBackType.EVENT_DIM_F7, {
          dim: data,
          dimList: [],
          primaryKey: `${constants.PrimaryKey.DIMF7.DimF7}_${selectId}_${data.number}`,
        })
      } else {
        invoke(constants.CallBackType.EVENT_DIM_F7, {
          dim: data,
          dimList: [],
          primaryKey: `${constants.PrimaryKey.DIMF7.VariableF7}_${selectId}_${data.number}`,
        })
      }
    }
  }

  const onClear = (v: any, data: any, t = 'dim') => {
    if (v.target.value === '') {
      if (t === 'dim') {
        const dimIndex = currentItem?.dataset.dimParams.findIndex((c: any) => c.id === data.id)
        if (dimIndex >= 0) {
          const dimFind = _.cloneDeep(currentItem?.dataset.dimParams[dimIndex])
          dimFind.member = {}
          onChange([{ prop: `${id}[${dimIndex}]`, value: dimFind }])
        }
      } else {
        const varIndex = currentItem?.dataset.varParams.findIndex((c: any) => c.defaultvalueid === data.defaultvalueid)
        if (varIndex >= 0) {
          const varFind = _.cloneDeep(currentItem?.dataset.varParams[varIndex])
          varFind.modifyvalue = ''
          onChange([{ prop: `${id}[${varIndex}]`, value: varFind }])
        }
      }
    }
  }

  const onChangeDate = (v: any, d: any) => {
    //
  }
  const onChangeSelect = (v: any, d: any) => {
    //
  }
  const onChangeInput = (v: any, d: any) => {
    //
  }

  const renderItem = (d: any) => {
    if (type === 'dimParams') {
      return (
        <Input
          value={d?.member?.name || ''}
          onChange={(v) => onClear(v, d)}
          suffix={<Icon onClick={() => onSearch(d)} type="search" />}
          allowClear
          readOnly
          {...rest}
        />
      )
    }
    const valueType = Number.parseInt(d.valuetype, 10)
    if (valueType === constants.variableType.Date) {
      return <DatePicker value={d?.modifyvalue || null} onChange={(v) => onChangeDate(v, d)} />
    }
    if (valueType === constants.variableType.Dim) {
      return (
        <Input
          value={d?.modifyvalue || ''}
          onChange={(v) => onClear(v, d, 'var')}
          suffix={<Icon onClick={() => onSearch(d, 'var')} type="search" />}
          allowClear
          readOnly
          {...rest}
        />
      )
    }
    if (valueType === constants.variableType.Enum) {
      return (
        <Select value={d?.modifyvalue || ''} placeholder="" onChange={(v) => onChangeSelect(v, d)}>
          {Array.isArray(d?.entryentity) &&
            d.entryentity.map((entity: any) => {
              return (
                <Select.Option key={entity.enum_number} value={entity.enum_number}>
                  {entity.enum_name}
                </Select.Option>
              )
            })}
        </Select>
      )
    }
    if ([constants.variableType.Text, constants.variableType.Number].includes(valueType)) {
      return <Input value={d?.modifyvalue || ''} onChange={(v) => onChangeInput(v, d)} {...rest} />
    }

    return null
  }

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-item`}>
          <div>{i18n.msg('c54')}</div>
          <div>{i18n.msg('c56')}</div>
        </div>
      </div>
      <div className={`${prefixCls}-body`}>
        {Array.isArray(value) &&
          value.length &&
          value.map((d) => {
            return (
              <div className={`${prefixCls}-item`} key={d.name}>
                <div>{d.name}</div>
                <div>{renderItem(d)}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default DatasetVariableEditor
