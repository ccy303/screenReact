import { ControlProps, PropertiesProps } from 'dw/control/interface'
import { Icon } from '@kdcloudjs/kdesign'
import React from 'react'
import {
  BACKGROUND_PROP,
  BASE_PROP,
  BORDER_PROP,
  DATASET_DIM_PROP,
  DATASET_PROP,
  DATASET_VAR_PROP,
  DEFAULT_DISPLAY,
  DESC_PROP,
  DIGITAL_FORMAT_PROP,
  LAYOUT,
  LEGEND_PROP,
  PIE_OTHER_PROP,
  POSITION_PROP,
  TITLE_PROP,
  CHART_BASE_INFO
} from 'dw/control/common'
import _ from 'lodash'
import { TYPE_PIE } from 'dw/api/Constants'
import * as constants from 'dw/api/Constants'
import i18n from 'dw/api/I18n'

const analysisPieChartPie: ControlProps = {
  name: TYPE_PIE.name,
  type: TYPE_PIE.type,
  category: 'charts',
  group: [
    {
      id: 'data',
      name: '基本信息',
      // properties: [DATASET_PROP, DATASET_VAR_PROP, DATASET_DIM_PROP, BASE_PROP],
      properties: [CHART_BASE_INFO],
    },
    {
      id: "dataSet",
      name: '数据配置',
      properties: [],
      displayDataShow: true,
    },
    {
      id: 'format',
      name: '样式',
      properties: [
        TITLE_PROP,
        LEGEND_PROP,
        DIGITAL_FORMAT_PROP,
        BACKGROUND_PROP,
        BORDER_PROP,
        DESC_PROP,
        PIE_OTHER_PROP,
        POSITION_PROP,
      ],
    },
  ],
}

export default analysisPieChartPie
