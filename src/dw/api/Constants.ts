import _ from 'lodash'
import * as i18n from './I18n'
// import * as eo from './EChartsOption'

export const defaultPageWidth = 1600
export const defaultPageHeight = 900
export const fixGrid = 5
// 文本编辑器宽高
export const defaultRichTextBoxW = 1080
export const defaultRichTextBoxH = 710

export const conditionList = [
  {
    label: i18n.msg('condition3'),
    value: 'large',
  },
  {
    label: i18n.msg('condition4'),
    value: 'less',
  },
  {
    label: i18n.msg('condition7'),
    value: 'between',
  },
  {
    label: i18n.msg('condition8'),
    value: 'equals',
  },
]

export const dashBoardList = [
  {
    label: i18n.msg('dashboard1'),
    value: '',
  },
  {
    label: i18n.msg('dashboard2'),
    value: 'dynamic',
  },
]
// export const weekendList = [
//   i18n.msg("Sunday"),
//   i18n.msg("Monday"),
//   i18n.msg("Tuesday"),
//   i18n.msg("Wednesday"),
//   i18n.msg("Thursday"),
//   i18n.msg("Friday"),
//   i18n.msg("Saturday"),
// ];

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

export function getUpdatedBorderStyleList() {
  BorderStyleList.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BorderStyleList
}

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

export const TYPE_TAB = {
  type: 'analysis_tab',
  defaultWidth: 600,
  defaultHeight: 400,
  name: i18n.msg('component67'),
  nameKey: 'component67',
}

export const TYPE_SUBTAB = {
  type: 'analysis_subtab',
  defaultWidth: 600,
  defaultHeight: 400,
  name: i18n.msg('component68'),
  nameKey: 'component68',
}

// 此组件未使用。启用此组件时，请删除该注释。
export const TYPE_CONTAINER = {
  type: 'analysis_container',
  defaultWidth: 600,
  defaultHeight: 400,
  name: i18n.msg('component69'),
  nameKey: 'component69',
}

export const TYPE_DoughnutComp = {
  type: 'analysis_pie_chart_doughnut',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component50'),
  nameKey: 'component50',
}

export const TYPE_PIE = {
  type: 'analysis_pie_chart_pie',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component51'),
  nameKey: 'component51',
}

export const TYPE_PIE_ROSE = {
  type: 'analysis_pie_chart_pie_rose',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component70'),
  nameKey: 'component70',
}

export const TYPE_PIE_RATE = {
  type: 'analysis_chart_pie_rate',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component73'),
  nameKey: 'component73',
}

export const TYPE_BAR = {
  type: 'analysis_bar_chart_bar',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component52'),
  nameKey: 'component52',
}

export const TYPE_AREATA_BAR = {
  type: 'analysis_bar_chart_bar_areata',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component53'),
  nameKey: 'component53',
}

export const TYPE_POLYLINE_STACK_BAR = {
  type: 'analysis_bar_chart_bar_polyline_stack',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component54'),
  nameKey: 'component54',
}

export const TYPE_POLYLINE_AREATA_BAR = {
  type: 'analysis_bar_chart_bar_polyline_areata',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component55'),
  nameKey: 'component55',
}

export const TYPE_AREATA_BAR_CHART = {
  type: 'analysis_bar_chart_areata_bar_chart',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component56'),
  nameKey: 'component56',
}

export const TYPE_STACK_BAR_CHART = {
  type: 'analysis_bar_chart_stack_bar_chart',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component57'),
  nameKey: 'component57',
}

export const TYPE_PERCENT_AREATA_BAR_CHART = {
  type: 'analysis_bar_chart_percent_areata_bar_chart',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component58'),
  nameKey: 'component58',
}

export const TYPE_PERCENT_AREATA_BAR = {
  type: 'analysis_bar_chart_percent_bar_areata',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component59'),
  nameKey: 'component59',
}

// 堆积面积图
export const TYPE_STACK_SQUARE = {
  type: 'analysis_line_chart_stack_square',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component60'),
  nameKey: 'component60',
}

export const TYPE_POLYLINE = {
  type: 'analysis_line_chart_polyline',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component61'),
  nameKey: 'component61',
}

export const TYPE_WATERFALL = {
  type: 'analysis_bar_chart_waterfall',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component62'),
  nameKey: 'component62',
}

// 漏斗图
export const TYPE_FUNNEL = {
  type: 'analysis_funnel_chart',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component69'),
  nameKey: 'component69',
}

export const TYPE_DATA_POINT = {
  type: 'analysis_data_point',
  defaultWidth: 200,
  defaultHeight: 200,
  name: i18n.msg('component64'),
  nameKey: 'component64',
}

export const TYPE_CHINAMAP = {
  type: 'analysis_chart_chinamap',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('map'),
  nameKey: 'map',
}

export const CONDITION = {
  type: 'analysis_data_point',
  defaultWidth: 500,
  defaultHeight: 320,
  name: i18n.msg('component64'),
  nameKey: 'component64',
}

export const TYPE_DASHBOARD = {
  type: 'analysis_dashboard',
  defaultWidth: 320,
  defaultHeight: 320,
  name: i18n.msg('dashboard'),
  nameKey: 'dashboard',
}

export const TYPE_IMAGE = {
  type: 'analysis_image',
  defaultWidth: 200,
  defaultHeight: 200,
  name: i18n.msg('image'),
  nameKey: 'image',
}

export const TYPE_DIMPARAM = {
  type: 'analysis_dimparam',
  defaultWidth: 445,
  defaultHeight: 320,
  name: i18n.msg('component71'),
  nameKey: 'component71',
}

// 分割线
export const TYPE_DIVIDED_LINE = {
  type: 'analysis_divided_line',
  defaultWidth: 50,
  defaultHeight: 50,
  name: i18n.msg('component72'),
  nameKey: 'component72',
}

