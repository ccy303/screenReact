import { Radio } from "@kdcloudjs/kdesign";
import React, { useState } from "react";
import "./index.less";
import useMain from "@/dw/store/useMain";
import _ from "lodash";
import { List } from "echarts";

const SelectEditor = (props: any) => {
    const { itemList, setItemList, changeItem } = useMain();

    const changeHandle = (e: any) => {
        // console.log(e.target.value);
        if (!e.target.value) {
            return;
        }
        const _itemList = _.cloneDeep(itemList);
        props.content?.map((cont: any) => {
            cont.value.split(",").map((id: any) => {
                _itemList.find((item: any) => item.id == id)._isShow = cont.value == e.target.value;
            });
        });
        setItemList(_itemList);
    };

    return (
        <div className='warp'>
            <Radio.Group defaultValue={props.content?.[0]?.value} onChange={changeHandle}>
                {(props.content || []).map((item: any, idx: any) => {
                    return (
                        <Radio.Button key={idx} value={item.value}>
                            {item.key}
                        </Radio.Button>
                    );
                })}
            </Radio.Group>
        </div>
    );
};

export default SelectEditor;
