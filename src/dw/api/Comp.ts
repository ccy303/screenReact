/**
 * 组件默认配置参数
 */
// @ts-nocheck
import $_ from 'lodash'
import * as comm from './Common'
import * as constants from './Constants'
import * as i18n from './I18n'

export const child = {
  c: {
    fontSize: 16,
    color: '#000000',
    align: 'center',
    valign: 'c',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: 'none',
    width: 0,
    height: 0,
    config: {
      dataPoint: {
        data: '10000000.1234',
        prefix: '',
        suffix: '',
        digitalType: 'digital',
        currencySymbols: '¥',
        decimalPlace: 2,
        enableThousands: true,
        unit: 1,
        unitarea: 1,
        valueFirst: 100,
        valueSecond: 200,
        conditionSelect: 'less',
        color: '',
        conditions: [
          {
            type: 'defaultCdn',
            valueFirst: 100,
            valueSecond: 200,
            conditionSelect: 'less',
            color: '',
          },
        ],
      },
    },
  },
}

function addTextItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_TEXT.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    fontSize: 16,
    color: '#000000',
    bkColor: 'rgba(255,255,255, 1)',
    align: 'left',
    valign: 'c',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: 'none',
    canModify: false,
    width: 0,
    height: 0,
    opacity: 1,
    showBack: true,
    borderOpacity: 1,
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    borderColor: 'rgba(255,255,255, 1)',
    visibles: [true, false, true],
    desp: $_.cloneDeep(constants.desp),
  }
  return {
    type: constants.TYPE_TEXT.type,
    id,
    pid,
    name: i18n.msg('component65') + comm.getCompCount(),
    title: i18n.msg('c53'),
    tag: 'el-text',
    active: true,
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_TEXT.defaultWidth,
    h: constants.TYPE_TEXT.defaultHeight,
    c: defaultConfig,
  }
}

function addTimeItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_TIME.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    fontSize: 16,
    color: '#000000',
    bkColor: 'rgba(255,255,255, 1)',
    align: 'l',
    valign: 'c',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: 'none',
    canModify: false,
    width: 0,
    height: 0,
    opacity: 1,
    showBack: true,
    visibles: [true, false, true],
    format: 'yyyy.MM.dd hh:mm:ss w',
    borderOpacity: 1,
    formatRadio: 1,
    borderStyle: 'dotted',
    borderWidth: '0',
    showBorder: true,
    borderColor: 'rgba(255,255,255, 1)',
    desp: $_.cloneDeep(constants.desp),
  }
  return {
    type: constants.TYPE_TIME.type,
    id,
    pid,
    name: i18n.msg('component66') + comm.getCompCount(),
    title: i18n.msg('c53'),
    tag: 'el-text',
    active: true,
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_TIME.defaultWidth,
    h: constants.TYPE_TIME.defaultHeight,
    c: defaultConfig,
  }
}

function addDataPointItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_DATA_POINT.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    fontSize: 16,
    color: '#000000',
    bkColor: 'rgba(255,255,255, 1)',
    align: 'center',
    valign: 'c',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: 'none',
    canModify: false,
    width: 0,
    height: 0,
    opacity: 1,
    showBack: true,
    borderOpacity: 1,
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    borderColor: 'rgba(255,255,255, 1)',
    visibles: [true, false, true],
    title: {
      fontSize: '18',
      fontStyle: 'normal',
      fontWeight: 'normal',
      underline: 'none',
      foreColor: '#2a2a2a',
      backColor: '#fff',
      show: true,
      align: 'center',
    },
    desp: $_.cloneDeep(constants.desp),
    config: {
      dataPoint: {
        data: '10000000.1234',
        prefix: '',
        suffix: '',
        digitalType: 'digital',
        currencySymbols: '¥',
        decimalPlace: 2,
        enableThousands: true,
        unit: 1,
        unitarea: 1,
        valueFirst: 100,
        valueSecond: 200,
        conditionSelect: 'less',
        conditions: [
          {
            type: 'defaultCdn',
            valueFirst: 100,
            valueSecond: 200,
            conditionSelect: 'less',
            color: '',
          },
        ],
        color: '',
        child: { ...child },
      },
    },
  }
  return {
    type: constants.TYPE_DATA_POINT.type,
    id,
    pid,
    name: i18n.msg('component64') + comm.getCompCount(),
    title: i18n.msg('c60'),
    tag: 'el-text',
    active: true,
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_DATA_POINT.defaultWidth,
    h: constants.TYPE_DATA_POINT.defaultHeight,
    c: defaultConfig,
    dataset: {
      id: null,
      name: '',
      detail: [],
    },
  }
}

function addTabItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_TAB.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    currTabId: '',
    showTab: true,
    showBack: true,
    bkColor: 'rgba(255,255,255, 1)',
    opacity: 1,
    borderOpacity: 1,
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    borderColor: 'rgba(255,255,255, 1)',
    visibles: [true, false, true],
    title: {
      fontSize: '18',
      fontStyle: 'normal',
      fontWeight: 'normal',
      underline: 'none',
      foreColor: '#2a2a2a',
      backColor: '#fff',
      show: false,
      align: 'center',
    },
    desp: $_.cloneDeep(constants.desp),
  }
  const defaultStyle = {
    'align-items': 'center',
  }
  return {
    type: constants.TYPE_TAB.type,
    id,
    pid,
    name: i18n.msg('component67') + comm.getCompCount(),
    title: i18n.msg('c60'),
    tag: 'el-tab-pane',
    active: true,
    // 'value':'',
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_TAB.defaultWidth,
    h: constants.TYPE_TAB.defaultHeight,
    s: defaultStyle,
    c: defaultConfig,
  }
}

function addSubTabItem(itemId, pid) {
  return {
    type: constants.TYPE_SUBTAB.type,
    id: itemId,
    pid,
    name: i18n.msg('component68') + comm.getCompCount(),
    active: true,
    c: {
      showSubtab: true,
      visibles: [false, false, true],
    },
  }
}

function addTableItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_TABLE.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    tableModel: {
      tabDims: '',
      header: null,
      tabs: null,
      datas: null,
      show: true,
      edit: false,
      add: true,
      relationId: [],
      relationName: [],
      isScroll: true,
      row: {
        height: 44,
        align: 'center',
        fontStyle: 'normal',
        foreColor: '#000000',
        backColorH: '#0398dd',
        backColorB: '#f3f3f3',
        fontWeight: 'normal',
        underline: 'normal',
        fontSize: '14.4',
        enableVG: true,
        enableVGC: '#dddddd',
        enableVGW: 1,
        enableHG: true,
        enableHGC: '#dddddd',
        enableHGW: 1,
      },
      total: {
        name: i18n.msg('c70'),
        show: false,
      },
    },
    showBack: true,
    bkColor: 'rgba(255,255,255, 1)',
    opacity: 1,
    borderOpacity: 1,
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    borderColor: 'rgba(255,255,255, 1)',
    visibles: [true, true, true],
    title: {
      fontSize: '18',
      fontStyle: 'normal',
      fontWeight: 'normal',
      underline: 'none',
      foreColor: '#2a2a2a',
      backColor: '#fff',
      show: true,
      align: 'center',
    },
    desp: $_.cloneDeep(constants.desp),
    digitalFormat: {
      data: '0',
      prefix: '',
      suffix: '',
      digitalType: 'digital',
      currencySymbols: '¥',
      decimalPlace: 2,
      enableThousands: false,
      unit: 1,
      align: 'center',
    },
  }
  return {
    type: constants.TYPE_TABLE.type,
    id,
    pid,
    name: i18n.msg('component63') + comm.getCompCount(),
    title: i18n.msg('c60'),
    active: true,
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_TABLE.defaultWidth,
    h: constants.TYPE_TABLE.defaultHeight,
    c: defaultConfig,
    dataset: {
      id: null,
      name: '',
      detail: [],
      var: [],
      filter: [],
      request: {
        TableColumns: [],
        TableSorts: [],
      },
    },
  }
}

