import { Select } from "@kdcloudjs/kdesign";
import React, { useState } from "react";
import "./index.less";
import useMain from "@/dw/store/useMain";
import _ from "lodash";

const SelectEditor = (props: any) => {
    const [dataValue, setValue] = useState([]);

    const { itemList, changeItem, setItemList } = useMain();

    const target: any = itemList.find(v => v.id == props.chartctrl?.split(",")?.[0]);

    const index = target.dataset.dataindex.findIndex((v: any) => v[1] == props.chartctrl?.split(",")?.[1]);

    const options = target.dataset.rows.slice(1).map((v: any) => v[index]);

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
        <Select value={dataValue} className='warp' onChange={changeHandle} placeholder='请选择' mode='multiple'>
            {(Array.from(new Set(options)) || []).map((v: any) => {
                return (
                    <Select.Option key={v} value={v}>
                        {v}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default SelectEditor;
