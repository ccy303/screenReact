import _ from 'lodash'
import * as i18n from './I18n'

export const defaultPageWidth = 1600
export const defaultPageHeight = 900
export const fixGrid = 5
// 文本编辑器宽高
export const defaultRichTextBoxW = 1080
export const defaultRichTextBoxH = 710


export const BorderStyleList = [
  {
    label: i18n.msg('borderStyle1'),
    labelId: 'borderStyle1',
    value: 'dotted',
  },
  {
    label: i18n.msg('borderStyle2'),
    labelId: 'borderStyle2',
    value: 'dashed',
  },
  {
    label: i18n.msg('borderStyle3'),
    labelId: 'borderStyle3',
    value: 'solid',
  },
  {
    label: i18n.msg('borderStyle4'),
    labelId: 'borderStyle4',
    value: 'double',
  },
  {
    label: i18n.msg('borderStyle5'),
    labelId: 'borderStyle5',
    value: 'groove',
  },
  {
    label: i18n.msg('borderStyle6'),
    labelId: 'borderStyle6',
    value: 'ridge',
  },
  {
    label: i18n.msg('borderStyle7'),
    labelId: 'borderStyle7',
    value: 'inset',
  },
  {
    label: i18n.msg('borderStyle8'),
    labelId: 'borderStyle8',
    value: 'outset',
  },
]

export const TYPE_TEXT = {
  type: 'analysis_text',
  defaultWidth: 500, // defaultSliderH
  defaultHeight: 120, // defaultSliderW
  name: i18n.msg('component65'),
  nameKey: 'component65',
}

export const TYPE_TIME = {
  type: 'analysis_time',
  defaultWidth: 350,
  defaultHeight: 50,
  name: i18n.msg('component66'),
  nameKey: 'component66',
}

export const TYPE_TABLE = {
  type: 'analysis_component_table',
  defaultWidth: 500,
  defaultHeight: 450,
  name: i18n.msg('component63'),
  nameKey: 'component63',
}

export const PageScaleMode = {
  Full: 'full',
  FullHeight: 'full_height',
  FullWidth: 'full_width',
  None: 'none',
}

export const DigitalTypes = [
  {
    label: i18n.msg('digitalTypes1'),
    labelId: 'digitalTypes1',
    value: 'digital',
  },
  {
    label: i18n.msg('digitalTypes2'),
    labelId: 'digitalTypes2',
    value: 'currency',
  },
  {
    label: i18n.msg('digitalTypes3'),
    labelId: 'digitalTypes3',
    value: 'percent',
  },
]

export const CurrencySymbols = ['¥', '$', '€']

export const FunnelLabelPosition = [
  {
    label: i18n.msg('inside'),
    labelId: 'inside',
    value: 'inside',
  },
  {
    label: i18n.msg('outside'),
    labelId: 'outside',
    value: 'outside',
  },
]

export const BarChartPieDataLabelTypes = [
  {
    label: i18n.msg('dataValue'),
    labelId: 'dataValue',
    value: 'default',
  },
  {
    label: i18n.msg('total'),
    labelId: 'total',
    value: 'total',
  },
  {
    label: i18n.msg('classificationDatavalue'),
    labelId: 'classificationDatavalue',
    value: 'classificationdatavalue',
  },
  {
    label: i18n.msg('classificationTotal'),
    labelId: 'classificationTotal',
    value: 'classificationtotal',
  },
  {
    label: i18n.msg('datavalueTotal'),
    labelId: 'datavalueTotal',
    value: 'datavaluetotal',
  },
]