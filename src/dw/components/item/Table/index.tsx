import React, { useEffect, useMemo, useRef } from 'react'
import KdCard from 'dw/components/common/KdCard'
import { Table } from '@kdcloudjs/kdesign'
import _ from 'lodash'

const Chart = (item: any) => {
  const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item])

  const ref: any = useRef(null)

  return (
    <KdCard item={item} showTitle={showTitle}>
      <Table style={{ width: '100%', height: '100%' }} dataSource={[]} columns={[]} ref={ref} />
    </KdCard>
  )
}

export default Chart
