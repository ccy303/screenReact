import React, { useEffect, useMemo, useRef } from "react";
import KdCard from "dw/components/common/KdCard";
import { Table } from "@kdcloudjs/kdesign";
import _ from "lodash";

const Chart = (item: any) => {
    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);

    const ref: any = useRef(null);

    return (
        <KdCard item={item} showTitle={showTitle}>
            <>
                <Table
                    style={{ width: "100%", height: "100%" }}
                    dataSource={item.dataSource || []}
                    columns={(item.columns || [])
                        .filter((v: any) => {
                            if (!item.tableColumns || !item.tableColumns.length) {
                                return true;
                            } else {
                                return item.tableColumns.includes(v.code);
                            }
                        })
                        .map((v: any) => {
                            if (!v.width) {
                                v.width = 100;
                            }
                            return v;
                        })}
                    ref={ref}
                />
            </>
        </KdCard>
    );
};

export default Chart;
