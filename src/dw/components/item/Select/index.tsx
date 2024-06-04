import { Select } from "@kdcloudjs/kdesign";
import React, { useMemo, useState, useContext } from "react";
import "./index.less";
import useMain from "@/dw/store/useMain";
import { ViewItemContext } from "dw/views/ViewItem";
import _ from "lodash";

const SelectEditor = (props: any) => {
    const [dataValue, setValue] = useState([]);

    const { customProps } = useContext(ViewItemContext);

    const { itemList, setItemList } = useMain();

    const target: any = itemList.find(v => v.id == props.chartctrl?.split(",")?.[0]);
    const index = target?.dataset?.dataindex?.findIndex?.((v: any) => v[1] == props.chartctrl?.split(",")?.[1]);
  const defaultDataSet = target?.dataset?.rows; 
  const datafilter = target?.datafilter;
  const sortfield = target?.sortfield;
  const firstRow = defaultDataSet?.[0];
  const filterDataSet = datafilter
    ? defaultDataSet.filter((row: any, index: number) => {
      if (index == 0) {
        return true;
      } else {
        for (let i = 0; i < datafilter.length; i++) {
          const { key, selectkey } = datafilter[i];
          if (!selectkey.includes(row[firstRow.indexOf(key)])) {
            return false;
          }
        }
        return true;
      }
    })
    : defaultDataSet;
    let options = filterDataSet?.slice?.(1)?.map((v: any) => v[index]);
  if(options?.length > 1 && sortfield?.length > 0 &&  sortfield.filter((v: any) => v.key == props.chartctrl?.split(",")?.[1])?.length > 0 ){
    const userSelectSortKey = sortfield.filter((v: any) => v.key == props.chartctrl?.split(",")?.[1])?.[0]?.sortkey;
    const userSelectSortType = sortfield.filter((v: any) => v.key == props.chartctrl?.split(",")?.[1])?.[0]?.sorttype;
    const userSelectSortIndex = firstRow.indexOf(userSelectSortKey);
    if(userSelectSortKey && userSelectSortType && userSelectSortIndex >= 0){
      let optionsBeforeSort =  filterDataSet?.slice?.(1).reduce((acc, current) => {
          let findindex = acc.findIndex(item => item[index] == current[index]);
          if (findindex === -1) {
            acc.push(current);
          }
          return acc;
        }, []).map(temprow => [temprow[index], temprow[userSelectSortIndex]]);

      const optionsAfterSort = optionsBeforeSort.sort((a: any, b: any) => {
        if(typeof a[1] === "string" || typeof b[1] === "string"){
          if (userSelectSortType == "asc") {
            return a[1].localeCompare(b[1]);
          } else {
            return b[1].localeCompare(a[1]);
          }
        }else if(typeof a[1] === "number" || typeof b[1] === "number"){
          if (userSelectSortType == "asc") {
            return a[1] - b[1];
          } else {
            return b[1] - a[1];
          }
        }else{
          return 0;
        }
      });

      if(optionsAfterSort?.length > 0){
        options = optionsAfterSort.map(temprow => temprow[0]);
      }

    }
  }
    
    const changeHandle = (v: any) => {
        const _list = _.cloneDeep(itemList);
        const _target: any = _list.find((v: any) => v.id == props.chartctrl?.split(",")?.[0]);
      const echartFilter = _target?._echartFilter||{};

      //_target._echartFilterValue = v;
      //_target._echartFilterKey = props.chartctrl?.split(",")?.[1];
      if( props.chartctrl?.split(",")?.[1] && v) {echartFilter[ props.chartctrl?.split(",")?.[1]] = v}
      _target._echartFilter = echartFilter;
        setTimeout(() => {
            setItemList(_list);
            setValue(v);
        });
    };


  if(dataValue?.length === 0 && options?.length > 0 || options?.length > 0 && !options?.includes(dataValue) || !target?._echartFilter) {
      const _list = _.cloneDeep(itemList);
      const _target: any = _list.find((v: any) => v.id == props.chartctrl?.split(",")?.[0]);
      const echartFilter = _target?._echartFilter||{};
      if( props.chartctrl?.split(",")?.[1] && options?.[0]) {
        echartFilter[ props.chartctrl?.split(",")?.[1]] = options?.[0]
        _target._echartFilter = echartFilter;
        setItemList(_list);
        setValue(options?.[0]);
      }
    }

    return (
        <div className='select-warp' style={{ backgroundColor: "#FFFFFF"}}>
            <Select
                value={dataValue}
                style={{ width: "100%", height: "100%"}}
                onChange={changeHandle}
                placeholder='请选择'
                showSearch={false}
                mode='single'
                borderType='bordered'
                getPopupContainer={(triggerNode: any): any => {
                    if (customProps?.isShow) {
                        return triggerNode?.parentNode;
                    } else {
                        return document.querySelector(".dw-view-item");
                    }
                }}
            >
                {(Array.from(new Set(options)) || []).map((v: any, idx: any) => {
                    return (
                        <Select.Option key={idx} value={v}>
                            {v}
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default SelectEditor;
