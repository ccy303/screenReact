import { TextArea } from "@kdcloudjs/kdesign";
import React, { useEffect, useState } from "react";
import { PropertiesItemProps } from "dw/control/interface";

const TextAreaEditor = (props: PropertiesItemProps) => {
    const {
        value,
        onChange,
        node: { id, actions = [], editor }
    } = props;
    const { dataType, component, ...rest } = editor || {};
    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        innerValue != value && setInnerValue(value);
    }, [value]);

    const changeHandle = (e: any) => {
        const v = e.target.value;
        setInnerValue(v);
    };

    useEffect(() => {
        onChange([{ prop: id, value: innerValue, actions }]);
    }, [innerValue]);

    return <TextArea value={innerValue} onChange={changeHandle} {...rest} />;
};

export default TextAreaEditor;
