import React, { useEffect, useMemo, useRef } from "react";
import KdCard from "dw/components/common/KdCard";
import { Tabs } from "@kdcloudjs/kdesign";
import _ from "lodash";

export default (item: any) => {
    // const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);

    // const ref: any = useRef(null);

    return (
        <KdCard item={item} showTitle={showTitle}>
            <Tabs style={{ width: "100%", height: "100%" }}>
                <Tabs.TabPane tab={"11111"}>111111</Tabs.TabPane>
            </Tabs>
        </KdCard>
    );
};