function addCommonChart(items, itemId, pid, comp) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, comp.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    chartModel: {
      edit: false,
      add: true,
      drillMem: '',
      drill: false,
      relationId: [],
      relationName: [],
    },
    config: {
      show: true,
      unit: 1,
      p: 4,
      top: 'center',
      left: 'right',
      orient: 'vertical',
      rotate: 0,
      label: '',
      sort: '',
      legendPos: 2,
      dataDrillingDown: {
        type: '1', // 三种方式 1、同系列 2、不同系列等
        status: false, // 默认关闭
        path: [], // 钻取路径
      },
      // 数据区域缩放
      dataAreaZoom: {
        status: false,
      },
      // 组件联动
      compLinkage: {
        status: false,
        ids: [],
        dimMap: [],
      },
      dataNextLevel: {
        status: false,
        nextLevelData: '',
      },
      nextLevelData: '',
      openStyle: '',
      map: {
        dataDisplayMode: 0,
        mapColorConfigMode: 5,
        type: 'china',
        displayMode: 0,
      },
      rateSuffix: '',
      dashboard: {
        min: 0,
        max: 100,
        data: '50',
        prefix: '',
        suffix: '',
        digitalType: 'digital',
        currencySymbols: '¥',
        decimalPlace: 2,
        enableThousands: false,
        unit: 1,
        aimValues: [30, 70],
        datasetTypes: ['', '', '', ''],
        datasetFormula: [{}, {}, {}, {}],
        targetValueCount: 2,
      },
      digitalFormat: {
        data: '10000000.1234',
        prefix: '',
        suffix: '',
        digitalType: 'digital',
        dataLabelType: 'default',
        currencySymbols: '¥',
        decimalPlace: 2,
        enableThousands: false,
        unit: 1,
        unitarea: 1,
      },
      waterfull: {
        colors: {
          up: '#1aab40',
          down: '#d64554',
          summary: '#0c8fff',
        },
      },
      xTextStyle: {
        enable: true,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12',
        color: '#6f6f6f',
      },
      yTextStyle: {
        enable: true,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12',
        color: '#6f6f6f',
      },
      tagTextStyle: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12',
        color: '#6f6f6f',
      },
      xDigitalFormat: {
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
      },
      yDigitalFormat: {
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
      },
      yLDigitalFormat: {
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
      },
      xAxisValue: {
        min: 0,
        max: 0,
        enabled: false,
      },
      yAxisValue: {
        min: 0,
        max: 0,
        enabled: false,
      },
      yLAxisValue: {
        min: 0,
        max: 0,
        enabled: false,
      },
    },
    opacity: 1,
    showBack: true,
    bkColor: 'rgba(255,255,255, 1)',
    borderOpacity: 1,
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    borderColor: 'rgba(255,255,255, 1)',
    minHeight: 260,
    minWidth: 200,
    visibles: [true, true, true],
    title: {
      fontSize: '18',
      fontStyle: 'normal',
      fontWeight: 'normal',
      underline: 'none',
      foreColor: '#2a2a2a',
      backColor: '#ffffff',
      show: true,
      align: 'center',
    },
    desp: $_.cloneDeep(constants.desp),
  }

  return {
    type: comp.type,
    id,
    pid,
    name: i18n.msg(comp.nameKey) + comm.getCompCount(),
    title: i18n.msg('c60'),
    x: pos[0],
    y: pos[1],
    w: comp.defaultWidth,
    h: comp.defaultHeight,
    s: '',
    c: defaultConfig,
    switchXY: false,
    dataset: {
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
    },
  }
}

