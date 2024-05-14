import React, { useEffect, useState } from "react";
import { Button, Input, Icon, Select } from "@kdcloudjs/kdesign";
import _ from "lodash";
import "./index.less";

const TextEditor = (props: any) => {
    const {
        value,
        node: { id },
        onChange
    } = props;

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
                        <div>
                            <Input
                                value={item.key}
                                placeholder='KEY'
                                
                                onChange={e => {
                                    // setInnerValue(() => {
                                    //     const data = _.cloneDeep(innerValue);
                                    //     data[idx].key = e.target.value;
                                    //     dataChage(data);
                                    //     return data;
                                    // });
                                }}
                            />
                            <Select style={{ width: "100%" }} placeholder='绑定图表'>
                                <Select.Option>1</Select.Option>
                                <Select.Option>2</Select.Option>
                                <Select.Option>3</Select.Option>
                            </Select>
                            {/* <Input
                            value={item.value}
                            // onChange={e => {
                            //     setInnerValue(() => {
                            //         const data = _.cloneDeep(innerValue);
                            //         data[idx].value = e.target.value;
                            //         dataChage(data);
                            //         return data;
                            //     });
                            // }}
                            placeholder='value'
                            style={{ marginLeft: "5px" }}
                        /> */}
                        </div>
                        <Icon type='delete' style={{ marginLeft: "5px" }} className='del' onClick={() => del(idx)} />
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
