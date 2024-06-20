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

    const dataSet: any = itemList.find((v: any) => v.id == value?.split(",")?.[0])?.dataset;

    const category: any = itemList.find((v: any) => v.id == value?.split(",")?.[0])?.category;

    const formatVersionCfg = () => {
        let list: any = [];

        list = (itemList.filter(v => v.category == "charts" || v.category == "quota" || v.category == "table") || []).map(v => {
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
        const tableColumns: any = itemList.find((v: any) => v.id == value?.split(",")?.[0])?.tableColumns;
        const columns: any = itemList.find((v: any) => v.id == value?.split(",")?.[0])?.columns;
        let xIndex = [];
        if (category == "table") {
            columns.map((item: any) => {
                tableColumns.includes(item.code) && xIndex.push({ label: item.name, value: item.code });
            });
        } else {
            const { dataindex } = dataSet || {};
            if (!dataindex) return [];

            for (let i = 0; i < dataindex.length; i++) {
                const item = dataindex[i];
                if (item[2] != 2 && item[2] != 3) {
                    xIndex.push(item[1]);
                }
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
                    if (category == "table") {
                        return (
                            <Select.Option style={{ width: "100%" }} value={item.value} key={`${item.value}`}>
                                {item.label}
                            </Select.Option>
                        );
                    }
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
