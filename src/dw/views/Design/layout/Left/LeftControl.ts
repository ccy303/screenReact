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
  CHART_DARA_SET
} from 'dw/control/common'

const echartControls: any = {
  group: [
    {
      id: 'data',
      name: '基本信息',
      properties: [CHART_BASE_INFO],
    },
    {
      id: 'dataSet',
      name: '数据配置',
      properties: [CHART_DARA_SET],
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

export const ComponentControlMap: any = {
  charts: echartControls,
}

export const chartList = [
  {
    componentType: 'pie',
    icon: require(`assets/img/analysis_pie_chart_pie.png`),
    desc: '饼图',
    name: '饼图',
    category: 'charts',
  },
  // {
  //   componentType: 'analysis_line_chart_polyline',
  //   componentImgName: 'analysis_line_chart_polyline',
  //   componentDesc: '折线图',
  //   componentDescId: '折线图',
  // },
  // {
  //   componentType: 'analysis_bar_chart_bar_areata',
  //   componentImgName: 'analysis_bar_chart_bar_areata',
  //   componentDesc: '柱状图',
  //   componentDescId: '柱状图',
  // },
]
