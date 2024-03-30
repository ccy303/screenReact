import React, { FC, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Message } from '@kdcloudjs/kdesign'
import ViewItem, { ViewItemProps } from 'dw/views/ViewItem'
import useState from 'dw/store/useState'
import * as constants from 'dw/api/Constants'
import eventBus from 'dw/api/EventBus'
import comm from 'dw/api/Common'
import moment from 'moment'
import _ from 'lodash'

let updateSub: any = null

const Index: FC<any> = (props) => {
  const [state, setState] = useState<any>({
    propsData: {
      boxType: '2',
      url: '',
      dataType: 'DATA_INIT',
      designMode: true,
    },
    model: {
      isvId: 'kingdee',
      moduleId: 'eb',
      pageId: 'eb_analysiscanvas_design_1415051649050892288root24ea6146424448f7832c7529ac4289f2_1417390295955305472',
      schemaId: 'faranalysispanel',
    },
  })

  const getLangMsg = () => {
    console.log('getLangMsg')
  }

  const propsDataTest = (args: string) => {
    return require(`/mock/PropsDataType/${args}.json`)
  }

  const event_getItemId = (args: any) => {
    const itemId = comm.getCompLongId()
    const data = { type: args.type, itemId }
    const updateData = { data, dataType: constants.PropsDataType.DATA_GETITEMID_RESULT }
    eventBus.pub(state.model, 'update', updateData)
  }

  const event_common = (jsonName: string) => {
    let updateData = require(`/mock/PropsDataType/${jsonName}.json`)
    if (updateData) {
      updateData = _.cloneDeep(updateData)
      updateData.t = moment().format('yyyy-MM-DD HH:mm:ss')
    }

    eventBus.pub(state.model, 'update', updateData)
  }

  const invoke = (evtName: string, args: any) => {
    if (evtName === constants.CallBackType.EVENT_GETITEMID) {
      event_getItemId(args)
    } else if (evtName === constants.CallBackType.EVENT_DS_F7) {
      event_common(constants.PropsDataType.DATA_DS_F7_RESULT)
    } else if (
      evtName === constants.CallBackType.EVENT_VAR_ADD ||
      evtName === constants.CallBackType.EVENT_VAR_DELETE ||
      evtName === constants.CallBackType.EVENT_VAR_EDIT
    ) {
      event_common(constants.PropsDataType.DATA_VAR_REFRESH)
    } else if (
      evtName === constants.CallBackType.EVENT_DS_ADD ||
      evtName === constants.CallBackType.EVENT_DS_DELETE ||
      evtName === constants.CallBackType.EVENT_DS_EDIT
    ) {
      event_common(constants.PropsDataType.DATA_DS_REFRESH)
    } else if (evtName === constants.CallBackType.EVENT_SAVE) {
      alert('DEV模式模拟保存成功，保存数据见控制台')
    } else if (evtName === constants.CallBackType.EVENT_MODULE_SAVE) {
      event_common(constants.PropsDataType.DATA_MODULE_REFRESH)
    } else if (evtName === constants.CallBackType.EVENT_MODULE_ADDITEM) {
      event_common(constants.PropsDataType.DATA_MODULE_ADDITEM_RESULT)
    } else if (evtName === constants.CallBackType.EVENT_PREVIEW) {
      event_common(constants.PropsDataType.DATA_PREVIEW_RESULT)
    } else if (evtName === constants.CallBackType.EVENT_DS_FILTER) {
      event_common(constants.PropsDataType.DATA_DS_FILTER_RESULT)
    } else if (evtName === constants.CallBackType.EVENT_DIM_F7) {
      event_common(constants.PropsDataType.DATA_DIM_F7_RESULT)
    } else if (evtName === constants.CallBackType.EVENT_SELECTIMAGE) {
      let updateData = {
        data: {
          itemId: '1544224767043716096',
          url: 'http://localhost:8080/ierp/tempfile/download.do?configKey=redis.serversForCache&id=tempfile-39883438-d524-43b3-8b0a-900e9a35b324',
        },
        t: '2022-11-01 15:04:01',
        dataType: 'DATA_SELECTIMAGE_RESULT',
        primaryKey: '',
      }
      if (updateData) {
        updateData = _.cloneDeep(updateData)
        updateData.t = moment().format('yyyy-MM-DD HH:mm:ss')
        updateData.data.itemId = args.itemId
      }

      eventBus.pub(state.model, 'update', updateData)
      eventBus.pub(state.model, 'update', updateData)
    } else if (evtName === constants.CallBackType.EVENT_THEME_INIT) {
      event_common(constants.PropsDataType.DATA_THEME_INIT)
    } else if (evtName === constants.CallBackType.EVENT_ITEM_REFRESH) {
      event_common(constants.PropsDataType.DATA_ITEM_REFRESH_RESULT)
    } else if (evtName === constants.CallBackType.EVENT_DATASET_FORMULA) {
      event_common(constants.PropsDataType.DATA_DATASET_FORMULA_RESULT)
    } else if (evtName === 'propsDataTest') {
      const updateData = propsDataTest(args.item)
      eventBus.pub(state.model, 'update', updateData)
    } else if (evtName === 'event_getItemId') {
      const updateData = event_getItemId(args.item)
      eventBus.pub(state.model, 'update', updateData)
    } else if (evtName === 'event_common') {
      const updateData = event_common(args.item)
      eventBus.pub(state.model, 'update', updateData)
    } else {
      alert(`DEV模式还未实现该模拟:${evtName}`)
    }
  }

  useEffect(() => {
    updateSub = eventBus.sub(state.model, 'update', (p: any) => {
      console.log('---invoke-update---', p)
      const updateData = _.cloneDeep(p)
      updateData.t = moment().format('yyyy-MM-DD HH:mm:ss')
      setState((d: any) => {
        d.propsData = updateData
      })
    })

    // invoke('propsDataTest', { item: 'DATA_INIT' })

    return () => {
      if (updateSub) {
        eventBus.unsub(updateSub)
        updateSub = null
      }
    }
  }, [])

  return (
    <ViewItem
      propsData={state.propsData}
      model={state.model}
      designMode={state.designMode}
      invoke={invoke}
      invokeAsync={invoke}
      getLangMsg={getLangMsg}
    />
  )
}

export default Index
