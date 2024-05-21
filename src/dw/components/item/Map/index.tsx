import React, { useContext, useEffect, useMemo, useRef } from "react";
import KdCard from "dw/components/common/KdCard";
import { ViewItemContext } from "dw/views/ViewItem";
import ReactECharts from "echarts-for-react";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import "./map.js";
export default (item: any) => {
    const {
        globalConfig: { pageControl },
        itemList,
        initPage,
        init
    } = useMain();

    const { model } = useContext(ViewItemContext);
    const ref = useRef(null);

    const chartOption = useMemo(() => {
        return {
            visualMap: {
                left: "left",
                inRange: {
                    color: ["#add8e6", "#87cefa", "#00bfff", "#1e90ff", "#0000ff"]
                }
            },
            series: [
                {
                    left: 10,
                    right: 10,
                    bottom: 10,
                    top: 10,
                    type: "map",
                    map: "china",
                    label: { show: true },
                    itemStyle: {
                        areaColor: "#add8e6"
                    }
                }
            ]
        };
    }, []);

    useEffect(() => {}, []);

    return (
        <KdCard item={item} showTitle={false}>
            <div style={{ width: "100%", height: "100%" }}>
                <ReactECharts style={{ width: "100%", height: "100%" }} option={{ ...chartOption }} ref={ref} />
            </div>
        </KdCard>
    );
};
