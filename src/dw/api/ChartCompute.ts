/**
 * 图形组件格式以及样式构造相关计算
 */
// @ts-nocheck

import linq from 'linq'
import _ from 'lodash'
// @ts-ignore
import * as defaultOption from './EChartsOption'
import comm from './Common'
import * as constants from './Constants'
import * as dfc from './DigitalFormatCompute'
import * as i18n from './I18n'
import Comp from './Comp'

/**
 * 设置小型序列图
 * @isStack 是否堆积
 * @doubleYxAxis 是否需要双Y轴
 * @isHorizon 是否横向
 * @isArea 是否堆积面积图
 */
export function setSmallSeriesChart(currItem, _option, data, _self, isStack, doubleYxAxis, isHorizon, isArea) {
  const pos = getLabelPosition(_option)
  const showLegend = _option.legend.show ? true : !!linq.from(_option.legend).all((z) => z.show == true)
  if (currItem.dataset && currItem.dataset.request.smallSeriesChartNumber) {
    _option.legend = []
    _option.xAxis = []
    _option.yAxis = []
    _option.grid = []
    _option.series = []
    _option.title = []
    const total = data && data.series ? data.series.length : 5
    const sqrt_f = Math.sqrt(total)
    let cols = parseInt(sqrt_f)
    const rows = Number.isInteger(sqrt_f) ? sqrt_f : parseInt(sqrt_f) + 1
    if (cols * rows < total) cols += 1
    // 列百分比
    let columnPercent = (100 / cols) * 0.85
    // 行百分比
    const rowPercent = (100 / rows) * 0.63
    // let doubleYxAxis = linq.from(data.series).any((z) => linq.from(z.detail).any((zz) => zz.type == 'line'));
    let startX = columnPercent * 0.15
    const startY = rowPercent * 0.4
    if (doubleYxAxis) {
      columnPercent = (100 / cols) * 0.75
      if (total > 2) {
        startX = columnPercent * 0.25
      }
    }

    // 图形部分定位
    for (let col = 1; col <= cols; col++) {
      for (let row = 1; row <= rows; row++) {
        const gItem = {
          x: `${startX + (col - 1) * columnPercent + (col > 1 ? (col - 1) * startX : 0)}%`,
          y: `${startY + (row - 1) * rowPercent + (row > 1 ? (row - 1) * startY : 0)}%`,
          width: `${columnPercent}%`,
          height: `${rowPercent}%`,
        }

        const legendItem = {
          left: gItem.x,
          top: `${startY * 0.7 + (row - 1) * rowPercent + (row > 1 ? (row - 1) * startY : 0) - 0.45 * startY}%`,
          show: showLegend,
        }

        const count = (row - 1) * (col - 1) + col - 1
        const titleItem = {
          text: data.series[count].name,
          left: `${startX + (col - 1) * columnPercent + (col > 1 ? (col - 1) * startX : 0) + 0.5 * columnPercent}%`,
          top: `${(row - 1) * rowPercent + (row > 1 ? (row - 0.85) * startY : 0)}%`,
          textAlign: 'center',
          show: false,
        }

        gItem.containLabel = true

        if (_option.grid.length < total) {
          _option.grid.push(gItem)
          _option.legend.push(legendItem)
          _option.title.push(titleItem)
        }
      }
    }

    // 组装series
    if (!data.series) data.series = []
    for (let i = 0; i < data.series.length; i++) {
      for (let j = 0; j < data.series[i].detail.length; j++) {
        const srs = {
          name: data.series[i].detail[j].name,
          data: data.series[i].detail[j].data,
          xAxisIndex: i,
          yAxisIndex: i,
          type: data.series[i].detail[j].type,
        }

        if (isStack) {
          srs.stack = `${i}`
        }
        if (isArea) {
          srs.areaStyle = {}
        }
        // 双Y轴时，根据yAxisIndex识别line是属于哪一个Y轴；0是左1是右，（只适用于单辅助Y轴情况）
        if (doubleYxAxis && data.series[i].detail[j].yAxisIndex === 1) {
          srs.yAxisIndex += data.series.length
          // 辅助Y轴不需要堆积
          srs.stack = undefined
          srs.areaStyle = undefined
        }
        _option.series.push(srs)
      }

      const x_Axis = {
        type: 'category',
        data: data.xAxis,
        gridIndex: i,
      }
      // 设置重命名位置
      if (currItem.dataset.request.xAxisReName && currItem.dataset.request.xTitleShow) {
        x_Axis.nameLocation = 'middle'
        x_Axis.nameGap = 25
        x_Axis.name = currItem.dataset.request.xAxisReName
      }

      if (isHorizon) {
        x_Axis.data = data.yAxis
      }

      const y_Axis = {
        type: 'value',
        gridIndex: i,
      }
      // 设置重命名位置
      if (currItem.dataset.request.yAxisReName && currItem.dataset.request.yTitleShow) {
        y_Axis.nameRotate = 90
        y_Axis.nameGap = 30
        y_Axis.nameLocation = 'middle'
        y_Axis.name = currItem.dataset.request.yAxisReName
      }

      _option.xAxis.push(isHorizon ? y_Axis : x_Axis)
      _option.yAxis.push(isHorizon ? x_Axis : y_Axis)
    }

    if (doubleYxAxis) {
      for (let i = 0; i < data.series.length; i++) {
        const y_Axis = {
          type: 'value',
          gridIndex: i,
          splitLine: true,
        }
        // 设置重命名位置
        if (currItem.dataset.request.yAxisLineReName) {
          y_Axis.nameRotate = 90
          y_Axis.nameGap = 30
          ;(y_Axis.nameLocation = 'middle'), (y_Axis.name = currItem.dataset.request.yAxisLineReName)
        }
        _option.yAxis.push(y_Axis)
      }
    }

    if (currItem.switchXY && constants.SwitchXYAxisRequired.includes(currItem.type)) {
      const temp = _.cloneDeep(_option.xAxis)
      _option.xAxis = _option.yAxis
      _option.yAxis = temp
    }
  } else {
    _option.series = data.series
    if (isStack) {
      _option.series.forEach((element) => {
        // y轴折线不需要堆积
        if ((isHorizon && element.xAxisIndex != 1) || (!isHorizon && element.yAxisIndex != 1)) {
          element.stack = 'stack'
        }
      })
    }
    if (doubleYxAxis) {
      if (_.isEmpty(_option.yAxis)) {
        _option.yAxis = []
      }

      if (_option.yAxis.length == 1) {
        const y = {
          type: 'value',
        }
        _option.yAxis.push(y)
      }
    }

    let axisData = data.xAxis
    let defaultIsBar = true
    if (!axisData) {
      axisData = data.yAxis
      defaultIsBar = false
    }

    if (currItem.switchXY && constants.SwitchXYAxisRequired.includes(currItem.type)) {
      // 先换回正常位置
      const x = _.cloneDeep(_option.yAxis)
      const y = _.cloneDeep(_option.xAxis)

      if (defaultIsBar) {
        x[0].data = axisData
      }
      if (!defaultIsBar) {
        y[0].data = axisData
      }
      _option.xAxis = y
      _option.yAxis = x
    } else {
      if (defaultIsBar) _option.xAxis[0].data = axisData
      if (!defaultIsBar) _option.yAxis[0].data = axisData
    }
  }
  setAxisUnit(_option, currItem)
  setAxisShowFullName(_option)
  setLabelPosition(_option, pos)
  setReferencevalue(_option, currItem, data)
  setXYYLALFormatter(_option, currItem)
  setLegendShow(_option, currItem, data)
  setAxisMinMaxValue(currItem, _option, constants.DefaultReverseXY.includes(currItem.type))
  _self.$emit('refresh')
}

