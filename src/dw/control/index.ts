import { TYPE_PIE, TYPE_TEXT } from 'dw/api/Constants'

import analysisText from 'dw/control/config/analysisText'

import analysisPieChartPie from 'dw/control/config/analysisPieChartPie'

export const controlMap: any = {
  [TYPE_TEXT.type]: analysisText,
  [TYPE_PIE.type]: analysisPieChartPie,
}
