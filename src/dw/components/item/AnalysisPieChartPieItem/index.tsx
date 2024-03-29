import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { ComponentItemProps } from 'dw/control/interface'
import KdCard from 'dw/components/common/KdCard'
import i18n from 'dw/api/I18n'
import _ from 'lodash'
import { getPieTooltipFormat, hideLoading, showLoading } from 'dw/api'
import * as dfc from 'dw/api/DigitalFormatCompute'
import useMain from 'dw/store/useMain'

const BASE_OPTION: any = {
  title: {},
  tooltip: {
    trigger: 'item',
    appendToBody: true,
  },
  textStyle: {
    enable: true,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12',
    color: '#6f6f6f',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '70%',
      startAngle: 0,
      data: [
        { value: 100, name: i18n.msg('firstQuarter') },
        { value: 200, name: i18n.msg('secondQuarter') },
        { value: 300, name: i18n.msg('thirdQuarter') },
        { value: 400, name: i18n.msg('fourthQuarter') },
      ],
      label: {
        show: true,
        position: 'outside',
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}

const AnalysisPieChartPieItem = (item: ComponentItemProps) => {
  const {
    c: {
      config: {
        title,
        charts: { legend, series },
        digitalFormat,
      },
    },
  } = item

  const showTitle = useMemo(() => item && item.c && item.c.title && item.c.title.show, [item])
  const ref: any = useRef(null)

  const initChart = (first = false) => {
    const instance = ref.current.getEchartsInstance()
    if (first) {
      // showLoading(ref)
    }
    const option = _.cloneDeep(BASE_OPTION)
    option.legend = legend
    option.series[0].label = series[0].label
    _.set(option, 'tooltip.formatter', (a: any) => getPieTooltipFormat(a, item))
    _.set(option, 'series[0].label.formatter', (a: any) => dfc.getPieFormatter(a, digitalFormat))
    if (_.isArray(item.data)) {
      // if (this.item.dataset && this.item.dataset.request && this.item.dataset.request.legendDetailNumber) {
      //   this.item.data.forEach(element => {
      //     element.name = element.detailName + " - " + element.name;
      //   });
      // }
      option.series[0].data = item.data
    }
    instance.setOption(option, true)
    // hideLoading(ref)
  }

  useEffect(() => {
    if (ref && ref.current) {
      initChart()
    }
  }, [legend, series, title])

  useEffect(() => {
    initChart(true)
  }, [])

  return (
    <KdCard item={item} showTitle={showTitle}>
      <ReactECharts style={{ width: '100%', height: '100%' }} option={BASE_OPTION} ref={ref} />
    </KdCard>
  )
}

export default AnalysisPieChartPieItem
