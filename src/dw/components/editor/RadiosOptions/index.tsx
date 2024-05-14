import React, { useEffect, useState } from "react";
import { Button, Input, Icon, Select } from "@kdcloudjs/kdesign";
import _ from "lodash";
import "./index.less";
import useMain from "@/dw/store/useMain";

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

    const add = () => {
        setInnerValue([...innerValue, { key: "", value: "" }]);
    };

    const dataChage = (data: any) => {
        onChange([{ prop: id, value: data }]);
    };

    const del = (idx: any) => {
        const data = _.cloneDeep(innerValue);
        data.splice(idx, 1);
        onChange([{ prop: id, value: data }]);
    };

    return (
        <div className='warp'>
            {innerValue.map((item: any, idx: any) => {
                return (
                    <div className='row' key={idx}>
                        <div style={{ width: "90%" }}>
                            <Input
                                value={item.key}
                                placeholder='KEY'
                                onChange={e => {
                                    setInnerValue(() => {
                                        const data = _.cloneDeep(innerValue);
                                        data[idx].key = e.target.value;
                                        dataChage(data);
                                        return data;
                                    });
                                }}
                            />
                            <Select
                                value={item.value ? item.value.split(",") : []}
                                onChange={(e: any) => {
                                    setInnerValue(() => {
                                        const data = _.cloneDeep(innerValue);
                                        data[idx].value = e.join(",");
                                        dataChage(data);
                                        return data;
                                    });
                                }}
                                style={{ width: "100%" }}
                                mode='multiple'
                                placeholder='绑定图表'
                            >
                                {itemList
                                    // .filter(v => v.category != "radio")
                                    .map((chart: any) => {
                                        return (
                                            <Select.Option key={`${chart.id}`} value={chart.id}>
                                                {chart.chartname}
                                            </Select.Option>
                                        );
                                    })}
                            </Select>
                        </div>
                        <Icon type='delete' style={{ margin: "10px" }} className='del' onClick={() => del(idx)} />
                    </div>
                );
            })}
            <div className='btns'>
                <Button type='primary' onClick={add}>
                    添加
                </Button>
            </div>
        </div>
    );
};

export default TextEditor;
