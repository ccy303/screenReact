import React, { useEffect, useMemo, useState } from "react";
import useMain from "@/dw/store/useMain";
import { Select } from "@kdcloudjs/kdesign";
import _ from "lodash";
export default (props: any) => {
    const {
        value,
        onChange,
        node: { id }
    } = props;

    const { getCurrentItem } = useMain();
    const [localValue, setLocalValue] = useState([]);

    const { dataset } = getCurrentItem();

    const { dataindex } = dataset || {};

    useEffect(() => {
        setLocalValue(value);
    }, [value]);
    
    const change = (e: any) => {
        onChange([{ prop: id, value: e }]);
    };

    return (
        <div>
            <Select placeholder="请选择要展示的数据" style={{ width: "100%" }} onChange={change} value={localValue}>
                {dataindex?.slice(2)?.map((item: any) => {
                    return (
                        <Select.Option key={item?.[1]} value={item?.[1]}>
                            {item?.[1]}
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};
