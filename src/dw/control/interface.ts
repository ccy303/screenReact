import React, { CSSProperties, ReactElement } from 'react'
import { EditorMapProp } from 'dw/components/editor'

export type ValueProp = any

export type ObjectProp = {
  [key: string]: any
}

// 选项组件类型
export type EditorType = keyof EditorMapProp

export type ControlActionDo = {
  id: string
  changeType?: 'node' | 'value' | 'group' | 'together'
  changeId?: string
  changeValue?: ValueProp
}

export type MarkProps = '=' | '>' | '<' | '>=' | '<=' | 'in' | 'noEmpty' | 'together'

export type ControlAction = {
  condition: {
    value?: ValueProp
    mark?: MarkProps
  }
  todo?: ControlActionDo[]
  elseTodo?: ControlActionDo[]
}

export type VisibleProp = boolean | { conditionId: string; mark: MarkProps; type?: string }

export type ControlNodeProps = {
  visible?: VisibleProp
  id: string
  name?: string
  editor?: {
    options?: { value: any; name: string | React.ReactNode }[]
    component?: EditorType
    dataType?: 'string' | 'number' | 'boolean' | 'array'
    defaultValue?: ValueProp
    [key: string]: ValueProp
  }
  actions?: ControlAction[]
  style?: CSSProperties
}

export type ControlProProps = {
  id?: string
  name?: string
  defaultOpen?: boolean
  visible?: VisibleProp
  order?: number
  show?: {
    value?: boolean
    actions?: ControlAction[]
  }
  nodes: ControlNodeProps[]
}

export type PropertiesProps = ControlProProps[]

export type RequestProps = {
  legendReName: any
  displayReName: any
  legendDetailReName: any
  xAxisReName: string
  yAxisReName: string
  xTitleShow: boolean
  yTitleShow: boolean
  xnameRotate: number
  ynameRotate: number
  yLineSubRotate: number
  yAxisLineReName: any
  smallSeriesLegendReName: any
  sortSelectX: string
  sortSelectY: string
  customValueX: string
  customValueY: string
  legendNumber: any
  displayValueNumber: any
  legendDetailNumber: any
  xAxisNumber: any
  yAxisNumber: any
  smallSeriesChartNumber: any
  yAxisLineNumbers: any[]
  TableColumns: any[]
}

export type RequestKeys = keyof RequestProps

export type DisplayProps = {
  label: string
  component: 'DisplayItem'
  valueProp: RequestKeys
  nameProp: RequestKeys
  isSort: boolean
  sortProp?: RequestKeys
  sortCustomProp?: RequestKeys
}

export type ControlGroupProps = {
  id: string
  name: string
  properties: PropertiesProps // 格式
  display?: DisplayProps[] // 布局
  displayDataShow?: boolean // 布局数据选择区
}

export type ControlProps = {
  name: string
  type: string
  category: 'common' | 'page' | 'charts' // 组件类别
  group: ControlGroupProps[]
}

export type PropertiesItemProps = {
  node: ControlNodeProps
  prefixCls: string
  value: any
  onChange: any
  currentItem?: ComponentItemProps
  selectId?: string
  selectType?: string
}

export type ComponentItemProps = {
  c: {
    bkColor: string
    config: {
      title: ObjectProp
      charts?: any
      digitalFormat?: any
      [key: string]: any
    }
    form: {
      dynamicItem: any[]
      [key: string]: any
    }
    [key: string]: any
  }
  type: string
  dataSet: any
  x: number
  y: number
  w: number
  h: number
  id: string
  zIndex: number
  dataset: {
    id: any
    name: string
    var: any[]
    filter: any[]
    datesetFilterItems: any
    datesetFilterItemsStr: string
    detail: any[]
    request: RequestProps
    [key: string]: any
  }
  [key: string]: any
}
