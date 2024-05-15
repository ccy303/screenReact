import { Stepper } from "@kdcloudjs/kdesign";
import React, {useMemo} from "react";
import KdCard from "dw/components/common/KdCard";
import { ComponentItemProps } from "dw/control/interface";

const Quota = (item: ComponentItemProps) => {
    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);
    const { content, userxindex, useryindex, dataset } = item;
    const { rows } = dataset || {};
    const {quota} = content;
    console.log("quota", item);
    const style = {
        width: "100%",
        height: "100%",
        fontSize: quota?.fontSize || 25,
        color: quota?.fontColor || "#333",
        display: "flex",
        justifyContent: quota?.align || "center",
        alignItems: "center",
        fontWeight: quota?.fontWeight || "normal",
        fontStyle:  quota?.fontStyle || "normal",
        textDecoration:  quota?.underline || "none"
    };
    
    const _rows: any = {};
    for (let i = 0; i < rows?.[0]?.length; i++) {
        const key = rows[0][i];
        _rows[key] = [];
        for (let j = 1; j < rows.length; j++) {
            _rows[key].push(rows[j][i]);
        }
    }

    console.log("_rows", _rows);

    let value = useryindex? _rows[useryindex].reduce((total : number, num: number) => total + num, 0) : 0;
    console.log("value", value);    
    return (
        <KdCard item={item} showTitle={showTitle}>
            {useryindex ? <div style={style}>{value}</div> : <div style={style}>业务指标</div>}
        </KdCard>
    );
};

export default Quota;