export const TYPEARRAY = {
  analysis_text: TYPE_TEXT,
  analysis_time: TYPE_TIME,
  analysis_tab: TYPE_TAB,
  analysis_subtab: TYPE_SUBTAB, // 用于子页签
  analysis_component_table: TYPE_TABLE,
  analysis_pie_chart_doughnut: TYPE_DoughnutComp, // 环图
  analysis_pie_chart_pie: TYPE_PIE,
  analysis_bar_chart_bar: TYPE_BAR,
  analysis_bar_chart_bar_areata: TYPE_AREATA_BAR,
  analysis_bar_chart_bar_polyline_stack: TYPE_POLYLINE_STACK_BAR,
  analysis_bar_chart_bar_polyline_areata: TYPE_POLYLINE_AREATA_BAR,
  analysis_bar_chart_areata_bar_chart: TYPE_AREATA_BAR_CHART,
  analysis_bar_chart_stack_bar_chart: TYPE_STACK_BAR_CHART,
  analysis_bar_chart_percent_areata_bar_chart: TYPE_PERCENT_AREATA_BAR_CHART,
  analysis_bar_chart_percent_bar_areata: TYPE_PERCENT_AREATA_BAR,
  analysis_line_chart_stack_square: TYPE_STACK_SQUARE,
  analysis_line_chart_polyline: TYPE_POLYLINE,
  analysis_bar_chart_waterfall: TYPE_WATERFALL,
  analysis_data_point: TYPE_DATA_POINT,
  analysis_pie_chart_pie_rose: TYPE_PIE_ROSE,
  analysis_chart_pie_rate: TYPE_PIE_RATE,
  analysis_funnel_chart: TYPE_FUNNEL,
  analysis_chart_chinamap: TYPE_CHINAMAP,
  analysis_dashboard: TYPE_DASHBOARD,
  analysis_image: TYPE_IMAGE,
  analysis_dimparam: TYPE_DIMPARAM,
  analysis_divided_line: TYPE_DIVIDED_LINE,
}

export const modulesTree = [
  {
    title: i18n.msg('component1'),
    nodes: [
      {
        componentType: TYPE_DoughnutComp.type,
        componentImgName: TYPE_DoughnutComp.type,
        componentDesc: TYPE_DoughnutComp.name,
        componentDescId: TYPE_DoughnutComp.nameKey,
      },
      {
        componentType: TYPE_PIE.type,
        componentImgName: TYPE_PIE.type,
        componentDesc: TYPE_PIE.name,
        componentDescId: TYPE_PIE.nameKey,
      },
      {
        componentType: TYPE_PIE_ROSE.type,
        componentImgName: TYPE_PIE_ROSE.type,
        componentDesc: TYPE_PIE_ROSE.name,
        componentDescId: TYPE_PIE_ROSE.nameKey,
      },
      {
        componentType: TYPE_BAR.type,
        componentImgName: TYPE_BAR.type,
        componentDesc: TYPE_BAR.name,
        componentDescId: TYPE_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR.type,
        componentImgName: TYPE_AREATA_BAR.type,
        componentDesc: TYPE_AREATA_BAR.name,
        componentDescId: TYPE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_STACK_BAR.type,
        componentImgName: TYPE_POLYLINE_STACK_BAR.type,
        componentDesc: TYPE_POLYLINE_STACK_BAR.name,
        componentDescId: TYPE_POLYLINE_STACK_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_AREATA_BAR.type,
        componentImgName: TYPE_POLYLINE_AREATA_BAR.type,
        componentDesc: TYPE_POLYLINE_AREATA_BAR.name,
        componentDescId: TYPE_POLYLINE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR_CHART.type,
        componentImgName: TYPE_AREATA_BAR_CHART.type,
        componentDesc: TYPE_AREATA_BAR_CHART.name,
        componentDescId: TYPE_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_STACK_BAR_CHART.type,
        componentImgName: TYPE_STACK_BAR_CHART.type,
        componentDesc: TYPE_STACK_BAR_CHART.name,
        componentDescId: TYPE_STACK_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR_CHART.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_STACK_SQUARE.type,
        componentImgName: TYPE_STACK_SQUARE.type,
        componentDesc: TYPE_STACK_SQUARE.name,
        componentDescId: TYPE_STACK_SQUARE.nameKey,
      },
      {
        componentType: TYPE_POLYLINE.type,
        componentImgName: TYPE_POLYLINE.type,
        componentDesc: TYPE_POLYLINE.name,
        componentDescId: TYPE_POLYLINE.nameKey,
      },
      {
        componentType: TYPE_WATERFALL.type,
        componentImgName: TYPE_WATERFALL.type,
        componentDesc: TYPE_WATERFALL.name,
        componentDescId: TYPE_WATERFALL.nameKey,
      },
      {
        componentType: TYPE_FUNNEL.type,
        componentImgName: TYPE_FUNNEL.type,
        componentDesc: TYPE_FUNNEL.name,
        componentDescId: TYPE_FUNNEL.nameKey,
      },
      {
        componentType: TYPE_DASHBOARD.type,
        componentImgName: TYPE_DASHBOARD.type,
        componentDesc: TYPE_DASHBOARD.name,
        componentDescId: TYPE_DASHBOARD.nameKey,
      },
      {
        componentType: TYPE_TABLE.type,
        componentImgName: TYPE_TABLE.type,
        componentDesc: TYPE_TABLE.name,
        componentDescId: TYPE_TABLE.nameKey,
      },
      {
        componentType: TYPE_DATA_POINT.type,
        componentImgName: TYPE_DATA_POINT.type,
        componentDesc: TYPE_DATA_POINT.name,
        componentDescId: TYPE_DATA_POINT.nameKey,
      },
      {
        componentType: TYPE_TEXT.type,
        componentImgName: TYPE_TEXT.type,
        componentDesc: TYPE_TEXT.name,
        componentDescId: TYPE_TEXT.nameKey,
      },
      {
        componentType: TYPE_TAB.type,
        componentImgName: TYPE_TAB.type,
        componentDesc: TYPE_TAB.name,
        componentDescId: TYPE_TAB.nameKey,
      },
      {
        componentType: TYPE_CHINAMAP.type,
        componentImgName: TYPE_CHINAMAP.type,
        componentDesc: TYPE_CHINAMAP.name,
        componentDescId: TYPE_CHINAMAP.nameKey,
      },
      {
        componentType: TYPE_IMAGE.type,
        componentImgName: TYPE_IMAGE.type,
        componentDesc: TYPE_IMAGE.name,
        componentDescId: TYPE_IMAGE.nameKey,
      },
      {
        componentType: TYPE_DIMPARAM.type,
        componentImgName: TYPE_DIMPARAM.type,
        componentDesc: TYPE_DIMPARAM.name,
        componentDescId: TYPE_DIMPARAM.nameKey,
      },
      {
        componentType: TYPE_DIVIDED_LINE.type,
        componentImgName: TYPE_DIVIDED_LINE.type,
        componentDesc: TYPE_DIVIDED_LINE.name,
        componentDescId: TYPE_DIVIDED_LINE.nameKey,
      },

      // {
      //   componentType: TYPE_CONTAINER.type,
      //   componentImgName: TYPE_CONTAINER.type,
      //   componentDesc: TYPE_CONTAINER.name,
      // },
      {
        componentType: TYPE_TIME.type,
        componentImgName: TYPE_TIME.type,
        componentDesc: TYPE_TIME.name,
        componentDescId: TYPE_TIME.nameKey,
      },
    ],
  },
]