function addImageItem(items, itemId, pid) {
  const id = itemId
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_IMAGE.type) : comm.calcSubTabPos(items, pid)
  const defaultConfig = {
    center: false,
    visibles: [true, true, true],
    showBorder: true,
    borderStyle: 'dotted',
    borderWidth: '0',
    size: false,
    urls: [],
    value: '',
    showBack: true,
    opacity: 1,
    borderColor: 'rgba(255,255,255, 1)',
    borderOpacity: 1,
    bkColor: 'rgba(255,255,255, 1)',
    desp: $_.cloneDeep(constants.desp),
  }
  const defaultStyle = {
    display: 'flex',
    'justify-content': 'flex-start',
    'align-items': 'center',
    height: '100%',
    fontSize: `${defaultConfig.fontSize}px`,
    color: '',
    backgroundColor: '',
  }
  return {
    type: constants.TYPE_IMAGE.type,
    id,
    pid,
    name: i18n.msg('image') + comm.getCompCount(),
    title: '',
    tag: 'el-image',
    active: true,
    x: pos[0],
    y: pos[1],
    w: constants.TYPE_IMAGE.defaultWidth,
    h: constants.TYPE_IMAGE.defaultHeight,
    s: defaultStyle,
    c: defaultConfig,
  }
}

function addLineItem(items, itemId, pid) {
  const pos =
    pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_DIVIDED_LINE.type) : comm.calcSubTabPos(items, pid)
  return {
    type: constants.TYPE_DIVIDED_LINE.type,
    id: itemId,
    pid,
    name: i18n.msg('component72') + comm.getCompCount(),
    active: true,
    c: {
      visibles: [true, false, true],
      bkColor: '#d0d0d5',
      opacity: 1,
      hr_type: 1,
      rot: 0,
      lw: 800,
      lh: 4,
      lt: 'solid',
    },
    w: constants.TYPE_DIVIDED_LINE.defaultWidth,
    h: constants.TYPE_DIVIDED_LINE.defaultHeight,
    x: pos[0],
    y: pos[1],
  }
}

function addDimParamItem(items, itemId, pid) {
  const pos = pid === '0' ? comm.calcNewItemPos(items, constants.TYPE_DIMPARAM.type) : comm.calcSubTabPos(items, pid)
  return {
    type: constants.TYPE_DIMPARAM.type,
    id: itemId,
    pid,
    name: i18n.msg('component71') + comm.getCompCount(),
    title: i18n.msg('c60'),
    lts: '',
    active: true,
    c: {
      visibles: [true, false, true],
      bkColor: 'rgba(255,255,255, 1)',
      showBack: true,
      borderOpacity: 1,
      showBorder: true,
      borderColor: 'rgba(255,255,255, 1)',
      borderStyle: 'dotted',
      borderWidth: '0',
      title: {
        fontSize: '18',
        fontStyle: 'normal',
        fontWeight: 'normal',
        underline: 'none',
        foreColor: '#2a2a2a',
        backColor: '#fff',
        show: true,
        align: 'center',
      },
      desp: $_.cloneDeep(constants.desp),
    },
    w: constants.TYPE_DIMPARAM.defaultWidth,
    h: constants.TYPE_DIMPARAM.defaultHeight,
    x: pos[0],
    y: pos[1],
    dims: [],
  }
}

function addSeriesLine() {
  return {
    name: '参考线',
    type: 'line',
    stack: 'all',
    symbolSize: 6,
    markLine: {
      symbol: 'none',
      tooltip: {
        trigger: 'item',
        formatter(params) {
          return `${params.name} : ${params.value.toLocaleString()}`
        },
      },
      data: [],
      label: {
        show: false,
      },
    },
  }
}

// 表单属性【右面板】
export const formConf = {
  url: '../../../assets/img/align2center.png',
  size: '5',
  width: constants.defaultPageWidth,
  height: constants.defaultPageHeight,
  backgroundSize: '100% 100%',
}

export default {
  addTextItem,
  addTabItem,
  addTableItem,
  addSubTabItem,
  addCommonChart,
  addTimeItem,
  addDataPointItem,
  addImageItem,
  addSeriesLine,
  addLineItem,
  addDimParamItem,
}
