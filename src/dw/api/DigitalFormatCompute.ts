/**
 * 数据格式计算合集
 */

// @ts-nocheck
import comm from './Common'

export function getFormatter(val, config) {
  let digital = 0
  try {
    digital = Number(val)
  } catch (error) {
    return val
  }
  let result = digital
  if (!config) return result
  if (!config.unit) config.unit = 1
  const unitItem = config.unit
  if (!config.unitarea) config.unitarea = 1
  const unitAreaItem = config.unitarea
  if (config.digitalType != 'percent') {
    const v = parseFloat(result / unitItem)
    result = Number(v)
  }
  result = result.toFixed(config.decimalPlace)
  if (config.decimalPlace == 0) result = parseInt(result)
  else result = parseFloat(result)
  if (config.enableThousands) {
    result = setThousands(result)
  }
  if (config.digitalType === 'currency') {
    result = config.currencySymbols + result
  } else if (config.digitalType === 'percent') {
    result = numMulti(result, 100)
    result += '%'
  }
  // 标题单位如下数值不显示单位
  const unitAreaItemArea = [2, 3, 4, 5, 6, -1]
  if (config.digitalType != 'percent' && unitAreaItemArea.indexOf(unitAreaItem) === -1) {
    result += comm.getCompany(unitItem)
  }
  return result
}

/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1被乘数 | num2乘数
 */
function numMulti(num1, num2) {
  let baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {
    /* empty */
  }
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {
    /* empty */
  }
  return (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) / Math.pow(10, baseNum)
}

export function getPieFormatter(a, config) {
  const dataValue = getFormatter(a.value, config)
  const classfication = a.name
  const percent = `${a.percent.toFixed(2)}%`
  if (config.dataLabelType === 'total') {
    return percent
  }
  if (config.dataLabelType === 'classificationtotal') {
    return `${classfication}\n${percent}`
  }
  if (config.dataLabelType === 'classificationdatavalue') {
    return `${classfication}\n${dataValue}`
  }
  if (config.dataLabelType === 'datavaluetotal') {
    return `${dataValue}(${percent})`
  }
  return dataValue
}

export function getBarFormatter(a, config) {
  const dataValue = getFormatter(a.value, config)
  const classfication = a.seriesName
  if (config.dataLabelType === 'classificationdatavalue') {
    if (a.seriesType === 'line') {
      return `${classfication} ${dataValue}`
    }
    return `${classfication}\n${dataValue}`
  }
  return dataValue
}

export function getBarPesentFormatter(a, item) {
  let sum = 0
  const config = item.c.config.digitalFormat
  const index = a.dataIndex
  if (item.c.config.charts) {
    for (const tm of item.c.config.charts.series) {
      if (tm.data) {
        sum += tm.data[index]
      }
    }
  }
  const percent = `${((a.value / sum) * 100.0).toFixed(2)}%`
  const dataValue = getFormatter(a.value, config)
  const classfication = a.seriesName
  if (config.dataLabelType === 'total') {
    return percent
  }
  if (config.dataLabelType === 'classificationtotal') {
    return `${classfication}\n${percent}`
  }
  if (config.dataLabelType === 'classificationdatavalue') {
    return `${classfication}\n${dataValue}`
  }
  if (config.dataLabelType === 'datavaluetotal') {
    return `${dataValue}(${percent})`
  }
  return dataValue
}

export function getPercentBarFormatter(a, config) {
  const dataValue = `${a.value.toFixed(2)}%`
  const classfication = a.seriesName
  if (config.dataLabelType === 'classificationtotal') {
    return `${classfication}\n${dataValue}`
  }
  return dataValue
}

export function getFunnulFormatter(a, item) {
  const config = item.c.config.digitalFormat
  let dataValue
  if (item.data === undefined || item.data === null || item.data.length === 0) {
    dataValue = a.value
  } else {
    item.data.forEach((element) => {
      if (element.name === a.name) {
        dataValue = element.value
      }
    })
  }

  const comPercentage = `${a.value.toFixed(2)}%`
  const classfication = a.name
  if (config.dataLabelType === 'datavalue') {
    return dataValue
  }
  if (config.dataLabelType === 'classificationComPercentage') {
    return `${classfication}\n${comPercentage}`
  }
  if (config.dataLabelType === 'classificationDatavalue') {
    return `${classfication}\n${dataValue}`
  }
  if (config.dataLabelType === 'datavalueComPercentage') {
    return `${dataValue}(${comPercentage})`
  }
  return comPercentage
}

function setThousands(num) {
  num = num.toString().split('.') // 分隔小数点
  const arr = num[0].split('').reverse() // 转换成字符数组并且倒序排列
  let res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(',') // 添加分隔符
    }
    res.push(arr[i])
  }
  res.reverse() // 再次倒序成为正确的顺序
  if (num[1]) {
    // 如果有小数的话添加小数部分
    res = res.join('').concat(`.${num[1]}`)
  } else {
    res = res.join('')
  }
  return res
}

export function isNotNaN(value) {
  return typeof value === 'number' && !isNaN(value)
}
