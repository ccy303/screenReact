import { Radio } from "@kdcloudjs/kdesign";
import React, { useState } from "react";
import "./index.less";
import useMain from "@/dw/store/useMain";

const SelectEditor = (props: any) => {
    const { itemList, changeItem } = useMain();

    const target: any = itemList.find(v => v.id == props.optionsid);

    const changeHandle = (e: any) => {
        changeItem([{ prop: "userYIndex", value: [e.target.value] }], target.id);
    };

    return (
        <div className='warp'>
            <Radio.Group onChange={changeHandle}>
                {props.redioconfig.map((item: any, idx: any) => {
                    return (
                        <Radio key={idx} value={item.value} radioType='square'>
                            {item.key}
                        </Radio>
                    );
                })}
            </Radio.Group>
        </div>
    );
};

export default SelectEditor;