/**
 * 百分比悬浮框设置
 * @param {*} a
 * @param {*} digitalFormat
 * @param {*} originData
 * @returns
 */
export function toolTipFormatPercent(a, digitalFormat, originData) {
  const list = []
  let listItem = ''
  const num = comm.getNum(a)
  for (let i = 0; i < a.length; i++) {
    const v = originData[a[i].axisIndex][a[i].dataIndex][i]

    list.push(
      `<div class="showBoxLine">` +
        `<span><i style="display: inline-block; width: 10px;height: 10px;background: ${a[i].color};margin-right: 5px;border-radius: 50%;}"></i></span>` +
        `<span class="trigger">${a[i].seriesName}</span>` +
        `<span>&nbsp;${dfc.getFormatter(v, digitalFormat)}${comm.getPercent(
          a[i].value,
          num,
          digitalFormat.decimalPlace,
        )}</span>` +
        `</div>`,
    )
  }
  listItem = list.join('')
  return `<div class="showBox"><div>${a[0].name}</div>${listItem}</div>`
}

export function toolTipFormat(a, item) {
  const num = comm.getNum(a)
  const list = []
  let listItem = ''
  for (let i = 0; i < a.length; i++) {
    list.push(
      `<div class="showBoxLine">` +
        `<span><i style="display: inline-block; width: 10px;height: 10px;background: ${a[i].color};margin-right: 5px;border-radius: 50%;}"></i></span>` +
        `<span class="trigger">${a[i].seriesName}</span>` +
        `<span>&nbsp;${comm.formatAmount(a[i].value, item.c.config.unit)}${comm.getCompany(
          item.c.config.unit,
        )}${comm.getPercent(a[i].value, num, item.c.config.digitalFormat.decimalPlace, item.type)}</span>` +
        `</div>`,
    )
  }
  listItem = list.join('')
  return `<div class="showBox"><div>${a[0].name}</div>${listItem}</div>`
}

