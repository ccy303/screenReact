/**
 * 组件合规校验
 */
// @ts-nocheck
import $_ from 'lodash'
import linq from 'linq'
import * as constants from 'dw/api/Constants'
import * as i18n from './I18n'

export function verifyCheck(items: any) {
  try {
    for (let index = 0; index < items.length; index++) {
      const element = items[index]
      if (
        element.type.startsWith(constants.ComponentsTypePrefix.PIE) ||
        element.type.startsWith(constants.ComponentsTypePrefix.BAR) ||
        element.type.startsWith(constants.ComponentsTypePrefix.LINE) ||
        element.type.startsWith(constants.ComponentsTypePrefix.FUNNEL)
      ) {
        checkCharts(element)
      } else if (element.type == constants.TYPE_TABLE.type) {
        checkTable(element)
      } else if (element.type === constants.TYPE_DATA_POINT.type || element.type === constants.TYPE_DASHBOARD.type) {
        checkDataPoint(element)
      } else if (element.type === constants.TYPE_PIE_RATE.type) {
        checkRatePie(element)
      } else if (constants.TYPE_CHINAMAP.type === element.type) {
        if ($_.isEmpty(element.dataset.id)) {
          throw `${element.name}：${i18n.msg('dataset1')}`
        }
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    }
  }
  return {
    success: true,
    message: null,
  }
}

/**
 * 环形进度图校验
 */
function checkRatePie(element) {
  if ($_.isEmpty(element.dataset)) {
    throw `${element.name}：${i18n.msg('dataset1')}`
  }
  if ($_.isEmpty(element.dataset.targetformula)) {
    throw `${element.name}：${i18n.msg('targetValue')}${i18n.msg('fomlColNotEpt')}`
  }
  if ($_.isEmpty(element.dataset.actualformula)) {
    throw `${element.name}：${i18n.msg('actualValue')}${i18n.msg('fomlColNotEpt')}`
  }
}

function checkCharts(element) {
  if ($_.isEmpty(element.dataset) || $_.isEmpty(element.dataset.id)) {
    throw `${element.name}：${i18n.msg('dataset1')}`
  }

  if ($_.startsWith(element.type, constants.ComponentsTypePrefix.PIE)) {
    if ($_.isEmpty(element.dataset.request.displayValueNumber)) {
      throw `${element.name}：${i18n.msg('dataset2')}`
    }
  } else if ($_.startsWith(element.type, constants.ComponentsTypePrefix.FUNNEL)) {
    if ($_.isEmpty(element.dataset.request.xAxisNumber)) {
      throw `${element.name}：${i18n.msg('categoryCantEmpty')}`
    } else if ($_.isEmpty(element.dataset.request.yAxisNumber)) {
      throw `${element.name}：${i18n.msg('dataset2')}`
    }
  } else if ($_.isEmpty(element.dataset.request.xAxisNumber)) {
    throw `${element.name}：${i18n.msg('dataset3')}`
  } else if ($_.isEmpty(element.dataset.request.yAxisNumber)) {
    throw `${element.name}：${i18n.msg('dataset4')}`
  }
}

function checkTable(element) {
  if ($_.isEmpty(element.dataset)) {
    throw `${element.name}：${i18n.msg('dataset1')}`
  }
  if (linq.from(element.dataset.request.TableColumns).all((c) => c.col_type != constants.DataSet.ColumnType.MONEY)) {
    throw `${element.name}：${i18n.msg('dataset5')}`
  }
  if (linq.from(element.dataset.request.TableColumns).any((c) => c.number === '' || c.number === undefined)) {
    throw `${element.name}：${i18n.msg('cantExsistEmptyColumn')}`
  }
  const nums = []
  const idxs = []
  for (const idx in element.dataset.request.TableColumns) {
    if (element.dataset.request.TableColumns[idx].col_type === '3') {
      idxs.push(idx)
      const checkRes = computeCheckAPI(element.dataset.request.TableColumns[idx].compute)
      if (checkRes !== true) {
        throw `${element.name}：${i18n.msg('tabConfig5')}${Number(idx) + 1}：${i18n.msg(checkRes)}`
      }
    } else if (element.dataset.request.TableColumns[idx].col_type === '2') {
      nums.push(idx)
    }
  }
  idxs.forEach((idx) => {
    element.dataset.request.TableColumns[idx].computed = element.dataset.request.TableColumns[idx].compute
    nums.forEach((t) => {
      const reg = RegExp(`${i18n.msg('tabConfig5')}${Number(t) + 1}(?!\\d)`, 'g')
      element.dataset.request.TableColumns[idx].computed = element.dataset.request.TableColumns[idx].computed.replace(
        reg,
        element.dataset.request.TableColumns[t].number,
      )
    })
    if (element.dataset.request.TableColumns[idx].computed.indexOf(i18n.msg('tabConfig5')) !== -1) {
      throw `${element.name}：${i18n.msg('tabConfig5')}${Number(idx) + 1}：${i18n.msg('colOutRgOrNoMtrcColExt')}`
    }
  })
}

function checkDataPoint(element) {
  if (element.dataset.type === undefined) {
    throw `${element.name}：${i18n.msg('dataset1')}`
  }
  if (element.dataset.type !== '3') {
    return
  }
  if (
    element.dataset.formula === undefined ||
    ($_.has(element, 'dataset.formula') && Object.keys(element.dataset.formula).length === 0)
  ) {
    throw `${element.name}：${i18n.msg('multiDataCantEmpty')}`
  }
  if (element.type !== constants.TYPE_DASHBOARD.type) {
    return
  }
  if (element.c.config.dashboard.targetValueCount === undefined) {
    throw `${element.name}：${i18n.msg('targetNum')}${i18n.msg('notEmpty')}`
  }
  const types = element.c.config.dashboard.datasetTypes
  for (let i = 0; i < element.c.config.dashboard.targetValueCount + 2; i++) {
    if (types[i] === 'dynamic') {
      if (element.c.config.dashboard.datasetFormula[i].id !== undefined) {
        continue
      }
      if (i === 0) {
        throw `${element.name}：${i18n.msg('minValue')}${i18n.msg('notEmpty')}`
      }
      if (i === 1) {
        throw `${element.name}：${i18n.msg('maxValue')}${i18n.msg('notEmpty')}`
      }
      throw `${element.name}：${i18n.msg('aimValue')}${i - 1}${i18n.msg('notEmpty')}`
    } else {
      if (i === 0 && element.c.config.dashboard.min === undefined) {
        throw `${element.name}：${i18n.msg('minValue')}${i18n.msg('notEmpty')}`
      }
      if (i === 1 && element.c.config.dashboard.max === undefined) {
        throw `${element.name}：${i18n.msg('maxValue')}${i18n.msg('notEmpty')}`
      }
      if (i >= 2 && element.c.config.dashboard.aimValues[i - 2] === undefined) {
        throw `${element.name}：${i18n.msg('aimValue')}${i - 1}${i18n.msg('notEmpty')}`
      }
    }
  }
}

/**
 * 将字符串简化,处理操作符、列名、数字、空格、中文括号
 * @param {String} str 源字符串
 * @return {String} str 简化后字符串如(1+1)
 */
function replaceStr(str) {
  str = str.replace(/[-*/]/g, '+')
  str = str.replace(/0$|[1-9][0-9]*/g, '1')
  str = str.replace(RegExp(`${i18n.msg('tabConfig5')}([1-9][0-9]*)`, 'g'), '1')
  str = str.replace(/['（']/g, '(')
  str = str.replace(/['）']/g, ')')
  return str
}

/**
 * 检测字符串公式合法性
 * @param {String} str 源字符串
 * @return {String,Boolean} str 合法或非法原因
 */
function checkFormula(str) {
  const starts = []
  const compute = []
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      starts.push(i)
      compute.push(str[i])
    } else if (str[i] === ')') {
      if (starts.length === 0) {
        return 'leftBracket'
      }
      const start = starts.pop()
      const cSRes = checkSingle(start + 1, compute)
      if (cSRes === true) {
        compute.splice(start, i - start, '1')
      } else {
        return cSRes
      }
    } else if (str[i] === '1' || str[i] === '+') {
      compute.push(str[i])
    } else {
      return 'illegalChar'
    }
  }
  if (starts.length !== 0) {
    return 'rightBracket'
  }
  return checkSingle(0, compute)
}

