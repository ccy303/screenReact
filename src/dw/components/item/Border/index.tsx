import React ,{useMemo} from "react";
import { ComponentItemProps } from "dw/control/interface";
import KdCard from "dw/components/common/KdCard";
import { Table } from "@kdcloudjs/kdesign";

const Border = (item: ComponentItemProps) => {
    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);


    return (
        <KdCard item={item} showTitle={showTitle}>
            <div style={{ width: "100%", height: "100%",...item.content }}></div>
        </KdCard>
    );
};

export default Border;