/**
 * PIE悬浮框设置
 * @param {*} a
 * @param {*} item
 * @returns
 */
export function toolTipFormatPie(a, item) {
  // 当度量为比率时，给数据添加百分号
  const value = comm.formatAmount(a.value, item.c.config.unit) + comm.getCompany(item.c.config.unit)
  const list = []
  const cC = item.c.config
  const num = cC.charts && cC.charts.series && cC.charts.series.length > 0 ? comm.getNum(cC.charts.series[0].data) : 0
  list.push(
    `<div class="showBoxLine">` +
      `<span><i style="display: inline-block; width: 10px;height: 10px;background: ${a.color};margin-right: 5px;border-radius: 50%;}"></i></span>` +
      `<span>${value}${comm.getPercent(a.value, num, item.c.config.digitalFormat.decimalPlace, item.type)}</span>` +
      `</div>`,
  )

  const listItem = list.join('')
  let dtl = ''
  if (a.data.detailName) dtl = ` - ${a.data.detailName}`
  return `<div class="showBox"><div>${a.name}${dtl}</div>${listItem}</div>`
}

/**
 * 设置单位
 * @param {*} _option
 * @param {*} currItem
 */
function setAxisUnit(_option, currItem) {
  let axis
  if (linq.from(_option.xAxis).all((c) => c.type === 'value')) {
    axis = _option.xAxis
  } else if (linq.from(_option.yAxis).all((c) => c.type === 'value')) {
    axis = _option.yAxis
  }
  let unitAreaVal = 1
  if (currItem.c.config.digitalFormat.unitarea) {
    unitAreaVal = currItem.c.config.digitalFormat.unitArea
  }
  for (let index = 0; index < axis.length; index++) {
    const element = axis[index]
    if (element.axisLabel === undefined) {
      element.axisLabel = {
        formatter: (value) => {
          value = comm.formatAmount(value, currItem.c.config.digitalFormat.unit)
          const unit = comm.getCompany(currItem.c.config.digitalFormat.unit)
          if (unitAreaVal != undefined || unitAreaVal != 1) {
            return `${value}`
          }
          return `${value} ${unit}`
        },
      }
    } else {
      element.axisLabel.formatter = (value) => {
        value = comm.formatAmount(value, currItem.c.config.digitalFormat.unit)
        const unit = comm.getCompany(currItem.c.config.digitalFormat.unit)
        if (unitAreaVal != undefined || unitAreaVal != 1) {
          return `${value}`
        }
        return `${value} ${unit}`
      }
    }
  }
}

function setLegendShow(_option, currItem, data) {
  if (!constants.WithoutLineChartRequired.includes(currItem.type)) {
    return
  }
  if (!_option.legend.show) {
    return
  }
  if (_option.columnarShow && _option.brokenLineShow) {
    let brokenLineName = currItem.dataset.request.yAxisLineNumbers[0]
    if (brokenLineName !== undefined && brokenLineName.includes('=')) {
      brokenLineName = brokenLineName.split('=')[1]
      brokenLineName = brokenLineName.replaceAll("'", '')
    }
    let columnarName = currItem.dataset.request.yAxisNumber
    if (columnarName.includes('=')) {
      columnarName = columnarName.split('=')[1]
      columnarName = columnarName.replaceAll("'", '')
    }
    data.series.forEach((e) => {
      if (e.type === 'line' && e.stack !== 'all') {
        e.name = `${e.name}-${brokenLineName}`
      }
      if (e.type === 'bar' && columnarName !== 'FMONEY') {
        e.name = `${e.name}-${columnarName}`
      }
    })
    return
  }
  if (_option.columnarShow && !_option.brokenLineShow) {
    return
  }

  if (!_option.columnarShow && _option.brokenLineShow) {
    data.series.sort((a, b) => {
      return b.type.localeCompare(a.type)
    })
  }
}