export const vslzModulesTree2Trans = [
  {
    title: i18n.msg('component1'),
    nodes: [
      {
        componentType: TYPE_DoughnutComp.type,
        componentImgName: TYPE_DoughnutComp.type,
        componentDesc: TYPE_DoughnutComp.name,
        componentDescId: TYPE_DoughnutComp.nameKey,
      },
      {
        componentType: TYPE_PIE.type,
        componentImgName: TYPE_PIE.type,
        componentDesc: TYPE_PIE.name,
        componentDescId: TYPE_PIE.nameKey,
      },
      {
        componentType: TYPE_PIE_ROSE.type,
        componentImgName: TYPE_PIE_ROSE.type,
        componentDesc: TYPE_PIE_ROSE.name,
        componentDescId: TYPE_PIE_ROSE.nameKey,
      },
      {
        componentType: TYPE_BAR.type,
        componentImgName: TYPE_BAR.type,
        componentDesc: TYPE_BAR.name,
        componentDescId: TYPE_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR.type,
        componentImgName: TYPE_AREATA_BAR.type,
        componentDesc: TYPE_AREATA_BAR.name,
        componentDescId: TYPE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_STACK_BAR.type,
        componentImgName: TYPE_POLYLINE_STACK_BAR.type,
        componentDesc: TYPE_POLYLINE_STACK_BAR.name,
        componentDescId: TYPE_POLYLINE_STACK_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_AREATA_BAR.type,
        componentImgName: TYPE_POLYLINE_AREATA_BAR.type,
        componentDesc: TYPE_POLYLINE_AREATA_BAR.name,
        componentDescId: TYPE_POLYLINE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR_CHART.type,
        componentImgName: TYPE_AREATA_BAR_CHART.type,
        componentDesc: TYPE_AREATA_BAR_CHART.name,
        componentDescId: TYPE_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_STACK_BAR_CHART.type,
        componentImgName: TYPE_STACK_BAR_CHART.type,
        componentDesc: TYPE_STACK_BAR_CHART.name,
        componentDescId: TYPE_STACK_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR_CHART.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_STACK_SQUARE.type,
        componentImgName: TYPE_STACK_SQUARE.type,
        componentDesc: TYPE_STACK_SQUARE.name,
        componentDescId: TYPE_STACK_SQUARE.nameKey,
      },
      {
        componentType: TYPE_POLYLINE.type,
        componentImgName: TYPE_POLYLINE.type,
        componentDesc: TYPE_POLYLINE.name,
        componentDescId: TYPE_POLYLINE.nameKey,
      },
      {
        componentType: TYPE_WATERFALL.type,
        componentImgName: TYPE_WATERFALL.type,
        componentDesc: TYPE_WATERFALL.name,
        componentDescId: TYPE_WATERFALL.nameKey,
      },
      {
        componentType: TYPE_FUNNEL.type,
        componentImgName: TYPE_FUNNEL.type,
        componentDesc: TYPE_FUNNEL.name,
        componentDescId: TYPE_FUNNEL.nameKey,
      },
    ],
  },
]

const type_doughnutcomp_img = require(`../../assets/img/${TYPE_DoughnutComp.type}.png`)
const type_pie_img = require(`../../assets/img/${TYPE_PIE.type}.png`)
const type_pie_rose_img = require(`../../assets/img/${TYPE_PIE_ROSE.type}.png`)
const type_bar_img = require(`../../assets/img/${TYPE_BAR.type}.png`)
const type_areata_bar_img = require(`../../assets/img/${TYPE_AREATA_BAR.type}.png`)
const type_polyline_stack_bar_img = require(`../../assets/img/${TYPE_POLYLINE_STACK_BAR.type}.png`)
const type_polyline_areata_bar_img = require(`../../assets/img/${TYPE_POLYLINE_AREATA_BAR.type}.png`)
const type_areata_bar_chart_img = require(`../../assets/img/${TYPE_AREATA_BAR_CHART.type}.png`)
const type_stack_bar_chart_img = require(`../../assets/img/${TYPE_STACK_BAR_CHART.type}.png`)
const type_percent_areata_bar_chart_img = require(`../../assets/img/${TYPE_PERCENT_AREATA_BAR_CHART.type}.png`)
const type_percent_areata_bar_img = require(`../../assets/img/${TYPE_PERCENT_AREATA_BAR.type}.png`)
const type_stack_square_img = require(`../../assets/img/${TYPE_STACK_SQUARE.type}.png`)
const type_polyline_img = require(`../../assets/img/${TYPE_POLYLINE.type}.png`)
const type_waterfall_img = require(`../../assets/img/${TYPE_WATERFALL.type}.png`)
const type_funnel_img = require(`../../assets/img/${TYPE_FUNNEL.type}.png`)
export const type2Img = {
  analysis_pie_chart_doughnut: type_doughnutcomp_img, // 环图
  analysis_pie_chart_pie: type_pie_img,
  analysis_pie_chart_pie_rose: type_pie_rose_img,
  analysis_bar_chart_bar: type_bar_img,
  analysis_bar_chart_bar_areata: type_areata_bar_img,
  analysis_bar_chart_bar_polyline_stack: type_polyline_stack_bar_img,
  analysis_bar_chart_bar_polyline_areata: type_polyline_areata_bar_img,
  analysis_bar_chart_areata_bar_chart: type_areata_bar_chart_img,
  analysis_bar_chart_stack_bar_chart: type_stack_bar_chart_img,
  analysis_bar_chart_percent_areata_bar_chart: type_percent_areata_bar_chart_img,
  analysis_bar_chart_percent_bar_areata: type_percent_areata_bar_img,
  analysis_line_chart_stack_square: type_stack_square_img,
  analysis_line_chart_polyline: type_polyline_img,
  analysis_bar_chart_waterfall: type_waterfall_img,
  analysis_funnel_chart: type_funnel_img,
}

