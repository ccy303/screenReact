import { atom, useRecoilState } from 'recoil'
import _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { ReactNode } from 'react'
import { DEFAULT_PAGE_CONFIG, pageGroup, pageGroupMap } from 'dw/control/pageControl'
import { DEFAULT_DATASET } from 'dw/control/common'
import {
  ComponentItemProps,
  ControlAction,
  ControlActionDo,
  ControlGroupProps,
  ControlProProps,
  MarkProps,
  PropertiesProps,
} from 'dw/control/interface'
import { ComponentControlMap } from 'dw/views/Design/layout/Left/LeftControl'

let zIndexNumber = 1
let componentNumner = 1

export type GlobalConfigProps = {
  selectId: string
  selectType: string
  pageControl: {
    pageConfig: any
  }
}

export type ChangeItemProps = {
  prop: string
  value: any
  actions?: ControlAction[]
}

export type GroupProps = {
  groups: ControlGroupProps[]
  current: string
  category?: string
}

export type TreeNodeProps = {
  title: string
  key: string
  icon: ReactNode
}

export type ModuleProps = TreeNodeProps & {
  name: string
  number: string
  parent: string
  id: string
  type: string
  moduleType: string
}

export type DatasetProps = TreeNodeProps & {
  number: string
  name: string
  id: string
  parentid: string
}

export type DatasetConfigProps = {
  gbDatasetList: DatasetProps[]
  localDatasetList: DatasetProps[]
}

const globalConfigState = atom<GlobalConfigProps>({
  key: 'global',
  default: {
    selectId: '',
    selectType: '',
    pageControl: {
      pageConfig: DEFAULT_PAGE_CONFIG,
    },
  },
})

const itemListState = atom<ComponentItemProps[]>({
  key: 'itemList',
  default: [],
})

const groupState = atom<GroupProps>({
  key: 'group',
  default: {
    groups: [],
    current: 'data',
  },
})

const propertiesState = atom<PropertiesProps>({
  key: 'properties',
  default: [],
})

const moduleListState = atom<ModuleProps[]>({
  key: 'moduleList',
  default: [],
})

const datasetConfigState = atom<DatasetConfigProps>({
  key: 'dataset',
  default: {
    gbDatasetList: [],
    localDatasetList: [],
  },
})

