import $_ from 'lodash'
import { DEFAULT_REQUEST_PROP } from 'dw/control/common'
import * as constants from 'dw/api/Constants'
import linq from 'linq'
import useMain from 'dw/store/useMain'

const usePropsData = () => {
  const {
    globalConfig: {
      selectId,
      selectType,
      pageControl: { pageConfig, queryConfig },
    },
    changeItem,
    initPage,
    getCurrentItem,
    setModuleList,
  } = useMain()
  const currentItem = getCurrentItem()

  const datasetF7Result = (newValue: any) => {
    const ret: any = $_.cloneDeep(newValue.data)
    ret.detail = newValue.data.columns
    delete ret.columns
    ret.request = { ...DEFAULT_REQUEST_PROP }
    if (selectType === constants.TYPE_TABLE.type) {
      const add = linq
        .from(ret.detail)
        .where((c: any) => c.id === 'Compute')
        .firstOrDefault()
      if (!add) {
        const compute = { ...constants.compute }
        const idx = ret.detail.length
        $_.set(ret.detail, idx, compute)
      }
    }

    changeItem([{ prop: 'dataset', value: ret }], selectId)
  }

  const datasetFilter = (newValue: any) => {
    changeItem(
      [
        { prop: 'dataset.datesetFilterItems', value: newValue.data.datesetFilterItems },
        { prop: 'dataset.datesetFilterItemsStr', value: newValue.data.datesetFilterItemsStr },
      ],
      selectId,
    )
  }

  const dimF7Result = (newValue: any) => {
    // 还需要根据itemid&dsid检验下当前是否这个对应组件和数据集
    if ($_.startsWith(newValue.primaryKey, constants.PrimaryKey.DIMF7.QueryComp)) {
      const dimIndex = queryConfig.dimList.findIndex((dim: any) => dim.number === newValue.data.dimNumber)
      if (dimIndex >= 0) {
        const dimFind = $_.cloneDeep(queryConfig.dimList[dimIndex])
        if (dimFind.vartype) {
          dimFind.membername = newValue.data.member.name
          dimFind.membernum = newValue.data.member.number
          dimFind.defaultvalue = newValue.data.member.id
        } else {
          dimFind.member = newValue.data.member
        }
        // this.$set(this.queryConfig.dimList, dimIndex, dimFind)
        changeItem([{ prop: `queryConfig.dimList[${dimIndex}]`, value: dimFind }])
      }
    } else if ($_.startsWith(newValue.primaryKey, constants.PrimaryKey.DIMF7.VariableF7)) {
      const ps = newValue.primaryKey.split('_')
      if (selectId) {
        const varibleMemberIndex = currentItem.dataset.varParams.findIndex((c: any) => c.number === ps[2])
        if (varibleMemberIndex >= 0) {
          const varibleMember = $_.cloneDeep(currentItem.dataset.varParams[varibleMemberIndex])
          varibleMember.modifyvalue = newValue.data.member.number
          varibleMember.modifyvalueid = newValue.data.member.id
          changeItem([{ prop: `dataset.varParams[${varibleMemberIndex}]`, value: varibleMember }], selectId)
        }
      }
    } else if ($_.startsWith(newValue.primaryKey, constants.PrimaryKey.DIMF7.DimF7)) {
      const ps = newValue.primaryKey.split('_')
      if (selectId) {
        const varibleMemberIndex = currentItem.dataset.dimParams.findIndex((c: any) => c.number === ps[2])
        if (varibleMemberIndex >= 0) {
          const varibleMember = $_.cloneDeep(currentItem.dataset.dimParams[varibleMemberIndex])
          varibleMember.member = newValue.data.member
          varibleMember.modifyvalueid = newValue.data.member.id
          changeItem([{ prop: `dataset.dimParams[${varibleMemberIndex}]`, value: varibleMember }], selectId)
        }
      }
    }
  }

  const selectImageResult = (newValue: any) => {
    changeItem([{ prop: 'pageConfig.url', value: newValue.data.url }])
  }

  const dataInit = (newValue: any) => {
    console.log('dataInit', newValue)
  }

  const dataPreview = (newValue: any) => {
    initPage(newValue)
  }

  const updatePropsData = (newValue: any) => {
    console.group('Design propsData newValue: ', newValue)
    let itemName = ''
    if (newValue.data && newValue.data.item && newValue.data.item.name) {
      itemName = newValue.data.item.name
    } else if (newValue.dataType) {
      itemName = newValue.dataType
    }
    console.group('Design propsData newValue: ', itemName)
    console.dir(newValue)
    console.groupEnd()

    if (!newValue.dataType) {
      return
    }

    if (newValue.dataType === constants.PropsDataType.DATA_GETITEMID_RESULT) {
      // doAddItem(newValue.data)
    } else if (newValue.dataType === constants.PropsDataType.DATA_COPY_RESULT) {
      // dataCopyResult(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_CLEAR) {
      // clear()
    } else if (newValue.dataType === constants.PropsDataType.DATA_DS_F7_RESULT) {
      datasetF7Result(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_SAVE) {
      // savePanel()
    } else if (newValue.dataType === constants.PropsDataType.DATA_PREVIEW) {
      // preview(true, constants.PrimaryKey.PREVIEW.Normal)
    } else if (newValue.dataType === constants.PropsDataType.DATA_PREVIEW_RESULT) {
      dataPreview(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_PREVIEW_CLOSE) {
      // dataPreviewResult()
    } else if (newValue.dataType === constants.PropsDataType.DATA_INIT) {
      dataInit(newValue)
      // history.do(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_VAR_REFRESH) {
      // localVarList = newValue.data ? newValue.data : []
    } else if (newValue.dataType === constants.PropsDataType.DATA_DS_REFRESH) {
      // localDatasetList = newValue.data ? newValue.data : []
    } else if (newValue.dataType === constants.PropsDataType.DATA_DS_FILTER_RESULT) {
      datasetFilter(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_DIM_F7_RESULT) {
      dimF7Result(newValue)
    } else if (newValue.dataType === constants.PropsDataType.EVENT_DIM_PARAM_F7_RESULT) {
      // dimCpF7Result(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_MODULE_REFRESH) {
      // moduleList = newValue.data ? newValue.data : []
      setModuleList(newValue.data ? newValue.data : [])
    } else if (newValue.dataType === constants.PropsDataType.DATA_MODULE_ADDITEM_RESULT) {
      // doAddItem({ type: newValue.data.type, itemId: newValue.data.id, copyFrom: 'Module' }, newValue.data)
    } else if (newValue.dataType === constants.PropsDataType.DATA_SELECTIMAGE_RESULT) {
      selectImageResult(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_FULLSCREEN) {
      // comm.launchFullscreen(document.getElementById(guid))
    } else if (newValue.dataType === constants.PropsDataType.DATA_ITEM_REFRESH_RESULT) {
      // responseItemsData(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_DATASET_FORMULA_RESULT) {
      // datasetFormulaResult(newValue)
    } else if (newValue.dataType === constants.PropsDataType.EVENT_INDIVIDUALIZED_SETTING_RWSULT) {
      // responseItemParams(newValue)
    } else if (newValue.dataType === constants.PropsDataType.DATA_UNDO) {
      // undo()
    } else if (newValue.dataType === constants.PropsDataType.DATA_REDO) {
      // redo()
    }
  }

  return {
    updatePropsData,
  }
}

export default usePropsData
