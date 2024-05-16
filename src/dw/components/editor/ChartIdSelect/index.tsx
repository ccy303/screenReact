import React, { useEffect, useMemo, useState } from "react";
import { Select } from "@kdcloudjs/kdesign";
import useMain from "dw/store/useMain";

const TextEditor = (props: any) => {
    const {
        value,
        node: { id },
        onChange
    } = props;

    const { itemList } = useMain();

    const [innerValue, setInnerValue] = useState([]);

    useEffect(() => {
        setInnerValue(value?.split(","));
    }, [value]);

    const formatVersionCfg = () => {
        let list: any = [];

        list = (itemList.filter(v => v.category == "charts") || []).map(v => {
            return {
                children: v.chartname,
                value: v.id
            };
        });

        return list;
    };

    const versinChange = (value: any) => {
        onChange([{ prop: id, value: [value, innerValue?.[1] || ""].join(",") }]);
    };

    const dataControlChange = (value: any) => {
        onChange([{ prop: id, value: [innerValue?.[0] || "", value].join(",") }]);
    };

    const dataControl = useMemo(() => {
        const dataSet: any = itemList.find(v => v.id == value?.split(",")?.[0])?.dataset;
        const { dataindex } = dataSet || {};
        if (!dataindex) return [];
        const xIndex = [];
        for (let i = 0; i < dataindex.length; i++) {
            const item = dataindex[i];
            if (item[2] != 2 && item[2] != 3) {
                xIndex.push(item[1]);
            }
        }
        return xIndex;
    }, [value, itemList]);

    return (
        <div>
            <Select placeholder='绑定图表' style={{ width: "100%", height: "40px" }} onChange={versinChange} value={innerValue?.[0]}>
                {formatVersionCfg().map((v: any) => {
                    return (
                        <Select.Option style={{ width: "100%" }} value={v.value} key={`${v.value}`}>
                            <div style={{ width: "100%" }}>{v.children}</div>
                        </Select.Option>
                    );
                })}
            </Select>
            <Select placeholder='控制项' style={{ width: "100%", height: "40px" }} onChange={dataControlChange} value={innerValue?.[1]}>
                {dataControl.map((item: any) => {
                    return (
                        <Select.Option style={{ width: "100%" }} value={item} key={`${item}`}>
                            {item}
                        </Select.Option>
                    );
                })}
            </Select>
        </div>
    );
};

export default TextEditor;
