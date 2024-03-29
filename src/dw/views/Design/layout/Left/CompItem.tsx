import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Icon, Input, Tree } from '@kdcloudjs/kdesign'
import NavCard from 'dw/components/common/NavCard'
import i18n from 'dw/api/I18n'
import useMain from 'dw/store/useMain'
import { ComponentItemProps } from 'dw/control/interface'
import { prefixClsLeft } from 'dw/views/Design/layout/Left/index'

const CompItem = () => {
  const { itemList } = useMain()

  const getItemList = useCallback(() => {
    const map: any = {}
    const ret: ComponentItemProps[] = []

    itemList.forEach((d) => {
      const t = {
        ...d,
        title: '',
        icon: (
          <div className={`${prefixClsLeft}-comp-item-item`}>
            <Icon type="arrow-right-solid" />
            <img className={`${prefixClsLeft}-comp-item-img`} src={require(`assets/img/${d.type}.png`)} />
            {d.name}
          </div>
        ),
        key: d.id,
        children: [],
      }
      map[d.id] = t
      ret.push(t)
    })

    // itemList.forEach((d) => {
    //   const { id } = d
    //   const { parent } = d
    //
    //   if (parent === '0') {
    //     ret.push(map[id])
    //   } else {
    //     if (!map[parent]) {
    //       map[parent] = {
    //         children: [],
    //       }
    //     }
    //     map[parent].children.push(map[id])
    //   }
    // })

    return ret
  }, [itemList])

  return (
    <NavCard
      title={i18n.msg('design5')}
      operate={
        <div>
          <Icon type="search" />
          <Icon type="search" />
          <Icon type="search" />
        </div>
      }
    >
      <div className={`${prefixClsLeft}-comp-item-main`}>
        <div className={`${prefixClsLeft}-comp-item-top`}>
          <Icon type="address" />
          {i18n.msg('design6')}
        </div>
        <Tree virtual={false} showIcon defaultExpandAll treeData={getItemList() as any} />
      </div>
    </NavCard>
  )
}

export default CompItem
