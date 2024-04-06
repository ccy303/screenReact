import {
  BACKGROUND_PROP,
  BORDER_PROP,
  DESC_PROP,
  DIGITAL_FORMAT_PROP,
  LEGEND_PROP,
  PIE_OTHER_PROP,
  POSITION_PROP,
  TITLE_PROP,
  CHART_BASE_INFO,
} from 'dw/control/common'

const analysisPieChartPie: any = {
  name: '饼图',
  type: 'analysis_pie_chart_pie',
  category: 'charts',
  group: [
    {
      id: 'data',
      name: '基本信息',
      // properties: [DATASET_PROP, DATASET_VAR_PROP, DATASET_DIM_PROP, BASE_PROP],
      properties: [CHART_BASE_INFO],
    },
    {
      id: 'dataSet',
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