const useMain = () => {
  const [globalConfig, setGlobalConfig] = useRecoilState<GlobalConfigProps>(globalConfigState)
  const [itemList, setItemList] = useRecoilState<ComponentItemProps[]>(itemListState)
  const [group, setGroup] = useRecoilState<GroupProps>(groupState)
  const [properties, setProperties] = useRecoilState<PropertiesProps>(propertiesState)
  const [moduleList, setModuleList] = useRecoilState<ModuleProps[]>(moduleListState)
  const [datasetConfig, setDatasetConfig] = useRecoilState<DatasetConfigProps>(datasetConfigState)

  const addItem = (c: any, sources: any = {}) => {
    const { category } = c
    const controlProps: any = _.cloneDeep(ComponentControlMap[category])
    console.log(controlProps)
    const rootId = uuidv4().replace(/-/g, '')
    let item: any = {}
    const { group: grp } = controlProps
    grp.forEach((g: any, i: any) => {
      const { properties: pros } = g
      pros.forEach((p: any) => {
        const { nodes } = p
        nodes.forEach((n: any) => {
          const { id, editor } = n
          _.set(item, id, editor?.defaultValue)
        })
      })
      if (i === 0) {
        setProperties(pros)
      }
    })
    if (!_.isEmpty(sources)) {
      item = _.merge(item, sources)
    }
    item = {
      ...item,
      zIndex: zIndexNumber++,
      name: c.name + componentNumner++,
      t: moment().format('yyyy-MM-DD HH:mm:ss'),
      id: rootId,
      type: c.componentType,
      category,
      kdId: '',
    }
    setGroup({ groups: grp, current: grp[0].id, category })
    setItemList([...itemList, item])
    setGlobalConfig({ ...globalConfig, selectId: rootId })
  }

  const addItemWithType = (item: any, sources: any = {}) => {
    addItem(item, sources)
  }

  const changeStatusAndProp = (
    dos: ControlActionDo[],
    currentProp: ControlProProps[],
    currentItem: any,
    v: any = undefined,
  ) => {
    dos.forEach((d) => {
      const { id, changeId = '', changeType = 'value', changeValue } = d
      if (changeType === 'node' || changeType === 'group') {
        currentProp.forEach((cpd: ControlProProps) => {
          if (changeType === 'node') {
            cpd.nodes.forEach((cpdd) => {
              if (cpdd.id === id) {
                _.set(cpdd, changeId, changeValue)
              }
            })
          } else if (cpd.id === id) {
            _.set(cpd, changeId, changeValue)
          }
        })
      } else if (changeType === 'together') {
        _.set(currentItem, changeId || id, v)
      } else {
        _.set(currentItem, changeId || id, changeValue)
      }
    })
  }

  const changeByAction = (actions: ControlAction[], currentProp: ControlProProps[], currentItem: any, v: any) => {
    if (actions.length) {
      actions.forEach((a) => {
        const { condition, todo = [], elseTodo = [] } = a
        let mark: MarkProps = '='
        let value: any = true
        if (condition) {
          mark = condition.mark as MarkProps
          value = condition.value
        }
        let flag: any = null

        switch (mark) {
          case 'in':
            flag = v.includes(value)
            break
          case 'noEmpty':
            break
          case '>':
            break
          case '>=':
            break
          case '<':
            break
          case '<=':
            break
          case 'together':
            flag = true
            break
          default:
            if (condition) {
              flag = v === value
            } else {
              flag = !!v
            }
            break
        }

        if (flag === true) {
          if (todo.length) {
            changeStatusAndProp(todo, currentProp, currentItem, v)
          }
        } else if (flag === false && elseTodo.length) {
          changeStatusAndProp(elseTodo, currentProp, currentItem, v)
        }
      })
    }
  }

  const getCurrentItem = (rid = ''): ComponentItemProps => {
    const rootId = rid || globalConfig.selectId
    const currentItem = itemList.filter((f: any) => f.id === rootId)[0]
    return currentItem ? _.cloneDeep(currentItem) : _.cloneDeep({ dataset: DEFAULT_DATASET })
  }

  const changeItem = (arr: ChangeItemProps[] = [], rootId = '', showObj: any = {}) => {
    const cloneGrs: any = _.cloneDeep(group.groups)
    const currentProp = cloneGrs.filter((f: any) => f.id === group.current)[0].properties
    let cloneItl: any = []
    let currentItem: any = {}
    if (rootId) {
      cloneItl = _.cloneDeep(itemList)
      currentItem = cloneItl.filter((f: any) => f.id === rootId)[0]
    } else {
      currentItem = _.cloneDeep(globalConfig.pageControl)
    }
    const { showId, show, actions: as } = showObj
    if (showId) {
      currentProp.forEach((cpd: ControlProProps) => {
        if (cpd.id === showId) {
          _.set(cpd, 'show.value', show)
        }
      })
      changeByAction(as, currentProp, currentItem, show)
    } else {
      arr.forEach(({ prop, value, actions = [] }) => {
        _.set(currentItem, prop, value)
        changeByAction(actions, currentProp, currentItem, value)
      })
    }

    if (rootId) {
      setItemList(cloneItl)
    } else {
      setGlobalConfig({ ...globalConfig, pageControl: currentItem })
    }
    setGroup({ ...group, groups: cloneGrs })
    setProperties(currentProp)

    console.log('changeItem', arr, rootId, currentItem)
  }

  const selectItem = (rootId: string) => {
    if (globalConfig.selectId !== rootId) {
      const cloneItemList = _.cloneDeep(itemList)
      const currentItem = cloneItemList.filter((f: any) => f.id === rootId)[0]
      const category = currentItem.category
      _.set(currentItem, 'zIndex', zIndexNumber++)
      // @ts-ignore
      const currentProp: ControlGroupProps[] = _.cloneDeep(ComponentControlMap[category]).group

      currentProp.forEach((g, i) => {
        const { properties: pros } = g
        pros.forEach((p) => {
          const { nodes } = p
          nodes.forEach((n) => {
            const { id, actions = [] } = n
            changeByAction(actions, pros, currentItem, _.get(currentItem, id))
          })
        })

        if (i === 0) {
          setProperties(pros)
        }
      })
      console.log('selectItem', rootId, currentItem, currentProp, cloneItemList)
      setItemList(cloneItemList)
      setGroup({ groups: currentProp, current: currentProp[0].id, category })
      setGlobalConfig({ ...globalConfig, selectId: currentItem.id })
    }
  }

  const changeGroupCurrent = (g: string) => {
    if (g !== group.current) {
      setGroup({ ...group, current: g })
      const cg = group.groups.filter((f: any) => f.id === g)
      setProperties(cg[0].properties)
    }
  }

  const selectPageGroup = (init = false) => {
    if (init || globalConfig.selectId !== '') {
      let pageItem: any = {}
      if (!init) {
        pageItem = _.cloneDeep(globalConfig.pageControl)
      }
      const pageProp: ControlGroupProps[] = _.cloneDeep(pageGroup)

      pageProp.forEach((g, i) => {
        const { properties: pros } = g
        pros.forEach((p) => {
          const { nodes } = p
          nodes.forEach((n) => {
            const { id, actions = [], editor } = n

            if (init) {
              _.set(pageItem, id, editor?.defaultValue)
              changeByAction(actions, pros, pageItem, editor?.defaultValue)
            } else {
              changeByAction(actions, pros, pageItem, _.get(pageItem, id))
            }
          })
        })

        if (i === 0) {
          setProperties(pros)
        }
      })
      pageItem = { ...pageItem, ...globalConfig.pageControl }
      setGroup({ groups: pageProp, current: pageProp[0].id, category: pageProp[0].id })
      setGlobalConfig({ ...globalConfig, pageControl: pageItem, selectId: '' })
    }
  }

  const formatData = (data: any, map = pageGroupMap) => {
    const ret: any = _.cloneDeep(data)
    if (data) {
      map.forEach((v, k) => {
        if (_.has(ret, k)) {
          const value = _.get(ret, k)
          if (v === 'number' && typeof value !== 'number') {
            _.set(ret, k, Number(value))
          }
        }
      })
    }
    return ret
  }

  const initPage = (data: any) => {
    const { itemList: it, pageConfig } = data
    setItemList(it)
    setGlobalConfig({
      ...globalConfig,
      pageControl: formatData({ pageConfig }),
    })
  }

  // 设置echart 数据
  const changeDataSet = (data: any, rootId = '') => {
    const cloneItl = _.cloneDeep(itemList)
    const currentItem = cloneItl.filter((f: any) => f.id === rootId)[0]
    _.set(currentItem, data.prop, data.value)
    setItemList(cloneItl)
  }

  return {
    initPage,
    itemList,
    properties,
    moduleList,
    datasetConfig,
    setDatasetConfig,
    setModuleList,
    setItemList,
    addItem,
    globalConfig,
    setGlobalConfig,
    changeItem,
    changeDataSet,
    group,
    changeGroupCurrent,
    selectPageGroup,
    selectItem,
    addItemWithType,
    getCurrentItem,
  }
}

export default useMain
