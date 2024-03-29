import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Icon, Input, Tree } from '@kdcloudjs/kdesign'
import NavCard from 'dw/components/common/NavCard'
import i18n from 'dw/api/I18n'
import useMain, { ModuleProps } from 'dw/store/useMain'
import { prefixClsLeft } from 'dw/views/Design/layout/Left/index'

const CompVariable = () => {
  const list: any = [
    {
      key: '1',
      title: i18n.msg('var5'),
      active: true,
      children: [], // this.localVarList,
      type: '0',
    },
    {
      key: '2',
      title: i18n.msg('var1'),
      active: true,
      children: [], // this.gbVarList,
      type: '1',
    },
    {
      key: '3',
      title: i18n.msg('var4'),
      active: false,
      children: [], // this.dimList,
      type: '2',
    },
  ]

  return (
    <NavCard
      title={i18n.msg('var3')}
      key={i18n.msg('var3')}
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

export default CompVariable
