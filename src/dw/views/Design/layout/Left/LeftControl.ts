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
  CHART_DARA_SET,

  // 文本
  BASE_PROP,
} from 'dw/control/common'

const echartControls: any = {
  group: [
    {
      id: 'data',
      name: '属性',
      properties: [
        CHART_BASE_INFO,
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
    {
      id: 'dataSet',
      name: '数据配置',
      properties: [CHART_DARA_SET],
    },
  ],
}

const textControls: any = {
  group: [
    {
      id: 'data',
      name: '数据',
      properties: [BASE_PROP],
    },
    {
      id: 'format',
      name: '格式',
      properties: [
        {
          id: 'text',
          name: '文本设置',
          defaultOpen: true,
          order: 0,
          nodes: [
            {
              visible: true,
              id: 'content.config.fontSize',
              name: '字号',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 14,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'content.config.color',
              name: '字体颜色',
              editor: {
                component: 'ColorPicker',
                dataType: 'string',
                defaultValue: '#000',
              },
            },
            {
              visible: true,
              id: 'content.config.textAlign',
              name: '水平方向',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 14,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'content.config.fontStyle',
              name: '样式',
              editor: {
                component: 'Select',
                options: [
                  { value: 'fontWeight', name: 'bold-solid' },
                  { value: 'fontStyle', name: 'oblique-solid' },
                  { value: 'textDecoration', name: 'underline-solid' },
                ],
                defaultValue: '',
              },
            },
          ],
        },
        BACKGROUND_PROP,
        BORDER_PROP,
        DESC_PROP,
        {
          id: 'position',
          name: '尺寸和位置',
          defaultOpen: true,
          nodes: [
            {
              visible: true,
              id: 'x',
              name: '水平方向',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 10,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'y',
              name: '垂直方向',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 10,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'h',
              name: '高度',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 120,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'w',
              name: '宽度',
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 500,
                type: 'embed',
              },
            },
          ],
        },
      ],
    },
  ],
}

const tableControls: any = {
  group: [
    {
      id: 'data',
      name: '数据',
      properties: [
        {
          defaultOpen: true,
          id: 'base',
          name: '属性',
          nodes: [
            { visible: true, id: 'pluginname', name: '插件名称', addonAfterBtn: 2, editor: { component: 'Input' } },
          ],
        },
        TITLE_PROP,
        BACKGROUND_PROP,
        BORDER_PROP,
        DESC_PROP,
        POSITION_PROP,
      ],
    },
  ],
}

export const ComponentControlMap: any = {
  charts: echartControls,
  text: textControls,
  table: tableControls,
}

export const chartList = [
  {
    componentType: 'pie',
    icon: require(`assets/img/analysis_pie_chart_pie.png`),
    desc: '饼图',
    name: '饼图',
    category: 'charts',
  },
  {
    componentType: 'bar',
    icon: require(`assets/img/analysis_bar_chart_bar_areata.png`),
    desc: '柱状图',
    name: '柱状图',
    category: 'charts',
  },
  {
    componentType: 'line',
    icon: require(`assets/img/analysis_line_chart_polyline.png`),
    desc: '折线图',
    name: '折线图',
    category: 'charts',
  },
]

export const otherComp = [
  {
    componentType: 'text',
    icon: require(`assets/img/analysis_text.png`),
    desc: '文字',
    name: '文字',
    category: 'text',
  },
  {
    componentType: 'table',
    icon: require(`assets/img/analysis_component_table.png`),
    desc: '表格',
    name: '表格',
    category: 'table',
  },
]