/**
 * 设置参考线
 * @param {*} _option
 * @param {*} currItem
 */
function setReferencevalue(_option, currItem, data) {
  if (
    currItem &&
    currItem.c &&
    currItem.c.form &&
    currItem.c.form.dynamicItem != undefined &&
    currItem.c.form.dynamicItem.length != 0
  ) {
    const temp = Comp.addSeriesLine()
    const arr = []
    for (const temp of data.series) {
      for (const num of temp.data) {
        arr.push(num)
      }
    }
    const sum = arr.reduce((total, num) => total + num, 0)
    const avg = parseInt(sum / arr.length)
    arr.sort(function (a, b) {
      return a - b
    })
    let median
    if (arr.length % 2 !== 0) {
      median = arr[Math.floor(arr.length / 2)]
    } else {
      const mid1 = arr[arr.length / 2 - 1]
      const mid2 = arr[arr.length / 2]
      median = parseInt((mid1 + mid2) / 2)
    }
    let axis
    if (linq.from(_option.xAxis).all((c) => c.type === 'value')) {
      axis = 'xAxis'
    } else if (linq.from(_option.yAxis).all((c) => c.type === 'value')) {
      axis = 'yAxis'
    }
    let avgTm = true
    let midTm = true
    for (const item of currItem.c.form.dynamicItem) {
      const tmp = {}
      if (item.value === 'avg' && avgTm) {
        tmp.name = item.label
        if (axis === 'xAxis') {
          tmp.xAxis = avg
        } else {
          tmp.yAxis = avg
        }
        temp.markLine.data.push(tmp)
        avgTm = false
      } else if (item.value === 'mid' && midTm) {
        tmp.name = item.label
        if (axis === 'xAxis') {
          tmp.xAxis = median
        } else {
          tmp.yAxis = median
        }
        temp.markLine.data.push(tmp)
        midTm = false
      } else {
        const num = parseInt(item.customValue)
        tmp.name = item.label
        if (axis === 'xAxis') {
          tmp.xAxis = num
        } else {
          tmp.yAxis = num
        }
        temp.markLine.data.push(tmp)
      }
    }
    _option.series.push(temp)
  }
}

/**
 * 设置xy、折线y轴坐标数字格式
 * @param {*} _option echars数据
 * @param {*} currItem db数据
 */
function setXYYLALFormatter(_option, currItem) {
  if (_option) {
    if (constants.DefaultReverseXY.includes(currItem.type) && _option.xAxis[0] && _option.xAxis[0].axisLabel) {
      if (currItem.c.config.xDigitalFormat.enable) {
        const format = currItem.c.config.xDigitalFormat
        _option.xAxis[0].axisLabel.formatter = (a) => dfc.getFormatter(a, format)
      } else {
        _option.xAxis[0].axisLabel.formatter = (a) => a
      }
    }
    if (!constants.DefaultReverseXY.includes(currItem.type) && _option.yAxis[0] && _option.yAxis[0].axisLabel) {
      if (currItem.c.config.yDigitalFormat.enable) {
        const format = currItem.c.config.yDigitalFormat
        _option.yAxis[0].axisLabel.formatter = (a) => dfc.getFormatter(a, format)
      } else {
        _option.yAxis[0].axisLabel.formatter = (a) => a
      }
    }
    if (
      currItem.dataset &&
      constants.WithoutLineChartRequired.includes(currItem.type) &&
      _option.yAxis[1] &&
      _option.yAxis[1].axisLabel
    ) {
      if (currItem.c.config.yLDigitalFormat.enable) {
        const format = currItem.c.config.yLDigitalFormat
        _option.yAxis[1].axisLabel.formatter = (a) => dfc.getFormatter(a, format)
      } else {
        _option.yAxis[1].axisLabel.formatter = (a) => a
      }
    }
  }
}

/**
 * 坐标轴显示全名
 * @param {*} _option
 */
