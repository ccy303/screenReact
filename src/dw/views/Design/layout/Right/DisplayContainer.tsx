import React from 'react'
import useMain from 'dw/store/useMain'
import _ from 'lodash'
import { DEFAULT_REQUEST_PROP } from 'dw/control/common'
import DisplayBox from 'dw/components/display/DisplayBox'
import displayMap from 'dw/components/display'
import { RequestProps } from 'dw/control/interface'
import i18n from 'dw/api/I18n'

export const displayClx = 'dw-design-right-display-view'
export const displayType = 'data'

const DisplayContainer = () => {
  const {
    getCurrentItem,
    getCurrentDisplay,
    changeItem,
    globalConfig: { selectId },
  } = useMain()

  const {
    dataset: { detail = [], request: rst },
  } = getCurrentItem()

  const { display = [], displayDataShow = false } = getCurrentDisplay()
  const request = { ...DEFAULT_REQUEST_PROP, ...(rst || {}) } as RequestProps

  const onSort = (dragNumber: number, hoverNumber: number, item: any = undefined) => {
    if (item) {
      changeItem(
        [
          { prop: `dataset.request.${item.valueProp}`, value: '' },
          { prop: `dataset.request.${item.nameProp}`, value: '' },
        ],
        selectId,
      )
    } else {
      const d: any = _.cloneDeep(detail)
      const dragIndex = d.findIndex((f: any) => f.number === dragNumber)
      const hoverIndex = d.findIndex((f: any) => f.number === hoverNumber)
      d.splice(dragIndex, 1, ...d.splice(hoverIndex, 1, d[dragIndex]))
      changeItem([{ prop: 'dataset.detail', value: d }], selectId)
    }
  }

  const renderBox = () => {
    return detail
      .filter(
        (d: any) =>
          d?.number &&
          !display
            .map((m) => {
              if (m.valueProp in request && request[m.valueProp]) {
                return request[m.valueProp]
              }
              return null
            })
            .includes(d?.number),
      )
      .map((d: any, index: number) => {
        return <DisplayBox onSort={onSort} key={d.number} data={d} index={d.number} />
      })
  }

  return (
    <div>
      <div className={`${displayClx}-form`}>
        {display.map((d) => {
          const { component } = d
          const Component = displayMap[component]
          const props: any = {
            request,
            ...d,
          }
          if (component === 'DisplayItem') {
            props.onSort = onSort
          }

          return <Component key={d.valueProp} {...props} />
        })}
      </div>
      {displayDataShow && (
        <div className={`${displayClx}-data`}>
          <div className={`${displayClx}-data-title`}>{i18n.msg('design10')}</div>
          <div className={`${displayClx}-data-list`}>{renderBox()}</div>
        </div>
      )}
    </div>
  )
}

export default DisplayContainer
