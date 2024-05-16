/**
 * echarts默认参数集合
 */

import * as i18n from './I18n'

export const color = [
  '#c23531',
  '#2f4554',
  '#61a0a8',
  '#d48265',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3',
  'rgb(250, 235, 215, 1)',
  'rgb(240, 248, 255, 1)',
  'rgb(0, 255, 255, 1)',
  'rgb(245, 245, 220, 1)',
  'rgb(255, 228, 196, 1)',
  'rgb(127, 255, 212, 1)',
  'rgb(240, 255, 255, 1)',
  'rgb(0, 0, 0, 1)',
  'rgb(255, 235, 205, 1)',
  'rgb(0, 0, 255, 1)',
  'rgb(138, 43, 226, 1)',
  'rgb(165, 42, 42, 1)',
  'rgb(222, 184, 135, 1)',
  'rgb(95, 158, 160, 1)',
  'rgb(127, 255, 0, 1)',
  'rgb(210, 105, 30, 1)',
  'rgb(255, 127, 80, 1)',
  'rgb(100, 149, 237, 1)',
  'rgb(255, 248, 220, 1)',
  'rgb(220, 20, 60, 1)',
  'rgb(0, 255, 255, 1)',
  'rgb(0, 0, 139, 1)',
  'rgb(0, 139, 139, 1)',
  'rgb(184, 134, 11, 1)',
  'rgb(169, 169, 169, 1)',
  'rgb(0, 100, 0, 1)',
  'rgb(169, 169, 169, 1)',
  'rgb(189, 183, 107, 1)',
  'rgb(139, 0, 139, 1)',
  'rgb(85, 107, 47, 1)',
  'rgb(255, 140, 0, 1)',
  'rgb(153, 50, 204, 1)',
  'rgb(139, 0, 0, 1)',
  'rgb(233, 150, 122, 1)',
  'rgb(143, 188, 143, 1)',
  'rgb(72, 61, 139, 1)',
  'rgb(47, 79, 79, 1)',
  'rgb(47, 79, 79, 1)',
  'rgb(0, 206, 209, 1)',
  'rgb(148, 0, 211, 1)',
  'rgb(255, 20, 147, 1)',
  'rgb(0, 191, 255, 1)',
  'rgb(105, 105, 105, 1)',
  'rgb(105, 105, 105, 1)',
  'rgb(30, 144, 255, 1)',
  'rgb(178, 34, 34, 1)',
  'rgb(255, 250, 240, 1)',
  'rgb(34, 139, 34, 1)',
  'rgb(255, 0, 255, 1)',
  'rgb(220, 220, 220, 1)',
  'rgb(248, 248, 255, 1)',
  'rgb(255, 215, 0, 1)',
  'rgb(218, 165, 32, 1)',
  'rgb(128, 128, 128, 1)',
  'rgb(0, 128, 0, 1)',
  'rgb(173, 255, 47, 1)',
  'rgb(128, 128, 128, 1)',
  'rgb(240, 255, 240, 1)',
  'rgb(255, 105, 180, 1)',
  'rgb(205, 92, 92, 1)',
  'rgb(75, 0, 130, 1)',
  'rgb(255, 255, 240, 1)',
  'rgb(240, 230, 140, 1)',
  'rgb(230, 230, 250, 1)',
  'rgb(255, 240, 245, 1)',
  'rgb(124, 252, 0, 1)',
  'rgb(255, 250, 205, 1)',
  'rgb(173, 216, 230, 1)',
  'rgb(240, 128, 128, 1)',
  'rgb(224, 255, 255, 1)',
  'rgb(250, 250, 210, 1)',
  'rgb(211, 211, 211, 1)',
  'rgb(144, 238, 144, 1)',
  'rgb(211, 211, 211, 1)',
  'rgb(255, 182, 193, 1)',
  'rgb(255, 160, 122, 1)',
  'rgb(32, 178, 170, 1)',
  'rgb(135, 206, 250, 1)',
  'rgb(119, 136, 153, 1)',
  'rgb(119, 136, 153, 1)',
  'rgb(176, 196, 222, 1)',
  'rgb(255, 255, 224, 1)',
  'rgb(0, 255, 0, 1)',
  'rgb(50, 205, 50, 1)',
  'rgb(250, 240, 230, 1)',
  'rgb(255, 0, 255, 1)',
  'rgb(128, 0, 0, 1)',
  'rgb(102, 205, 170, 1)',
  'rgb(0, 0, 205, 1)',
  'rgb(186, 85, 211, 1)',
  'rgb(147, 112, 219, 1)',
  'rgb(60, 179, 113, 1)',
  'rgb(123, 104, 238, 1)',
  'rgb(0, 250, 154, 1)',
  'rgb(72, 209, 204, 1)',
  'rgb(199, 21, 133, 1)',
  'rgb(25, 25, 112, 1)',
  'rgb(245, 255, 250, 1)',
  'rgb(255, 228, 225, 1)',
  'rgb(255, 228, 181, 1)',
  'rgb(255, 222, 173, 1)',
  'rgb(0, 0, 128, 1)',
  'rgb(253, 245, 230, 1)',
  'rgb(128, 128, 0, 1)',
  'rgb(107, 142, 35, 1)',
  'rgb(255, 165, 0, 1)',
  'rgb(255, 69, 0, 1)',
  'rgb(218, 112, 214, 1)',
  'rgb(238, 232, 170, 1)',
  'rgb(152, 251, 152, 1)',
  'rgb(175, 238, 238, 1)',
  'rgb(219, 112, 147, 1)',
  'rgb(255, 239, 213, 1)',
  'rgb(255, 218, 185, 1)',
  'rgb(205, 133, 63, 1)',
  'rgb(255, 192, 203, 1)',
  'rgb(221, 160, 221, 1)',
  'rgb(176, 224, 230, 1)',
  'rgb(128, 0, 128, 1)',
  'rgb(255, 0, 0, 1)',
  'rgb(188, 143, 143, 1)',
  'rgb(65, 105, 225, 1)',
  'rgb(139, 69, 19, 1)',
  'rgb(250, 128, 114, 1)',
  'rgb(244, 164, 96, 1)',
  'rgb(46, 139, 87, 1)',
  'rgb(255, 245, 238, 1)',
  'rgb(160, 82, 45, 1)',
  'rgb(192, 192, 192, 1)',
  'rgb(135, 206, 235, 1)',
  'rgb(106, 90, 205, 1)',
  'rgb(112, 128, 144, 1)',
  'rgb(112, 128, 144, 1)',
  'rgb(255, 250, 250, 1)',
  'rgb(0, 255, 127, 1)',
  'rgb(70, 130, 180, 1)',
  'rgb(210, 180, 140, 1)',
  'rgb(0, 128, 128, 1)',
  'rgb(216, 191, 216, 1)',
  'rgb(255, 99, 71, 1)',
  'rgb(64, 224, 208, 1)',
  'rgb(238, 130, 238, 1)',
  'rgb(245, 222, 179, 1)',
  'rgb(255, 255, 255, 1)',
  'rgb(245, 245, 245, 1)',
  'rgb(255, 255, 0, 1)',
  'rgb(154, 205, 50, 1)',
]