export const type2DiffOpt = {
  analysis_pie_chart_doughnut: {
    columnarShow: false,
    brokenLineShow: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
    },
    xAxis: undefined,
    yAxis: undefined,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        startAngle: 0,
        label: {
          show: false,
          // @ts-ignore
          formatter: (a) => {
            return a.value
          },
          position: 'outside',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 100, name: '第一季度' },
          { value: 200, name: '第二季度' },
          { value: 300, name: '第三季度' },
          { value: 400, name: '第四季度' },
        ],
      },
    ],
  }, // 环图
  analysis_pie_chart_pie: {
    columnarShow: false,
    brokenLineShow: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
    },
    xAxis: undefined,
    yAxis: undefined,
    series: [
      {
        name: '',
        type: 'pie',
        radius: '70%',
        startAngle: 0,
        data: [
          { value: 100, name: '第一季度' },
          { value: 200, name: '第二季度' },
          { value: 300, name: '第三季度' },
          { value: 400, name: '第四季度' },
        ],
        label: {
          show: true,
          position: 'outside',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  },
  analysis_pie_chart_pie_rose: {
    columnarShow: false,
    brokenLineShow: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
    },
    xAxis: undefined,
    yAxis: undefined,
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['10%', '70%'],
        avoidLabelOverlap: false,
        startAngle: 0,
        label: {
          show: false,
          position: 'outside',
        },
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 100, name: '第一季度' },
          { value: 200, name: '第二季度' },
          { value: 300, name: '第三季度' },
          { value: 400, name: '第四季度' },
        ],
      },
    ],
  },
  analysis_bar_chart_bar: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        nameLocation: 'middle',
        nameGap: 30,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_bar_chart_bar_areata: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_bar_chart_bar_polyline_stack: {
    columnarShow: true,
    brokenLineShow: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
      {
        name: 'A板块',
        type: 'line',
        yAxisIndex: 1,
        emphasis: {
          focus: 'series',
        },
        data: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      },
    ],
  },
  analysis_bar_chart_bar_polyline_areata: {
    columnarShow: true,
    brokenLineShow: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
      {
        name: 'A板块',
        type: 'line',
        yAxisIndex: 1,
        emphasis: {
          focus: 'series',
        },
        data: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      },
    ],
  },
  analysis_bar_chart_areata_bar_chart: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    yAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    xAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_bar_chart_stack_bar_chart: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    yAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    xAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        stack: '1',
        data: [400, 500, 600, 700, 800, 900, 1000],
        emphasis: {
          focus: 'series',
        },
      },
    ],
  },
  analysis_bar_chart_percent_areata_bar_chart: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    yAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    xAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        stack: '1',
        data: [400, 500, 600, 700, 800, 900, 1000],
        emphasis: {
          focus: 'series',
        },
      },
    ],
  },
  analysis_bar_chart_percent_bar_areata: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'bar',
        stack: '1',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_line_chart_stack_square: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'line',
        stack: '1',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'line',
        stack: '1',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'line',
        stack: '1',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'line',
        stack: '1',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_line_chart_polyline: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      appendToBody: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'A部门',
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        data: [100, 200, 300, 400, 500, 600, 700],
      },
      {
        name: 'B部门',
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        data: [200, 300, 400, 500, 600, 700, 800],
      },
      {
        name: 'C部门',
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        data: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'D部门',
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  analysis_bar_chart_waterfall: {
    columnarShow: true,
    brokenLineShow: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 设置坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      appendToBody: true,
      // @ts-ignore
      formatter(params) {
        const tar = params[1]
        return `${tar.name} : ${tar.value}`
      },
    },
    xAxis: [
      {
        type: 'category',
        data: ['A部门', 'B部门', 'C部门', 'D部门', '总计'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            // 设置正常情况下柱子的样式
            barBorderColor: 'rgba(0,0,0,0)', // 设置柱子边框的颜色
            // barBorderColor: 'rgba(20,20,0,0.5)',
            barBorderWidth: 5, // 设置柱子边框的宽度
            color: 'rgba(0,0,0,0)', // 设置柱子的颜色
            // color: 'rgba(0,220,0,0.8)'
            label: {
              show: false,
            },
          },
          emphasis: {
            // 设置鼠标滑过时柱子的样式
            barBorderColor: 'rgba(0,0,0,0)', // 设置鼠标滑动到柱子边框的颜色
            barBorderWidth: 25, // 设置鼠标滑动到柱子边框的宽度
            color: 'rgba(0,0,0,0)', // 设置鼠标滑动到柱子的颜色
          },
        },
        data: [0, 1000, 2000, 3000, 0],
      },
      {
        name: '',
        type: 'bar', // 设置柱状图
        stack: '总量', // 设置堆积
        itemStyle: { normal: {} },
        data: [1000, 1000, 1000, 2000, 5000],
      },
    ],
  },
  analysis_funnel_chart: {
    columnarShow: false,
    brokenLineShow: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: '{a} <br/>{b} : {c}%',
    },
    xAxis: undefined,
    yAxis: undefined,
    series: [
      {
        name: '',
        type: 'funnel',
        left: '10%',
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: [
          { value: 100, name: 'A部门' },
          { value: 80, name: 'B部门' },
          { value: 60, name: 'C部门' },
          { value: 40, name: 'D部门' },
        ],
      },
    ],
  },
}

export const vslzModulesTree = [
  {
    title: i18n.msg('component1'),
    nodes: [
      {
        componentType: TYPE_DoughnutComp.type,
        componentImgName: TYPE_DoughnutComp.type,
        componentDesc: TYPE_DoughnutComp.name,
        componentDescId: TYPE_DoughnutComp.nameKey,
      },
      {
        componentType: TYPE_PIE.type,
        componentImgName: TYPE_PIE.type,
        componentDesc: TYPE_PIE.name,
        componentDescId: TYPE_PIE.nameKey,
      },
      {
        componentType: TYPE_PIE_ROSE.type,
        componentImgName: TYPE_PIE_ROSE.type,
        componentDesc: TYPE_PIE_ROSE.name,
        componentDescId: TYPE_PIE_ROSE.nameKey,
      },
      {
        componentType: TYPE_BAR.type,
        componentImgName: TYPE_BAR.type,
        componentDesc: TYPE_BAR.name,
        componentDescId: TYPE_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR.type,
        componentImgName: TYPE_AREATA_BAR.type,
        componentDesc: TYPE_AREATA_BAR.name,
        componentDescId: TYPE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_STACK_BAR.type,
        componentImgName: TYPE_POLYLINE_STACK_BAR.type,
        componentDesc: TYPE_POLYLINE_STACK_BAR.name,
        componentDescId: TYPE_POLYLINE_STACK_BAR.nameKey,
      },
      {
        componentType: TYPE_POLYLINE_AREATA_BAR.type,
        componentImgName: TYPE_POLYLINE_AREATA_BAR.type,
        componentDesc: TYPE_POLYLINE_AREATA_BAR.name,
        componentDescId: TYPE_POLYLINE_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_AREATA_BAR_CHART.type,
        componentImgName: TYPE_AREATA_BAR_CHART.type,
        componentDesc: TYPE_AREATA_BAR_CHART.name,
        componentDescId: TYPE_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_STACK_BAR_CHART.type,
        componentImgName: TYPE_STACK_BAR_CHART.type,
        componentDesc: TYPE_STACK_BAR_CHART.name,
        componentDescId: TYPE_STACK_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR_CHART.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR_CHART.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR_CHART.nameKey,
      },
      {
        componentType: TYPE_PERCENT_AREATA_BAR.type,
        componentImgName: TYPE_PERCENT_AREATA_BAR.type,
        componentDesc: TYPE_PERCENT_AREATA_BAR.name,
        componentDescId: TYPE_PERCENT_AREATA_BAR.nameKey,
      },
      {
        componentType: TYPE_STACK_SQUARE.type,
        componentImgName: TYPE_STACK_SQUARE.type,
        componentDesc: TYPE_STACK_SQUARE.name,
        componentDescId: TYPE_STACK_SQUARE.nameKey,
      },
      {
        componentType: TYPE_POLYLINE.type,
        componentImgName: TYPE_POLYLINE.type,
        componentDesc: TYPE_POLYLINE.name,
        componentDescId: TYPE_POLYLINE.nameKey,
      },
      {
        componentType: TYPE_WATERFALL.type,
        componentImgName: TYPE_WATERFALL.type,
        componentDesc: TYPE_WATERFALL.name,
        componentDescId: TYPE_WATERFALL.nameKey,
      },
      {
        componentType: TYPE_FUNNEL.type,
        componentImgName: TYPE_FUNNEL.type,
        componentDesc: TYPE_FUNNEL.name,
        componentDescId: TYPE_FUNNEL.nameKey,
      },
      {
        componentType: TYPE_DASHBOARD.type,
        componentImgName: TYPE_DASHBOARD.type,
        componentDesc: TYPE_DASHBOARD.name,
        componentDescId: TYPE_DASHBOARD.nameKey,
      },
      {
        componentType: TYPE_TABLE.type,
        componentImgName: TYPE_TABLE.type,
        componentDesc: TYPE_TABLE.name,
        componentDescId: TYPE_TABLE.nameKey,
      },
      {
        componentType: TYPE_DATA_POINT.type,
        componentImgName: TYPE_DATA_POINT.type,
        componentDesc: TYPE_DATA_POINT.name,
        componentDescId: TYPE_DATA_POINT.nameKey,
      },
      {
        componentType: TYPE_CHINAMAP.type,
        componentImgName: TYPE_CHINAMAP.type,
        componentDesc: TYPE_CHINAMAP.name,
        componentDescId: TYPE_CHINAMAP.nameKey,
      },
      {
        componentType: TYPE_DIMPARAM.type,
        componentImgName: TYPE_DIMPARAM.type,
        componentDesc: TYPE_DIMPARAM.name,
        componentDescId: TYPE_DIMPARAM.nameKey,
      },
      // {
      //   componentType: TYPE_CONTAINER.type,
      //   componentImgName: TYPE_CONTAINER.type,
      //   componentDesc: TYPE_CONTAINER.name,
      // },
      {
        componentType: TYPE_PIE_RATE.type,
        componentImgName: TYPE_PIE_RATE.type,
        componentDesc: TYPE_PIE_RATE.name,
        componentDescId: TYPE_PIE_RATE.nameKey,
      },
    ],
  },
]

