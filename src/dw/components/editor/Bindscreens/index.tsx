import { Input, Button } from "@kdcloudjs/kdesign";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./index.less";

export default (props: any) => {
    const {
        value,
        onChange,
        node: { id, actions = [], editor }
    } = props;
    const [data, setData] = useState<any>(value || [{ name: "Tab", value: "" }]);

    const add = () => {
        setData([...data, { name: "", value: "" }]);
    };

    useEffect(() => {
        value && setData(value || [{ name: "Tab", value: "" }]);
    }, [value]);

    const change = (name: any, idx: any, e: any) => {
        const _data = _.cloneDeep(data);
        const target = _data[idx];
        target[name] = e.target.value;
        setData(_data);
        onChange([{ prop: id, value: _data }]);
    };

    return (
        <div className='warp'>
            {data?.map((item: any, idx: any) => {
                return (
                    <div className='row' key={idx}>
                        <Input placeholder='名称' value={item.name} onChange={e => change("name", idx, e)}></Input>
                        <Input placeholder='大屏标识' value={item.value} onChange={e => change("value", idx, e)}></Input>
                    </div>
                );
            })}

            <Button style={{ marginTop: 10 }} type='primary' onClick={add}>
                增加
            </Button>
        </div>
    );
};