function setAxisShowFullName(_option) {
  let axis
  if (linq.from(_option.xAxis).all((c) => c.type === 'category')) {
    axis = _option.xAxis
  } else if (linq.from(_option.yAxis).all((c) => c.type === 'category')) {
    axis = _option.yAxis
  }

  if (axis) {
    axis.forEach((c) => {
      if (c.axisLabel) c.axisLabel.interval = 0
      else
        c.axisLabel = {
          interval: 0,
        }
    })
  }
}

/**
 * 设置单位
 * @param {*} a
 * @param {*} item
 * @returns
 */
export function setDataUnitFormatter(a, item) {
  const value = comm.formatAmount(a.value, item.c.config.unit) + comm.getCompany(item.c.config.unit)
  return value
}

/**
 * 设置极值
 * @param {*} item
 * @param {*} option
 * @param {*} isLine 默认柱形方向
 * @returns
 */
export function setAxisMinMaxValue(item, option, isLine = false) {
  const isSwitchXY = item.switchXY || isLine
  if (isSwitchXY) {
    if (item.c.config && item.c.config.xAxisValue && item.c.config.xAxisValue.enabled) {
      option.xAxis[0].min = item.c.config.xAxisValue.min
      option.xAxis[0].max = item.c.config.xAxisValue.max
    } else {
      option.xAxis[0].min = undefined
      option.xAxis[0].max = undefined
    }
  } else {
    if (constants.WithoutLineChartRequired.includes(item.type)) {
      if (item.c.config.yLAxisValue && item.c.config.yLAxisValue.enabled) {
        option.yAxis[1].min = item.c.config.yLAxisValue.min
        option.yAxis[1].max = item.c.config.yLAxisValue.max
      } else {
        option.yAxis[1].min = undefined
        option.yAxis[1].max = undefined
      }
    }
    if (item.c.config.yAxisValue && item.c.config.yAxisValue.enabled) {
      option.yAxis[0].min = item.c.config.yAxisValue.min
      option.yAxis[0].max = item.c.config.yAxisValue.max
    } else {
      option.yAxis[0].min = undefined
      option.yAxis[0].max = undefined
    }
  }
}

/**
 * 计算单位在图表的位置
 * @param {*} item
 * @param {*} unitareastyle 单位位置样式
 * @param {*} notaftertitle 不在标题后位置
 * @returns
 */
export function calculateUnitArea(item) {
  let digitalFormat = {}
  if (item.type === constants.TYPE_TABLE.type) {
    digitalFormat = item.c.digitalFormat
  } else if (item.type === constants.TYPE_DASHBOARD.type) {
    digitalFormat.unitarea = item.c.config.dashboard.unitarea
    digitalFormat.unit = item.c.config.dashboard.unit
  } else {
    digitalFormat = item.c.config.digitalFormat
  }
  if (digitalFormat === undefined || digitalFormat.unitarea === undefined) {
    digitalFormat.unitarea = 1
  }
  const unitArea = digitalFormat.unitarea
  const unitValue = digitalFormat.unit
  const returnDta = {
    unitareastyle: '',
    notaftertitle: true,
    unitName: '',
  }
  if (unitValue === 1 || unitArea === 1) {
    returnDta.notaftertitle = false
    return JSON.stringify(returnDta)
  }
  const unitName = defaultOption.units.find((unitItem) => unitItem.value === unitValue)
  const unitLabel = unitName.label
  if (unitArea === 2) {
    returnDta.unitName = `（${i18n.msg('unit')}：${unitLabel}）`
    returnDta.notaftertitle = false
  } else if (unitArea === 3) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.TOPLEFT
  } else if (unitArea === 4) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.BOTTOMLEFT
  } else if (unitArea === 5) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.TOPRIGHT
  } else if (unitArea === 6) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.BOTTOMRIGHT
  }
  return JSON.stringify(returnDta)
}

/**
 * 计算单位在数据点图表的位置
 * @param {*} item
 * @param {*} unitareastyle 单位位置样式
 * @param {*} notaftertitle 不在标题后位置
 * @returns
 */