/**
 * 检测不带括号字符串是否合法
 * @param {Number} i 检测开始的下标
 * @param {string[]} str 源字符串
 * @return {string,Boolean} str 合法或非法原因
 */
function checkSingle(i, str) {
  let end = -1
  const j = str.length
  if (str.length - i < 3) {
    end = i
  } else {
    if (str[i] === '+') {
      i++
    }
    for (let k = i; k < j - 2; k += 2) {
      if (str[k] === '1') {
        if (str[k + 1] === '+') {
          if (str[k + 2] === '1') {
            end = k + 2
          } else {
            return 'rightOpt'
          }
        } else {
          return 'opt'
        }
      } else {
        return 'leftOpt'
      }
    }
  }

  if (end !== -1 && end + 1 < j) {
    if (str[end] === '1') {
      if (end + 1 < j) {
        if (str[end + 1] === '1') {
          return 'opt'
        }
        if (str[end + 1] === '+') {
          return 'rightOpt'
        }
      } else if (str[end + 1] === '1') {
        return 'opt'
      }
    } else if (str[end] === '+') {
      if (end + 1 < j) {
        if (str[end + 1] === '1') {
          return 'leftOpt'
        }
        if (str[end + 1] === '+') {
          return 'left2Right'
        }
      } else {
        return 'rightOpt'
      }
    }
  }
  return true
}

/**
 * 公式校验接口
 * @param {string} str 源公式字符串
 * @return {string,Boolean} str 合法或非法原因
 */
export function computeCheckAPI(str) {
  if (str === undefined || str === '') {
    return 'fomlColNotEpt'
  }
  if (str.indexOf('/0') !== -1) {
    return 'dezeroError'
  }
  if (
    str.charAt(0) === '*' ||
    str.charAt(0) === '/' ||
    str.indexOf('(*') !== -1 ||
    str.indexOf('(/') !== -1 ||
    str.indexOf('（*') !== -1 ||
    str.indexOf('（/') !== -1
  ) {
    return 'leftOpt'
  }
  return checkFormula(replaceStr(str))
}
