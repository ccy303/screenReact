import React, { FC, useCallback, useMemo, useState } from 'react'
import { Button, Icon, Input, Tree } from '@kdcloudjs/kdesign'
import NavCard from 'dw/components/common/NavCard'
import i18n from 'dw/api/I18n'
import useMain, { ModuleProps } from 'dw/store/useMain'
import { prefixClsLeft } from 'dw/views/Design/layout/Left/index'

export const LEFT_LIST = [
  { name: i18n.msg('design7'), value: 'data' },
  { name: i18n.msg('design1'), value: 'design' },
]

export type CompModuleProp = {
  moduleList: ModuleProps[]
}

const CompModule = React.memo(({ moduleList }: CompModuleProp) => {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [valueSearch, setValueSearch] = useState<string>('')

  const getModuleList = useCallback(() => {
    const map: any = {}
    const ret: ModuleProps[] = []

    moduleList.forEach((d) => {
      map[d.id] = { ...d, title: '', icon: <div>{d.name}</div>, key: d.id, children: [] }
    })

    moduleList.forEach((d) => {
      const { id } = d
      const { parent } = d

      if (parent === '0') {
        ret.push(map[id])
      } else {
        if (!map[parent]) {
          map[parent] = {
            children: [],
          }
        }
        map[parent].children.push(map[id])
      }
    })

    return ret
  }, [moduleList])

  return (
    <NavCard
      title={i18n.msg('design2')}
      operate={
        showSearch ? (
          <div className={`${prefixClsLeft}-input`}>
            <Input size="small" onChange={(e) => setValueSearch(e.target.value)} />
            <Icon type="search" onClick={() => setShowSearch(!showSearch)} />
          </div>
        ) : (
          <Icon style={{ cursor: 'pointer' }} type="search" onClick={() => setShowSearch(!showSearch)} />
        )
      }
    >
      <div className={`${prefixClsLeft}-container`} style={{ minHeight: 200 }}>
        <Tree
          showIcon
          virtual={false}
          defaultExpandAll
          treeData={getModuleList()}
          // @ts-ignore
          filterTreeNode={(n) => n.title.includes(valueSearch)}
          filterValue={valueSearch}
        />
      </div>
    </NavCard>
  )
})

export default CompModule
