import React, { FC, memo } from 'react'
import { useDrop } from 'react-dnd'
import { displayClx, displayType } from 'dw/views/Design/layout/Right/DisplayContainer'
import DisplayBox from 'dw/components/display/DisplayBox'
import { Input, Select } from '@kdcloudjs/kdesign'
import { getUpdateArray } from 'dw/api'
import { DisplayProps, RequestKeys, RequestProps } from 'dw/control/interface'
import i18n from 'dw/api/I18n'
import useMain from 'dw/store/useMain'
import { sortList } from 'dw/api/Constants'

const { Option } = Select

const DisplayItem: FC<
  {
    onSort: any
    request: RequestProps
  } & DisplayProps
> = memo(({ onSort, label, request, valueProp, nameProp, isSort, sortProp, sortCustomProp }) => {
  const {
    changeItem,
    globalConfig: { selectId },
  } = useMain()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [displayType],
    drop: (item: any, monitor) => {
      changeItem(
        [
          { prop: `dataset.request.${valueProp}`, value: item?.data?.number || '' },
          { prop: `dataset.request.${nameProp}`, value: item?.data?.name || '' },
        ],
        selectId,
      )
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const onChangeSort = (v: any) => {
    changeItem([{ prop: `dataset.request.${sortProp}`, value: v }], selectId)
  }

  const onChangeInput = (v: any) => {
    changeItem([{ prop: `dataset.request.${sortCustomProp}`, value: v.target.value }], selectId)
  }

  const onClick = () => {
    changeItem(
      [
        { prop: `dataset.request.${valueProp}`, value: '' },
        { prop: `dataset.request.${nameProp}`, value: '' },
      ],
      selectId,
    )
  }

  return (
    <div className="form-item">
      <div className="form-label">{label}</div>
      <div ref={drop} data-testid="dustbin" className={`${displayClx}-drop`}>
        {valueProp && request[valueProp] ? (
          <DisplayBox onClick={onClick} onSort={onSort} index={-1} data={{ name: request[nameProp] }} />
        ) : (
          <div className={`${displayClx}-drop-default`}>从数据区拖拽至此处</div>
        )}
      </div>
      {isSort && (
        <>
          <div className="form-select">
            <div>排序</div>
            <div>
              <Select value={request[sortProp as RequestKeys] || ''} onChange={onChangeSort} borderType="bordered">
                {getUpdateArray(sortList).map((d) => {
                  return (
                    <Option key={d.value} value={d.value}>
                      {d.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
          {request[sortProp as RequestKeys] === 'custom' && (
            <div className="form-select">
              <div>自定义</div>
              <div>
                <Input
                  onChange={onChangeInput}
                  value={request[sortCustomProp as RequestKeys] || ''}
                  borderType="bordered"
                  placeholder={i18n.msg('customTip')}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
})

export default DisplayItem
