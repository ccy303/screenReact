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

    const { columns } = getCurrentItem();

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const change = (e: any) => {
        onChange([{ prop: id, value: e }]);
    };

    return (
        <div>
            <Select mode='multiple' style={{ width: "100%" }} onChange={change} value={localValue}>
                {columns.map((item: any) => {
                    return (
                        <Select.Option key={item.code} value={item.code}>
                            {item.name}
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};
