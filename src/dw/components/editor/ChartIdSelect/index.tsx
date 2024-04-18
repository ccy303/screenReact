import React, { useEffect, useState } from "react";
import { Select } from "@kdcloudjs/kdesign";
import useMain from "dw/store/useMain";

const TextEditor = (props: any) => {
    const {
        value,
        node: { id },
        onChange
    } = props;

    const { itemList } = useMain();

    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    const formatVersionCfg = () => {
        let list: any = [];

        list = (itemList.filter(v => v.category == "charts") || []).map(v => {
            return {
                children: v.name,
                value: v.id
            };
        });

        return list;
    };

    const versinChange = (value: any) => {
        onChange([{ prop: id, value: value }]);
    };

    return (
        <div>
            <Select placeholder='图表' style={{ width: "100%" }} onChange={versinChange} value={innerValue}>
                {formatVersionCfg().map((v: any) => {
                    return (
                        <Select.Option style={{ width: "100%" }} value={v.value} key={`${v.value}`}>
                            <div style={{ width: "100%" }}>{v.children}</div>
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default TextEditor;