export const gnrModulesTree = [
  {
    title: i18n.msg('component1'),
    nodes: [
      {
        componentType: TYPE_TEXT.type,
        componentImgName: TYPE_TEXT.type,
        componentDesc: TYPE_TEXT.name,
        componentDescId: TYPE_TEXT.nameKey,
      },
      {
        componentType: TYPE_TAB.type,
        componentImgName: TYPE_TAB.type,
        componentDesc: TYPE_TAB.name,
        componentDescId: TYPE_TAB.nameKey,
      },
      {
        componentType: TYPE_IMAGE.type,
        componentImgName: TYPE_IMAGE.type,
        componentDesc: TYPE_IMAGE.name,
        componentDescId: TYPE_IMAGE.nameKey,
      }, // {
      //   componentType: TYPE_DIMPARAM.type,
      //   componentImgName: TYPE_DIMPARAM.type,
      //   componentDesc: TYPE_DIMPARAM.name,
      // },
      {
        componentType: TYPE_DIVIDED_LINE.type,
        componentImgName: TYPE_DIVIDED_LINE.type,
        componentDesc: TYPE_DIVIDED_LINE.name,
        componentDescId: TYPE_DIVIDED_LINE.nameKey,
      },

      // {
      //   componentType: TYPE_CONTAINER.type,
      //   componentImgName: TYPE_CONTAINER.type,
      //   componentDesc: TYPE_CONTAINER.name,
      // },
      {
        componentType: TYPE_TIME.type,
        componentImgName: TYPE_TIME.type,
        componentDesc: TYPE_TIME.name,
        componentDescId: TYPE_TIME.nameKey,
      },
    ],
  },
]

/**
 * 后台传输给前端Vue
 */
export const PropsDataType = {
  DATA_HOME_INIT: 'DATA_HOME_INIT', // 首页组件初始化
  DATA_INIT: 'DATA_INIT', // 初始化
  DATA_SAVE: 'DATA_SAVE', // 保存
  DATA_PREVIEW: 'DATA_PREVIEW', // 预览
  DATA_PREVIEW_RESULT: 'DATA_PREVIEW_RESULT', // 预览（结果）
  DATA_PREVIEW_CLOSE: 'DATA_PREVIEW_CLOSE', // 关闭预览
  DATA_CLEAR: 'DATA_CLEAR', // 清理

  DATA_GETITEMID_RESULT: 'DATA_GETITEMID_RESULT', // 获取新的插件id

  DATA_VAR_REFRESH: 'DATA_VAR_REFRESH', // 刷新变量列表
  DATA_DS_REFRESH: 'DATA_DS_REFRESH', // 刷新数据集
  DATA_DS_FILTER_RESULT: 'DATA_DS_FILTER_RESULT', // 组件筛选器结果
  DATA_DS_F7_RESULT: 'DATA_DS_F7_RESULT', // 数据集F7弹窗结果
  EVENT_DIM_PARAM_F7_RESULT: 'EVENT_DIM_PARAM_F7_RESULT', // 维度F7弹窗结果

  DATA_DIM_F7_RESULT: 'DATA_DIM_F7_RESULT', // 维度F7弹窗结果

  DATA_MODULE_REFRESH: 'DATA_MODULE_REFRESH', // 刷新组件库
  DATA_MODULE_ADDITEM_RESULT: 'DATA_MODULE_ADDITEM_RESULT', // 添加组件（来源组件库）结果

  DATA_SELECTIMAGE_RESULT: 'DATA_SELECTIMAGE_RESULT', // 选择图片结果
  DATA_FULLSCREEN: 'DATA_FULLSCREEN', // 全屏

  DATA_THEME_INIT: 'DATA_THEME_INIT',
  DATA_THEME_SAVE: 'DATA_THEME_SAVE',
  DATA_THEME_PAGE_REFRESH_RESULT: 'DATA_THEME_PAGE_REFRESH_RESULT',

  DATA_ERROR: 'DATA_ERROR', // 错误页面
  DATA_ITEM_REFRESH_RESULT: 'DATA_ITEM_REFRESH_RESULT', // 单个组件刷新
  DATA_DATASET_FORMULA_RESULT: 'DATA_DATASET_FORMULA_RESULT',
  EVENT_INDIVIDUALIZED_SETTING_RWSULT: 'EVENT_INDIVIDUALIZED_SETTING_RWSULT', // 单个组件参数返回
  DATA_COPY_RESULT: 'DATA_COPY_RESULT', // 复制组件
  DATA_UNDO: 'DATA_UNDO', // 后退
  DATA_REDO: 'DATA_REDO', // 前景
}