export function calculateDataPointUnitArea(item, isSub) {
  if (item.c.config.dataPoint.unitarea === undefined) {
    item.c.config.dataPoint.unitarea = 1
  }
  const unitArea = item.c.config.dataPoint.unitarea
  const unitValue = item.c.config.dataPoint.unit
  const returnDta = {
    unitareastyle: '',
    notaftertitle: true,
    unitName: '',
  }
  if (_.eq(1, unitValue) || _.eq(1, unitArea) || isSub) {
    returnDta.notaftertitle = false
    return JSON.stringify(returnDta)
  }
  const unitName = defaultOption.units.find((unitItem) => unitItem.value === unitValue)
  const unitLabel = unitName.label
  if (unitArea === 2) {
    returnDta.unitName = `（${i18n.msg('unit')}：${unitLabel}）`
    returnDta.notaftertitle = false
  } else if (unitArea === 3) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.DATA_POINT_TOPLEFT
  } else if (unitArea === 4) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.DATA_POINT_BOTTOMLEFT
  } else if (unitArea === 5) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.DATA_POINT_TOPRIGHT
  } else if (unitArea === 6) {
    returnDta.unitName = `${i18n.msg('unit')}：${unitLabel}`
    returnDta.unitareastyle = constants.DATA_POINT_BOTTOMRIGHT
  }
  return JSON.stringify(returnDta)
}

/**
 * 处理百分比图
 * @param {*} _option
 */
export function percentChartPercentCompute(_option) {
  _option.series.forEach((c) => {
    if (c.xAxisIndex === undefined) c.xAxisIndex = 0
  })

  const max = linq.from(_option.series).max((c) => c.xAxisIndex)
  // seriesGrouped[0] = series[0] 用作序列分组
  const seriesGrouped = []

  for (let i = 0; i <= max; i++) {
    seriesGrouped[i] = []
  }

  for (let i = 0; i < _option.series.length; i++) {
    const e = _option.series[i]
    seriesGrouped[e.xAxisIndex].push(e)
  }

  for (let i = 0; i < seriesGrouped.length; i++) {
    const xs = []
    // 坐标轴上的数据 列数
    const axisCount = linq.from(seriesGrouped[i]).firstOrDefault()
    if (axisCount === null) continue
    for (let j = 0; j < axisCount.data.length; j++) {
      let colSum = 0
      // 每列有多少个堆积块
      for (let k = 0; k < seriesGrouped[i].length; k++) {
        const val = seriesGrouped[i][k].data[j]
        colSum += val
      }
      xs[j] = 100.0 / colSum

      for (let k = 0; k < seriesGrouped[i].length; k++) {
        seriesGrouped[i][k].data[j] *= xs[j]
      }
    }
  }
}

/**
 * 处理数据格式，用作显示
 * @param {*} _option
 * @returns 处理后的数据集
 */
export function PercentChartInit(_option) {
  if (_option.series.length === 0) return
  _option.series.forEach((c) => {
    if (c.xAxisIndex === undefined) c.xAxisIndex = 0
  })

  const max = linq.from(_option.series).max((c) => c.xAxisIndex)
  // seriesGrouped[0] = series[0] 用作序列分组
  const seriesGrouped = []
  // 原始数据集
  const originDatas = []

  for (let i = 0; i <= max; i++) {
    seriesGrouped[i] = []
    originDatas[i] = []
  }

  for (let i = 0; i < _option.series.length; i++) {
    const e = _option.series[i]
    seriesGrouped[e.xAxisIndex].push(e)
  }

  for (let i = 0; i < seriesGrouped.length; i++) {
    // 坐标轴上的数据 列数
    const axisCount = linq.from(seriesGrouped[i]).firstOrDefault()
    if (axisCount === null) continue
    for (let j = 0; j < axisCount.data.length; j++) {
      const temp = []
      // 每列有多少个堆积块
      for (let k = 0; k < seriesGrouped[i].length; k++) {
        const val = seriesGrouped[i][k].data[j]
        temp[k] = val
      }
      originDatas[i].push(temp)
    }
  }
  return originDatas
}

function getLabelPosition(_option) {
  if (_option.series.length > 0) {
    if (linq.from(_option.series).any((c) => c.label === undefined || c.label.position === undefined)) {
      return constants.BarChartDataPositionNames.Center
    }
    let rtl = ''
    const i = linq
      .from(_option.series)
      .select((c) => c.label.position)
      .firstOrDefault()
    if (linq.from(_option.series).count((c) => c.label.position === i) === _option.series.length) {
      rtl = i
    } else {
      rtl = constants.BarChartDataPositionNames.Center
    }
    return rtl
  }
  return constants.BarChartDataPositionNames.Center
}

function setLabelPosition(_option, pos) {
  if (_option.series.length > 0) {
    _option.series.forEach((c) => {
      if (c.label === undefined) {
        c.label = {
          position: pos,
        }
      } else {
        c.label.position = pos
      }
    })
  }
}
