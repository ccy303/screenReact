/**
 * 组件相关公共方法
 */
// @ts-nocheck
import * as constants from './Constants'
import * as i18n from './I18n'

let maxPageWidth = constants.defaultPageWidth
let maxPageHeight = constants.defaultPageHeight

let compCount

function getDefaultWidth(type) {
  return constants.TYPEARRAY[type].defaultWidth
}

function getDefaultHeight(type) {
  return constants.TYPEARRAY[type].defaultHeight
}

function calcNewItemPos(items, type) {
  let newX = -99999
  let newY = -99999
  let maxY = 0
  let maxItem = null
  const width = getDefaultWidth(type)
  const height = getDefaultHeight(type)
  if (items.length !== 0) {
    items.forEach((item) => {
      if (item.y > newY) {
        newY = item.y
        maxItem = item
        if (item.y + item.h + constants.fixGrid >= maxY) {
          maxY = item.y + item.h + constants.fixGrid
        }
      } else if (item.y === newY && maxItem && item.x > maxItem.x) {
        maxItem = item
        if (item.y + item.h + constants.fixGrid >= maxY) {
          maxY = item.y + item.h + constants.fixGrid
        }
      }
    })
  } else {
    return [10, 10]
  }
  if (maxItem) {
    newX = maxItem.x + maxItem.w + constants.fixGrid
  } else {
    return [newX, newY]
  }
  if (newX + width > maxPageWidth) {
    newX = 10
    newY = maxY
  }
  if (newY + height > maxPageHeight) {
    newY = 10
  }
  if (newX === 10 && newY === 10) {
    for (let i = 0; i < items.length; i++) {
      let flagX = false
      let flagY = false
      if (items[i].x + items[i].w + width + constants.fixGrid <= maxPageWidth) {
        flagX = true
      }
      if (items[i].y + items[i].h + height + constants.fixGrid <= maxPageHeight) {
        flagY = true
      }
      if (flagX && flagY) {
        let newComp = { x: items[i].x + items[i].w + constants.fixGrid, y: items[i].y, width, height }
        if (!checkCollision(newComp, items)) {
          return [newComp.x, newComp.y]
        }
        newComp = { x: items[i].x, y: items[i].y + items[i].h + constants.fixGrid, width, height }
        if (!checkCollision(newComp, items)) {
          return [newComp.x, newComp.y]
        }
      }
    }
  }
  // 判断当前位置是否会与其他组件重叠，重叠直接放入[10, 10]
  const newcomp1 = { x: newX, y: newY, width, height }
  if (!checkCollision(newcomp1, items)) {
    return [newX, newY]
  }
  return [10, 10]
}

function isCollision(rect1, rect2) {
  return rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top
}

function checkCollision(newComponent, existingComponents) {
  const newRect = {
    left: newComponent.x,
    right: newComponent.x + newComponent.width,
    top: newComponent.y,
    bottom: newComponent.y + newComponent.height,
  }
  const flag = []
  for (const existingComponent of existingComponents) {
    const existingRect = {
      left: existingComponent.x,
      right: existingComponent.x + existingComponent.w,
      top: existingComponent.y,
      bottom: existingComponent.y + existingComponent.h,
    }
    if (!isCollision(newRect, existingRect)) {
      flag.push(false)
    }
  }
  if (flag.length === existingComponents.length) {
    flag.forEach((a) => {
      if (a) {
        return true
      }
    })
  } else {
    return true
  }
  return false
}

function calcSubTabPos(items, pid) {
  const itemSize = getSameLevelItems(items, pid).length
  const newX = 10 * itemSize
  const newY = 10 * itemSize
  return [newX, newY]
}

function setPageWidth(pageWidth) {
  maxPageWidth = pageWidth
}

function setPageHeight(pageHeight) {
  maxPageHeight = pageHeight
}

function initCompCount(initCount) {
  compCount = initCount
}

function getCompCount() {
  return compCount++
}

function getCompId() {
  return guid()
}

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

function getCompLongId() {
  return `${Math.random() * 10000000000000000000}`
}