export const textStyle = {
  enable: true,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12',
  color: '#6f6f6f',
}

export const tabStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  underline: 'none',
  fontSize: 16,
  foreColor: '#000000',
  backColor: 'rgba(211, 203, 183, 0.5)',
}

export const selectedTabStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  underline: 'none',
  fontSize: 16,
  foreColor: '#000000',
  backColor: 'rgba(255, 255, 255, 1)',
}

// 由于组件内可能有计算，此处的的属性不允许修改为百分比，不允许添加单位px等等，只允许修改数值！且要考虑对各个组件是否有影响
export const grid = {
  y: 60,
  x: 28,
  x2: 20,
  y2: 20,
  containLabel: true,
}

export const gridWithoutLegend = {
  y: 20,
  x: 20,
  x2: 20,
  y2: 20,
  containLabel: true,
}

export const fontStyleItems = ['normal', 'italic', 'oblique']

export const label = {
  show: false,
  align: 'center',
  fontWeight: 'normal',
  fontSize: 14,
  color: '#000000',
  fontStyle: 'normal',
}

export const legend = {
  show: true,
  orient: 'horizontal',
  align: 'auto',
  textStyle: {
    color: '#000000',
  },
}

export const legendWithPie = {
  show: true,
  orient: 'vertical',
  textStyle: {
    color: '#000000',
  },
  align: 'right',
  right: 'right',
}

export const units = [
  {
    label: '--',
    value: 1,
  },
  {
    label: i18n.msg('units1'),
    labelId: 'units1',
    value: 1000,
  },
  {
    label: i18n.msg('units2'),
    labelId: 'units2',
    value: 10000,
  },
  {
    label: i18n.msg('units3'),
    labelId: 'units3',
    value: 1000000,
  },
  {
    label: i18n.msg('units4'),
    labelId: 'units4',
    value: 10000000,
  },
  {
    label: i18n.msg('units5'),
    labelId: 'units5',
    value: 100000000,
  },
]

export function getUpdatedUnitsArray() {
  units.forEach((unit) => {
    if (unit.labelId) {
      unit.label = i18n.msg(unit.labelId)
    }
  })
  return units
}

