import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Icon, Input, Tree } from '@kdcloudjs/kdesign'
import NavCard from 'dw/components/common/NavCard'
import i18n from 'dw/api/I18n'
import useMain, { ModuleProps } from 'dw/store/useMain'
import { prefixClsLeft } from 'dw/views/Design/layout/Left/index'

const CompDataSet = () => {
  const {
    datasetConfig: { gbDatasetList, localDatasetList },
  } = useMain()

  const list: any = [
    {
      key: '-1',
      title: i18n.msg('dataset13'),
      active: true,
      children: [],
    },
    {
      key: '-2',
      title: i18n.msg('dataset6'),
      active: true,
      children: [],
    },
  ]

  return (
    <NavCard
      title={i18n.msg('dataset8')}
      operate={
        <div className={`${prefixClsLeft}-input`}>
          <Icon type="search" />
        </div>
      }
    >
      <div className={`${prefixClsLeft}-container`} style={{ minHeight: 300 }}>
        <Tree virtual={false} showIcon defaultExpandAll treeData={list} />
      </div>
    </NavCard>
  )
}

export default CompDataSet
