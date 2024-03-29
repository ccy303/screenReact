import { TYPE_PIE, TYPE_TEXT } from 'dw/api/Constants'

import AnalysisTextItem from 'dw/components/item/AnalysisTextItem'

import AnalysisPieChartPieItem from 'dw/components/item/AnalysisPieChartPieItem'

const itemMap = {
  [TYPE_TEXT.type]: AnalysisTextItem,
  [TYPE_PIE.type]: AnalysisPieChartPieItem,
}

export default itemMap