export const unitarea = [
  {
    label: '--',
    value: 1,
  },
  {
    label: i18n.msg('AfterTheTitle'),
    value: 2,
  },
  {
    label: i18n.msg('UpperLeftCorner'),
    value: 3,
  },
  {
    label: i18n.msg('LowerLeftQuarter'),
    value: 4,
  },
  {
    label: i18n.msg('UpperRightCorner'),
    value: 5,
  },
  {
    label: i18n.msg('LowerRightCorner'),
    value: 6,
  },
]

const top = {
  align2left: {
    left: 'left',
    align: 'left',
  },
  align2center: {
    align: 'auto',
  },
  align2right: {
    align: 'right',
    right: 'left',
  },
}

const corner = {
  leftTop: {
    left: 'left',
    align: 'left',
    orient: 'vertical',
  },
  rightTop: {
    right: 'right',
    align: 'right',
    orient: 'vertical',
  },
  leftBottom: {
    left: 'left',
    bottom: '0',
  },
}

const center = {
  align2left: {
    top: '35%',
    left: 'left',
    align: 'left',
    orient: 'vertical',
  },
  align2right: {
    top: '35%',
    right: 'right',
    align: 'right',
  },
}

const bottom = {
  center: {
    bottom: '0',
  },
  align2right: {
    bottom: '0',
    align: 'right',
    right: 'left',
  },
}

export const legendPosition = {
  topAlign2Left: top.align2left,
  topAlign2Center: top.align2center,
  topAlign2Right: top.align2right,
  leftTop: corner.leftTop,
  rightTop: corner.rightTop,
  leftBottom: corner.leftBottom,
  centerAlign2Left: center.align2left,
  centerAlign2Right: center.align2right,
  bottomCenter: bottom.center,
  bottomAlign2Right: bottom.align2right,
}

export const legendPositionList = [
  {
    name: i18n.msg('legendPosition1'),
    labelId: 'legendPosition1',
    value: 0,
  },
  {
    name: i18n.msg('legendPosition2'),
    labelId: 'legendPosition2',
    value: 1,
  },
  {
    name: i18n.msg('legendPosition3'),
    labelId: 'legendPosition3',
    value: 2,
  },
  {
    name: i18n.msg('legendPosition4'),
    labelId: 'legendPosition4',
    value: 3,
  },
  {
    name: i18n.msg('legendPosition5'),
    labelId: 'legendPosition5',
    value: 4,
  },
  {
    name: i18n.msg('legendPosition6'),
    labelId: 'legendPosition6',
    value: 5,
  },
  {
    name: i18n.msg('legendPosition7'),
    labelId: 'legendPosition7',
    value: 6,
  },
  {
    name: i18n.msg('legendPosition8'),
    labelId: 'legendPosition8',
    value: 7,
  },
  {
    name: i18n.msg('legendPosition9'),
    labelId: 'legendPosition9',
    value: 8,
  },
  {
    name: i18n.msg('legendPosition10'),
    labelId: 'legendPosition10',
    value: 9,
  },
]
export const legendOrientList = [
  {
    name: i18n.msg('horizontal'),
    labelId: 'horizontal',
    value: "horizontal",
  },
  {
    name: i18n.msg('vertical'),
    labelId: 'vertical',
    value: "vertical",
  }
]

export function getUpdatedlegendPositionList() {
  legendPositionList.forEach((unit) => {
    if (unit.labelId) {
      unit.name = i18n.msg(unit.labelId)
    }
  })
  return legendPositionList
}
export const defaultMapLevelColors = ['#5475f5', '#45DAD1', '#3FA7FF', '#66E0E3', '#FFDC5E', '#9fb5ea']

export const themeFormConf = {
  tabPosition: 'bottom',
  scale: 'none',
  size: '5',
  number: 'PageConfig',
  name: 'PageConfig',
  switchMode: 'auto',
  switchTime: 10,
  tabStyle: { ...tabStyle },
  selectedTabStyle: { ...selectedTabStyle },
  height: 900,
  width: 1600,
  url: '',
  backgroundColor: '',
  backgroundSize: '100% 100%',
  tabHeight: 40,
  designHeight: () => {
    const hh =
      themeFormConf.tabPosition === 'top' || themeFormConf.tabPosition === 'bottom' ? themeFormConf.tabHeight : 0
    return themeFormConf.height - hh
  },
  designWidth: () => {
    const ww =
      themeFormConf.tabPosition === 'left' || themeFormConf.tabPosition === 'right' ? themeFormConf.tabHeight : 0
    return themeFormConf.width - ww
  },
}