/**
 * 前端Vue传输给后台
 */
export const CallBackType = {
  EVENT_SAVE: 'EVENT_SAVE', // 保存（上传至后台）
  EVENT_PREVIEW: 'EVENT_PREVIEW', // 预览（上传至后台）
  EVENT_PREVIEW2: 'EVENT_PREVIEW2', // 预览2(无需选择维度)
  EVENT_DOSEARCH: 'EVENT_DOSEARCH', // 参数球查询
  EVENT_GETITEMID: 'EVENT_GETITEMID', // 获取新的插件id

  EVENT_VAR_ADD: 'EVENT_VAR_ADD', // 添加变量
  EVENT_VAR_DELETE: 'EVENT_VAR_DELETE', // 删除变量
  EVENT_VAR_EDIT: 'EVENT_VAR_EDIT', // 编辑变量

  EVENT_DS_ADD: 'EVENT_DS_ADD', // 添加数据集
  EVENT_DS_DELETE: 'EVENT_DS_DELETE', // 删除数据集
  EVENT_DS_EDIT: 'EVENT_DS_EDIT', // 编辑数据集
  EVENT_DS_COLUMNS: 'EVENT_DS_COLUMNS', // 获取数据集列信息
  EVENT_DS_F7: 'EVENT_DS_F7', // 数据集F7弹窗
  EVENT_DS_FILTER: 'EVENT_DS_FILTER', // 弹出组件刷选器

  EVENT_DIM_F7: 'EVENT_DIM_F7', // 维度F7弹窗
  EVENT_DIM_PARAM_F7: 'EVENT_DIM_PARAM_F7', // 分析参数面板维度F7弹窗

  EVENT_MODULE_SAVE: 'EVENT_MODULE_SAVE', // 组件库保存
  EVENT_MODULE_ADDITEM: 'EVENT_MODULE_ADDITEM', // 添加组件（来源组件库）

  EVENT_SELECTIMAGE: 'EVENT_SELECTIMAGE', // 选择图片结果

  EVENT_THEME_INIT: 'EVENT_THEME_INIT',
  EVENT_THEME_SAVE: 'EVENT_THEME_SAVE',

  EVENT_MYANALYSIS: 'EVENT_MYANALYSIS',
  EVENT_ITEM_REFRESH: 'EVENT_ITEM_REFRESH', // 单个组件刷新
  EVENT_ITEM_REFRESHANDSAVE: 'EVENT_ITEM_REFRESHANDSAVE', // 单个组件刷新
  EVENT_ITEM_DRILLING: 'EVENT_ITEM_DRILLING', // 单个组件数据钻取
  EVENT_ITEM_LINKAGE: 'EVENT_ITEM_LINKAGE', // 组件联动
  EVENT_DATASET_VIEW: 'EVENT_DATASET_VIEW', // 数据集预览
  EVENT_DATASET_FORMULA: 'EVENT_DATASET_FORMULA',
  EVENT_INDIVIDUALIZED_SETTING: 'EVENT_INDIVIDUALIZED_SETTING', // 个性化设置
  DATA_THEME_PAGE_REFRESH: 'DATA_THEME_PAGE_REFRESH',
  EVENT_COPY: 'EVENT_COPY', // 复制组件
}

export const ComponentsTypePrefix = {
  PIE: 'analysis_pie',
  BAR: 'analysis_bar',
  LINE: 'analysis_line',
  FUNNEL: 'analysis_funnel_chart',
}

/**
 * 是否可以反转XY轴
 */
export const SwitchXYAxisRequired = [
  TYPE_BAR.type,
  TYPE_AREATA_BAR.type,
  TYPE_AREATA_BAR_CHART.type,
  TYPE_STACK_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR.type,
]

/**
 * 是否需要支持辅助Y轴
 */
export const YAxisSupportLineRequired = [
  TYPE_POLYLINE_STACK_BAR.type,
  TYPE_POLYLINE_AREATA_BAR.type,
  TYPE_POLYLINE.type,
]

/**
 * 默认XY轴是翻转的
 */
export const DefaultReverseXY = [
  TYPE_AREATA_BAR_CHART.type,
  TYPE_STACK_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR_CHART.type,
]

/**
 *  不包括折线图的其他系列图：折线堆积、折线簇状
 */
export const WithoutLineChartRequired = [TYPE_POLYLINE_STACK_BAR.type, TYPE_POLYLINE_AREATA_BAR.type]

/**
 *  百分比堆积条形，柱形
 */
export const Percentagegraph = [TYPE_PERCENT_AREATA_BAR_CHART.type, TYPE_PERCENT_AREATA_BAR.type]

/**
 * 不支持小型序列图
 */
export const DontSupSmallSeries = [TYPE_WATERFALL.type]
/**
 * 不支持图例
 */
export const DontSupLegend = [TYPE_WATERFALL.type]

export const DontSupLegendSort = [TYPE_POLYLINE.type, TYPE_STACK_SQUARE.type]

/**
 * 默认不不显示数据集筛选器（不支持多行）
 */
export const DefaultHideDSFilter = [TYPE_DATA_POINT.type, TYPE_PIE_RATE.type]

/**
 * 默认不不显示组件批注
 */
export const DefaultHideDesp = [TYPE_SUBTAB.type, TYPE_DIVIDED_LINE.type]

// 存在辅助Y轴的组件
export const SetYAxisNameRotateArr = [TYPE_POLYLINE_AREATA_BAR.type, TYPE_POLYLINE_STACK_BAR.type]
// 需要添加左侧宽度的组件，例如条形图
export const AddLeftWidthArr = [
  TYPE_STACK_BAR_CHART.type,
  TYPE_AREATA_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR_CHART.type,
]
// 允许联动的echarts组件
export const AllowCompLinkageCompArr = [
  TYPE_PIE.type,
  TYPE_DoughnutComp.type,
  TYPE_PIE_ROSE.type,
  TYPE_BAR.type,
  TYPE_AREATA_BAR.type,
  TYPE_POLYLINE_STACK_BAR.type,
  TYPE_POLYLINE_AREATA_BAR.type,
  TYPE_AREATA_BAR_CHART.type,
  TYPE_STACK_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR.type,
  TYPE_STACK_SQUARE.type,
  TYPE_POLYLINE.type,
  TYPE_FUNNEL.type,
  TYPE_WATERFALL.type,
  TYPE_CONTAINER.type,
]
// 允许缩放的echarts组件
export const AllowDataAreaZoomCompArr = [
  TYPE_BAR.type,
  TYPE_AREATA_BAR.type,
  TYPE_POLYLINE_STACK_BAR.type,
  TYPE_POLYLINE_AREATA_BAR.type,
  TYPE_AREATA_BAR_CHART.type,
  TYPE_STACK_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR_CHART.type,
  TYPE_PERCENT_AREATA_BAR.type,
  TYPE_STACK_SQUARE.type,
  TYPE_POLYLINE.type,
  TYPE_WATERFALL.type,
]