function formatAmount(amount, unit) {
  return `${parseFloat((parseFloat(amount) / unit).toFixed(2))}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getNum(a) {
  let num = 0
  if (Array.isArray(a)) {
    for (let i = 0; i < a.length; i++) {
      if (a[i].value > 0) {
        num += a[i].value
      }
    }
  }
  return num
}

function getPercent(value, num, amount, type) {
  if (
    constants.TYPE_AREATA_BAR.type == type ||
    constants.TYPE_POLYLINE_STACK_BAR.type == type ||
    constants.TYPE_POLYLINE_AREATA_BAR.type == type ||
    constants.TYPE_AREATA_BAR_CHART.type == type ||
    constants.TYPE_STACK_SQUARE.type == type ||
    // eslint-disable-next-line eqeqeq
    constants.TYPE_POLYLINE.type == type
  ) {
    return ''
  }
  return `  (${((value / num) * 100.0).toFixed(amount)}%)`
}

function formatPercent(amount) {
  return `${parseFloat((parseFloat(amount) * 100).toFixed(4))}%`
}

function getCompany(unit) {
  let str = ''
  if (unit === 1000) {
    str = i18n.msg('units1')
  } else if (unit === 10000) {
    str = i18n.msg('units2')
  } else if (unit === 1000000) {
    str = i18n.msg('units3')
  } else if (unit === 10000000) {
    str = i18n.msg('units4')
  } else if (unit === 100000000) {
    str = i18n.msg('units5')
  }
  return str
}

function calcFontNum(width, height, calcMaxNum) {
  let calcNum = (width - 450) / 20 - (height - 200) / 25 + 4
  if (calcNum < 4) {
    calcNum = 4
  } else if (calcNum > calcMaxNum) {
    calcNum = calcMaxNum
  }
  return calcNum
}
// 修改数据图表间距的方法
function calcGrid(width, height, config, calcNum, type) {
  // eslint-disable-next-line no-shadow
  let calcGrid = {}
  if (!config.show) {
    calcGrid = {
      top: type === 'pie' ? 40 : 70,
      left: '5%',
      right: '5%',
      bottom: 2,
    }
    return calcGrid
  }

  if (config.top === 'top') {
    calcGrid = {
      top: type === 'pie' ? 40 : 70,
      left: '5%',
      right: '5%',
      bottom: 2,
    }
  } else if (config.top === 'bottom') {
    calcGrid = {
      top: type === 'pie' ? 40 : 70,
      left: '5%',
      right: '5%',
      bottom: 25,
    }
  } else if (config.left === 'left') {
    calcGrid = {
      top: type === 'pie' ? 40 : 70,
      left: type === 'pie' ? 15 * calcNum + 80 : 15 * calcNum + 40,
      right: type === 'pie' ? '3%' : '5%',
      bottom: 2,
    }
  } else if (config.left === 'right') {
    calcGrid = {
      top: type === 'pie' ? 40 : 70,
      left: type === 'pie' ? '3%' : '5%',
      right: type === 'pie' ? 15 * calcNum + 80 : 15 * calcNum + 40,
      bottom: 2,
    }
  }
  return calcGrid
}

// 构造树型结构
function toTree(items, pid, result) {
  items.sort((a, b) => a.level - b.level)
  const newItems = copyItems(items)
  newItems.map((item, index) => {
    if (item.pid === pid) {
      const children = this.toTree(newItems, item.id, [])
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  })
  return result
}

// 简化树型结构数据
function copyItems(items) {
  const newItems = []
  items.forEach((item) => {
    const newItem = {
      id: item.id,
      pid: item.pid,
      name: item.name,
      active: item.active,
      type: item.type,
      level: item.level,
    }
    newItems.push(newItem)
  })
  return newItems
}

// 刷新页签的关联条件
function refreshTabItem(items, subTabId, pid) {
  items.forEach((item) => {
    if (item.id === pid) {
      item.c.currTabId = subTabId
    }
  })
}

// 获取同一级的节点
function getSameLevelItems(items, pid) {
  const index = items.findIndex((e) => e.id === pid)
  if (index < 0) {
    return []
  }
  const item = items[index]
  return items.filter((e) => e.pid === item.id)
}

// 求差集的方法
function getDifferentArr(arr1, arr2) {
  if (!arr1 || !arr1.length) {
    return []
  }
  if (!arr2 || !arr2.length) {
    return arr1 || []
  }
  const diffArr = []
  arr1.forEach((item) => {
    if (!arr2.some((e) => e.id === item.id)) {
      diffArr.push(item)
    }
  })
  return diffArr
}

// 全屏封装
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

// 退出全屏封装
function exitFullscreen(document) {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

// 检查全屏
function checkFullscreen(document) {
  // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
  // 火狐浏览器
  let isFull =
    document.mozFullScreen ||
    document.fullScreen ||
    // 谷歌浏览器及Webkit内核浏览器
    document.webkitIsFullScreen ||
    document.webkitRequestFullScreen ||
    document.mozRequestFullScreen ||
    document.msFullscreenEnabled
  if (isFull === undefined) {
    isFull = false
  }
  return isFull
}

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = `normal ${font}px arial`
  const metrics = context.measureText(text)
  return metrics.width
}

function topItem(items) {
  if (!items) return []
  let index = items.length
  if (index > 0) {
    for (let i = 0; i < items.length; i++) {
      items[i].index = index--
      items[i].level = i + 1
    }
    const finalItems = items.filter((item) => item.pid === '0')
    return finalItems
  }
  return []
}

export default {
  setPageHeight,
  setPageWidth,
  initCompCount,
  getCompId,
  getCompCount,
  getCompLongId,
  getDefaultWidth,
  calcNewItemPos,
  formatAmount,
  getNum,
  getPercent,
  formatPercent,
  getCompany,
  calcFontNum,
  calcGrid,
  toTree,
  refreshTabItem,
  getSameLevelItems,
  calcSubTabPos,
  getDifferentArr,
  launchFullscreen,
  exitFullscreen,
  checkFullscreen,
  getTextWidth,
  topItem,
}
