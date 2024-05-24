import React ,{useMemo} from "react";
import { ComponentItemProps } from "dw/control/interface";
import KdCard from "dw/components/common/KdCard";
import { Table } from "@kdcloudjs/kdesign";

const Border = (item: ComponentItemProps) => {
    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);
    let  customStyle = {};
    try{
        customStyle = item?.content?.customStyle?.style && item?.content?.customStyle?.show && JSON.parse(item.content.customStyle.style);
    }catch(e){
        console.log("customStyle error", e);
    }


    return (
        <KdCard item={item} showTitle={showTitle}>
            <div style={{ width: "100%", height: "100%",...item.content ,...customStyle}}></div>
        </KdCard>
    );
};

export default Border;
