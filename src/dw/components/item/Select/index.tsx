import { Select } from "@kdcloudjs/kdesign";
import React, { useState } from "react";
import "./index.less";
import useMain from "@/dw/store/useMain";

const SelectEditor = (props: any) => {
    const [dataValue, setValue] = useState([]);

    const { itemList, changeItem } = useMain();

    const target: any = itemList.find(v => v.id == props.optionsid);

    const changeHandle = (v: any) => {
        setValue(v);
        changeItem([{ prop: "userYIndex", value: v }], target.id);
    };

    return (
        <Select value={dataValue} className='warp' onChange={changeHandle} placeholder='请选择' mode='multiple'>
            {(props.options || []).map((v: any) => {
                return (
                    <Select.Option key={v.value} value={v.children}>
                        {v.children}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default SelectEditor;