// 数据集列类型
export const DataSet = {
  ColumnType: {
    DIM: '1', // 列字段类型：维度
    MONEY: '2', // 列字段类型：数值
  },
}

// 变量类型
export const variableType = {
  Text: 1,
  Number: 2,
  Date: 3,
  Dim: 4,
  Enum: 5,
}

// CallBackType/PropsDataType中PrimaryKey功能
export const PrimaryKey = {
  DIMF7: {
    QueryComp: 'queryComp',
    VariableF7: 'variableF7',
    DimF7: 'dimF7',
  },
  PREVIEW: {
    QueryComp: 'queryComp',
    Normal: 'normal',
  },
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

export function getUpdatedDigitalTypes() {
  DigitalTypes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return DigitalTypes
}

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

export function getUpdatedFunnelLabelPosition() {
  FunnelLabelPosition.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return FunnelLabelPosition
}

export const DataDisplayModes = [
  {
    label: i18n.msg('geographyAndData'),
    labelId: 'geographyAndData',
    value: 0,
  },
  {
    label: i18n.msg('geography'),
    labelId: 'geography',
    value: 1,
  },
  {
    label: i18n.msg('design7'),
    labelId: 'design7',
    value: 2,
  },
]

export function getUpdatedDataDisplayModes() {
  DataDisplayModes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return DataDisplayModes
}

export const MapDisplayMode = [
  {
    label: i18n.msg('hotMap'),
    labelId: 'hotMap',
    value: 0,
  },
  {
    label: i18n.msg('scatterMap'),
    labelId: 'scatterMap',
    value: 1,
  },
]
export function getUpdatedMapDisplayMode() {
  MapDisplayMode.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return MapDisplayMode
}

/**
 * 柱状图数据标签位置
 */
export const BarChartVerticalDataPositions = [
  {
    label: i18n.msg('center'),
    labelId: 'center',
    value: 'inside',
  },
  {
    label: i18n.msg('inside'),
    labelId: 'inside',
    value: 'insideTop',
  },
  {
    label: i18n.msg('outside'),
    labelId: 'outside',
    value: 'outside',
  },
  {
    label: i18n.msg('xaisInner'),
    labelId: 'xaisInner',
    value: 'insideBottom',
  },
]

export function getUpdatedBarChartVerticalDataPositions() {
  BarChartVerticalDataPositions.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartVerticalDataPositions
}

export const BarChartHorizonDataPositions = [
  {
    label: i18n.msg('center'),
    labelId: 'center',
    value: 'inside',
  },
  {
    label: i18n.msg('inside'),
    labelId: 'inside',
    value: 'insideRight',
  },
  {
    label: i18n.msg('outside'),
    labelId: 'outside',
    value: 'outside',
  },
  {
    label: i18n.msg('xaisInner'),
    labelId: 'xaisInner',
    value: 'insideLeft',
  },
]

export function getUpdatedBarChartHorizonDataPositions() {
  BarChartHorizonDataPositions.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartHorizonDataPositions
}

export const LineChartDataPositions = [
  {
    label: i18n.msg('center'),
    labelId: 'center',
    value: 'inside',
  },
  {
    label: i18n.msg('top'),
    labelId: 'top',
    value: 'top',
  },
  {
    label: i18n.msg('bottom'),
    labelId: 'bottom',
    value: 'bottom',
  },
  {
    label: i18n.msg('left'),
    labelId: 'left',
    value: 'left',
  },
  {
    label: i18n.msg('right'),
    labelId: 'right',
    value: 'right',
  },
]

export function getUpdatedLineChartDataPositions() {
  LineChartDataPositions.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return LineChartDataPositions
}
export const LineAreaChartDataPositions = [
  {
    label: i18n.msg('top'),
    labelId: 'top',
    value: 'top',
  },
  {
    label: i18n.msg('bottom'),
    labelId: 'bottom',
    value: 'bottom',
  },
]

export function getUpdatedLineAreaChartDataPositions() {
  LineAreaChartDataPositions.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return LineAreaChartDataPositions
}

/**
 * 瀑布图数据标签位置都在外部，这里仅作为文字垂直水平的标示
 */
export const WaterfallChartDataPositions = [
  {
    label: i18n.msg('horizon'),
    labelId: 'horizon',
    value: 'top',
  },
  {
    label: i18n.msg('vertical'),
    labelId: 'vertical',
    value: 'outside',
  },
]

export function getUpdatedWaterfallChartDataPositions() {
  WaterfallChartDataPositions.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return WaterfallChartDataPositions
}

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

export function getUpdatedBarChartPieDataLabelTypes() {
  BarChartPieDataLabelTypes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartPieDataLabelTypes
}

export const BarChartPercentageMapDataLabelTypes = [
  {
    label: i18n.msg('total'),
    labelId: 'total',
    value: 'default',
  },
  {
    label: i18n.msg('classificationTotal'),
    labelId: 'classificationTotal',
    value: 'classificationtotal',
  },
]

export function getUpdatedBarChartPercentageMapDataLabelTypes() {
  BarChartPercentageMapDataLabelTypes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartPercentageMapDataLabelTypes
}

export const BarChartDataLabelTypes = [
  {
    label: i18n.msg('dataValue'),
    labelId: 'dataValue',
    value: 'default',
  },
  {
    label: i18n.msg('classificationDatavalue'),
    labelId: 'classificationDatavalue',
    value: 'classificationdatavalue',
  },
]

export function getUpdatedBarChartDataLabelTypes() {
  BarChartDataLabelTypes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartDataLabelTypes
}

export const BarChartFunnulDataLabelTypes = [
  {
    label: i18n.msg('comPercentage'),
    labelId: 'comPercentage',
    value: 'default',
  },
  {
    label: i18n.msg('dataValue'),
    labelId: 'dataValue',
    value: 'datavalue',
  },
  {
    label: i18n.msg('classificationComPercentage'),
    labelId: 'classificationComPercentage',
    value: 'classificationComPercentage',
  },
  {
    label: i18n.msg('classificationDatavalue'),
    labelId: 'classificationDatavalue',
    value: 'classificationDatavalue',
  },
  {
    label: i18n.msg('datavalueComPercentage'),
    labelId: 'datavalueComPercentage',
    value: 'datavalueComPercentage',
  },
]

export function getUpdatedBarChartFunnulDataLabelTypes() {
  BarChartFunnulDataLabelTypes.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return BarChartFunnulDataLabelTypes
}

export const BarChartDataPositionNames = {
  Inside: 'insideTop',
  Outside: 'outside',
  Center: 'inside',
  AxisInside: 'insideBottom',
}

// 推送后台时，customEvent间隔时间，否则请求会被合并为一个请求
export const CustomEventIntervalTime = 50

// 左上坐标
export const TOPLEFT = {
  left: '20px',
  position: 'absolute',
  float: 'left',
  top: '70px',
}

// 数据点左上坐标
export const DATA_POINT_TOPLEFT = {
  left: '10px',
  position: 'absolute',
  float: 'left',
  top: '40px',
}

// 右上坐标
export const TOPRIGHT = {
  right: '20px',
  position: 'absolute',
  float: 'right',
  top: '70px',
}

// 数据点右上坐标
export const DATA_POINT_TOPRIGHT = {
  right: '10px',
  position: 'absolute',
  float: 'right',
  top: '40px',
}

// 左下坐标
export const BOTTOMLEFT = {
  left: '20px',
  position: 'absolute',
  float: 'left',
  bottom: '5px',
}

// 数据点左下坐标
export const DATA_POINT_BOTTOMLEFT = {
  left: '10px',
  position: 'absolute',
  float: 'left',
  bottom: '5px',
}

// 右下坐标
export const BOTTOMRIGHT = {
  right: '20px',
  position: 'absolute',
  float: 'right',
  bottom: '5px',
}

// 数据点右下坐标
export const DATA_POINT_BOTTOMRIGHT = {
  right: '10px',
  position: 'absolute',
  float: 'right',
  bottom: '5px',
}

export const sortList = [
  {
    label: i18n.msg('defaultSort'),
    value: '',
  },
  {
    label: i18n.msg('nameAsc'),
    value: 'nameAsc',
  },
  {
    label: i18n.msg('nameDesc'),
    value: 'nameDesc',
  },
  {
    label: i18n.msg('moneyAsc'),
    value: 'moneyAsc',
  },
  {
    label: i18n.msg('moneyDesc'),
    value: 'moneyDesc',
  },
  {
    label: i18n.msg('custom'),
    value: 'custom',
  },
]

export const openStyleList = [
  {
    label: i18n.msg('newTab'),
    value: '',
  },
  {
    label: i18n.msg('newWindows'),
    value: 'newWindows',
  },
]

export const dataDrillingDownTypeList = [
  {
    label: i18n.msg('datadrilling_1'),
    value: '1',
  },
]

export const dimPtdsStyleList = [
  {
    label: i18n.msg('top'),
    value: '',
  },
  {
    label: i18n.msg('left'),
    value: '1',
  },
]

export const tableSortList = [
  {
    label: i18n.msg('asc'),
    value: 'asc',
  },
  {
    label: i18n.msg('desc'),
    value: 'desc',
  },
  {
    label: i18n.msg('custom'),
    value: 'custom',
  },
]

export const defaultAxisValue = {
  min: 0,
  max: 0,
  enabled: false,
}

export const compute = {
  col_type: '3',
  id: 'Compute',
  member: '',
  name: i18n.msg('formulaColumn'),
  number: 'Compute',
  type: 'DMC',
}

export const digitalFormat = {
  enable: true,
  data: '10000000.1234',
  prefix: '',
  suffix: '',
  digitalType: 'digital',
  dataLabelType: 'default',
  currencySymbols: '¥',
  decimalPlace: 2,
  enableThousands: true,
  unit: 1,
  unitarea: 1,
}

// 不需要打开数据选择区域的组件
export const unOpenDataSelectAreaComps = [
  TYPE_TEXT.type,
  TYPE_TAB.type,
  TYPE_SUBTAB.type,
  CONDITION.type,
  TYPE_TABLE.type,
  TYPE_DASHBOARD.type,
  TYPE_IMAGE.type,
]

// 边缘尺的默认参数
export const ruler = {
  scale: 1,
  startX: 0,
  startY: 0,
  lines: {
    h: [],
    v: [],
  },
  thick: 20,
  lang: 'zh-CN',
  isShowRuler: true,
  isShowReferLine: true,
  height: window.innerHeight,
  width: window.innerWidth,
  shadow: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

export const dataPointDataset = {
  id: null,
  name: '',
  detail: [],
}

export const tableDataset = {
  id: null,
  name: '',
  detail: [],
  var: [],
  filter: [],
  request: {
    TableColumns: [],
  },
}

export const chartDataset = {
  id: null,
  name: '',
  detail: [],
  var: [],
  filter: [],
  request: {
    legendNumber: '',
    displayValueNumber: '',
    legendDetailNumber: '',
    sortSelectX: '',
    sortSelectY: '',
  },
}

export const defaultProps = {
  children: 'children',
  label: 'name',
}

// 控制右侧设置界面显示 几个页签
export const configTabItemVisible = [{ visible: true }, { visible: false }, { visible: false }]

export const devTabsArray = {
  tabs: [
    {
      number: 'EntityTest',
      name: '第一页组织1',
      id: '13715541473499146001',
      data_init: {
        gbVarList: [],
        moduleList: [],
        itemList: [],
        localDatasetList: [],
        pageConfig: {},
        queryConfig: {},
        localVarList: [],
        gbDatasetList: [],
        dimList: [],
        i18n: {
          lang: 'zh-CN',
        },
      },
    },
    {
      number: 'AccountTest',
      name: '第二页科目2',
      id: '13715541473499146002',
    },
    {
      number: 'CurrencyTest',
      name: '第三页币别3',
      id: '13715541473499146003',
    },
    {
      number: 'AuditTrailTest',
      name: '第四页审计线索4',
      id: '13715541473499146004',
    },
  ],
  selected: {},
}

export const initTabsArray = { tabs: [], selected: {} }

export const desp = {
  show: false,
  content: '',
}

const chineseMonthToEnglishMonth = {
  '1月': 'Jan',
  '2月': 'Feb',
  '3月': 'Mar',
  '4月': 'Apr',
  '5月': 'May',
  '6月': 'Jun',
  '7月': 'Jul',
  '8月': 'Aug',
  '9月': 'Sep',
  '10月': 'Oct',
  '11月': 'Nov',
  '12月': 'Dec',
}

export function getSelectMonth(selectMonthList: any) {
  const selectedMonths = []

  // 遍历传入的月份列表
  // eslint-disable-next-line no-restricted-syntax
  for (const selectMonth of selectMonthList) {
    // 使用中文月份作为键从映射中获取对应的英文缩写
    // @ts-ignore
    const monthName = i18n.msg(chineseMonthToEnglishMonth[selectMonth])
    // 如果存在映射，则将英文缩写添加到结果数组中
    if (monthName) {
      selectedMonths.push(monthName)
    }
  }

  return selectedMonths
}
