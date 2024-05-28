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

    const options = target?.dataset?.rows?.slice?.(1)?.map((v: any) => v[index]);

    const changeHandle = (v: any) => {
        const _list = _.cloneDeep(itemList);
        const _target: any = _list.find((v: any) => v.id == props.chartctrl?.split(",")?.[0]);
        _target._echartFilterValue = v;
        _target._echartFilterKey = props.chartctrl?.split(",")?.[1];
        setTimeout(() => {
            setItemList(_list);
            setValue(v);
        });
    };

    return (
        <div className='select-warp'>
            <Select
                value={dataValue}
                style={{ width: "100%", height: "100%" }}
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
