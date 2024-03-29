import i18n from 'dw/api/I18n'
import * as constants from 'dw/api/Constants'
import comm from 'dw/api/Common'

export const legendPositionDefault = [
  { id: 'c.config.charts.legend.left', changeValue: 'auto' },
  { id: 'c.config.charts.legend.right', changeValue: 'auto' },
  { id: 'c.config.charts.legend.top', changeValue: 'auto' },
  { id: 'c.config.charts.legend.bottom', changeValue: 'auto' },
  { id: 'c.config.charts.legend.align', changeValue: 'auto' },
  { id: 'c.config.charts.legend.orient', changeValue: 'horizontal' },
]

export const legendPosition0 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.left', changeValue: 'left' },
  { id: 'c.config.charts.legend.align', changeValue: 'left' },
]

export const legendPosition1 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.right', changeValue: 'left' },
  { id: 'c.config.charts.legend.align', changeValue: 'right' },
]

export const legendPosition2 = [...legendPositionDefault]

export const legendPosition3 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.left', changeValue: 'left' },
  { id: 'c.config.charts.legend.align', changeValue: 'left' },
  { id: 'c.config.charts.legend.orient', changeValue: 'vertical' },
]

export const legendPosition4 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.right', changeValue: 'right' },
  { id: 'c.config.charts.legend.align', changeValue: 'right' },
  { id: 'c.config.charts.legend.orient', changeValue: 'vertical' },
]

export const legendPosition5 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.left', changeValue: 'left' },
  { id: 'c.config.charts.legend.top', changeValue: '35%' },
  { id: 'c.config.charts.legend.align', changeValue: 'left' },
  { id: 'c.config.charts.legend.orient', changeValue: 'vertical' },
]

export const legendPosition6 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.right', changeValue: 'right' },
  { id: 'c.config.charts.legend.top', changeValue: '35%' },
  { id: 'c.config.charts.legend.align', changeValue: 'right' },
]

export const legendPosition7 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.left', changeValue: 'left' },
  { id: 'c.config.charts.legend.bottom', changeValue: '0' },
]

export const legendPosition8 = [...legendPositionDefault, { id: 'c.config.charts.legend.bottom', changeValue: '0' }]

export const legendPosition9 = [
  ...legendPositionDefault,
  { id: 'c.config.charts.legend.right', changeValue: 'left' },
  { id: 'c.config.charts.legend.bottom', changeValue: '0' },
  { id: 'c.config.charts.legend.align', changeValue: 'right' },
  { id: 'c.config.charts.legend.orient', changeValue: 'vertical' },
]

export const getUpdateArray = (arr: any[] = []) => {
  return arr.map((d: any) => ({
    name: i18n.msg(d?.labelId) || d?.label || d?.name || d,
    value: d?.value,
  }))
}

export const showLoading = (ref: any) => {
  if (ref && ref.current) {
    const instance = ref.current.getEchartsInstance()
    instance.showLoading({
      text: i18n.msg('c1'),
      color: '#999999',
      textColor: '#666666',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0,
      // 字体大小。从 `v4.8.0` 开始支持。
      fontSize: 12,
      // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
      showSpinner: true,
      // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
      spinnerRadius: 10,
      // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
      lineWidth: 2,
      // 字体粗细。从 `v5.0.1` 开始支持。
      fontWeight: 'normal',
      // 字体风格。从 `v5.0.1` 开始支持。
      fontStyle: 'normal',
      // 字体系列。从 `v5.0.1` 开始支持。
      fontFamily: 'sans-serif',
    })
  }
}

export const hideLoading = (ref: any) => {
  if (ref && ref.current) {
    const instance = ref.current.getEchartsInstance()
    instance.hideLoading()
  }
}

export const getPieTooltipFormat = (a: any, item: any) => {
  const value = comm.formatAmount(a.value, item.c.config.unit) + comm.getCompany(item.c.config.unit)
  let dtl = ''
  if (a.data.detailName) dtl = ` - ${a.data.detailName}`
  return `<div class="showBox">
            <div>${a.name}${dtl}</div>
            <div class="showBoxLine">
              ${a.marker}
              <span>${value}  ${(a.percent || '0').toFixed(item.c.config.digitalFormat.decimalPlace)}%</span>
            </div>
          </div>`
}
