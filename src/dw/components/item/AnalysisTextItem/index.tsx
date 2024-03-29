import { Stepper } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { ComponentItemProps } from 'dw/control/interface'
import KdCard from 'dw/components/common/KdCard'

const AnalysisTextItem = (item: ComponentItemProps) => {
  return (
    <KdCard item={item} showTitle={false}>
      <div>{item.data}</div>
    </KdCard>
  )
}

export default AnalysisTextItem
