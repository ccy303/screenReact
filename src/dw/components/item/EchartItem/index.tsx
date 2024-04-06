import React, { useMemo, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import KdCard from 'dw/components/common/KdCard'
import _ from 'lodash'

const Chart = (item: any) => {
  const { c } = item
  const { config } = c
  const { charts } = config

  const chartOption = {
    ...charts,
    dataset: {
      source: [
        ['银行类别', '账户数量'],
        ['工商银行', 7563],
        ['江苏银行', 1124],
        ['结算中心类', 642],
      ],
    },
    series: charts.series.map((v: any) => {
      return {
        ...v,
        type: item.type,
      }
    }),
  }

  const showTitle = useMemo(() => item && item.c && item.c.title && item.c.title.show, [item])

  const ref: any = useRef(null)

  return (
    <KdCard item={item} showTitle={showTitle}>
      <ReactECharts style={{ width: '100%', height: '100%' }} option={{ ...chartOption }} ref={ref} />
    </KdCard>
  )
}

export default Chart
