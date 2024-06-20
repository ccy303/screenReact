import React, { useEffect, useMemo, useRef } from "react";
import KdCard from "dw/components/common/KdCard";
import { Table } from "@kdcloudjs/kdesign";
import _ from "lodash";

const Chart = (item: any) => {
    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);
    const ref: any = useRef(null);
    // 此处配置的单据号列宽度100，优先级高于column配置的200
    const [columnSize, setColumnSize] = React.useState({ order: 100 });

    console.log(item._echartFilter);

    return (
        <KdCard item={item} showTitle={showTitle}>
            <>
                <Table
                    style={{ width: "100%", height: "100%" }}
                    dataSource={(item.dataSource || []).filter((dataItem: any) => {
                        let flag = true;
                        if (item._echartFilter) {
                            for (const key in item._echartFilter) {
                                if (dataItem[key] != item._echartFilter[key]) {
                                    flag = false;
                                }
                            }
                        }
                        return flag;
                    })}
                    columnResize={{
                        maxSize: 500,
                        columnSize,
                        minSize: 60,
                        onChangeSize: newColumnSize => setColumnSize(newColumnSize)
                    }}
                    columns={(item.columns || [])
                        .filter((v: any) => {
                            if (item.tableColumns && item.tableColumns.length) {
                                return item.tableColumns.includes(v.code);
                            } else {
                                return true;
                            }
                        })
                        .map((v: any) => {
                            return { ...v };
                        })}
                    ref={ref}
                />
            </>
        </KdCard>
    );
};

export default Chart;
