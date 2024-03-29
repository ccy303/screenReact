import { Button, Icon, Input, Modal, Select } from '@kdcloudjs/kdesign'
import React, { useContext, useEffect, useState } from 'react'
import { PropertiesItemProps } from 'dw/control/interface'
import * as constants from 'dw/api/Constants'
import { ViewItemContext } from 'dw/views/ViewItem'
import useMain from 'dw/store/useMain'
import { DEFAULT_DATASET } from 'dw/control/common'
import i18n from 'dw/api/I18n'
import _ from 'lodash'

import './index.less'

const DEFAULT_ITEM = { label: '', value: '', customValue: '' }

const DYNAMIC_ITEM_PATH = 'c.form.dynamicItem'

const ModalBody = (props: any) => {
  const prefix = 'guides-modal'
  const { list = [], onChange } = props

  const addFilterItem = () => {
    const l = _.cloneDeep(list)
    l.push(DEFAULT_ITEM)
    onChange([{ prop: DYNAMIC_ITEM_PATH, value: l }])
  }
  const delFilterItem = (index: number) => {
    onChange([{ prop: DYNAMIC_ITEM_PATH, value: list.filter((d: any, i: number) => i !== index) }])
  }

  const onChangeHandle = (index: number, prop: string, value: any) => {
    const l = _.cloneDeep(list)
    _.set(l, `[${index}].${prop}`, value)
    onChange([{ prop: DYNAMIC_ITEM_PATH, value: l }])
  }
  return (
    <div className={prefix}>
      <div className={`${prefix}-top`}>
        <Button onClick={addFilterItem}>新增</Button>
      </div>
      <div className={`${prefix}-main`}>
        {list.map(({ value, label, customValue }: any, index: number) => {
          return (
            <div className={`${prefix}-main-item`} key={index}>
              <div className={`${prefix}-main-item-form`}>
                <div className={`${prefix}-main-item-form-label`}>{i18n.msg('value')}</div>
                <div className={`${prefix}-main-item-form-value`}>
                  <Select
                    value={value}
                    placeholder=""
                    borderType="bordered"
                    onChange={(v) => onChangeHandle(index, 'value', v)}
                  >
                    <Select.Option value="avg">{i18n.msg('avg')}</Select.Option>
                    <Select.Option value="mid">{i18n.msg('mid')}</Select.Option>
                    <Select.Option value="custom">{i18n.msg('custom')}</Select.Option>
                  </Select>
                </div>
              </div>
              <div className={`${prefix}-main-item-form`}>
                <div className={`${prefix}-main-item-form-label`}>{i18n.msg('customValue')}</div>
                <div className={`${prefix}-main-item-form-value`}>
                  <Input
                    borderType="bordered"
                    disabled={value !== 'custom'}
                    onChange={(v) => onChangeHandle(index, 'customValue', v.target.value)}
                  />
                </div>
              </div>
              <div className={`${prefix}-main-item-form`}>
                <div className={`${prefix}-main-item-form-label`}>{i18n.msg('label')}</div>
                <div className={`${prefix}-main-item-form-value`}>
                  <Input borderType="bordered" onChange={(v) => onChangeHandle(index, 'label', v.target.value)} />
                </div>
              </div>
              <div className={`${prefix}-main-item-form`}>
                <Button onClick={() => delFilterItem(index)}>
                  <Icon type="delete" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const DatasetInputEditor = (props: PropertiesItemProps) => {
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

  const prefixCls = 'dw-design-editor-dataset-input'
  const [innerValue, setInnerValue] = useState(value)
  const [visible, setVisible] = useState(false)

  const getValue = (v: string, defaultValue: any = '') => {
    if (selectId && currentItem) {
      return _.get(currentItem, v) || defaultValue
    }
    return defaultValue
  }

  useEffect(() => {
    if (type === 'guide') {
      const length = getValue(DYNAMIC_ITEM_PATH, []).length
      if (length) {
        setInnerValue(`${i18n.msg('currentlySet')}${length}${i18n.msg('strip')}${i18n.msg('guides')}`)
      } else {
        setInnerValue('')
      }
    } else {
      setInnerValue(value)
    }
  }, [value])

  const onSearch = () => {
    if (selectId) {
      invoke(constants.CallBackType.EVENT_DS_F7, {
        id: selectId,
        type: selectType,
      })
    }
  }

  const onPreview = () => {
    if (selectId) {
      invoke(constants.CallBackType.EVENT_DATASET_VIEW, {
        id: getValue('dataset.id'),
      })
    }
  }

  const onClear = (v: any) => {
    if (v.target.value === '') {
      onChange([{ prop: 'dataset', value: DEFAULT_DATASET, actions }])
    }
  }

  const onFilter = () => {
    if (selectId) {
      invoke(constants.CallBackType.EVENT_DS_FILTER, {
        itemId: getValue('id'),
        dsId: getValue('dataset.id'),
        datesetFilterItems: getValue('dataset.datesetFilterItems'),
      })
    }
  }

  const onGuide = () => {
    setVisible(true)
  }

  const onOk = () => {
    setVisible(false)
  }

  return (
    <div className={prefixCls}>
      <Modal
        title={i18n.msg('guides')}
        body={<ModalBody list={getValue(DYNAMIC_ITEM_PATH, [])} onChange={onChange} />}
        onCancel={onOk}
        onOk={onOk}
        maskClosable
        type="normal"
        closable
        mask
        focusTriggerAfterClose
        visible={visible}
        width={600}
        height={500}
      />
      {type === 'add' && (
        <>
          <Input
            value={innerValue}
            onChange={onClear}
            suffix={<Icon onClick={onSearch} type="search" />}
            prefix={innerValue && getValue('dataset.id') ? <Icon onClick={onPreview} type="preview" /> : undefined}
            allowClear
            readOnly
            {...rest}
          />
        </>
      )}
      {type === 'filter' && (
        <>
          <Input value={innerValue} suffix={<Icon onClick={onFilter} type="edit" />} readOnly {...rest} />
        </>
      )}
      {type === 'guide' && (
        <>
          <Input value={innerValue} suffix={<Icon onClick={onGuide} type="edit" />} readOnly {...rest} />
        </>
      )}
    </div>
  )
}

export default DatasetInputEditor
