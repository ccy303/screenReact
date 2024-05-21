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
            // visualMap: {
            //     left: "left",
            //     inRange: {
            //         color: ["#add8e6", "#87cefa", "#00bfff", "#1e90ff", "#0000ff"]
            //     }
            // },
            geo: [
                {
                    map: "china",
                    aspectScale: 0.85,
                    zoom: 1.2,
                    top: "9%",
                    left: "11%",
                    roam: false,
                    z: 5,
                    itemStyle: {
                        areaColor: "#d9e8ff",
                        borderColor: "#fff",
                        borderWidth: 1.5,
                        shadowColor: "#0f4c74",
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                        shadowBlur: 5
                    }
                },
                {
                    map: "china",
                    aspectScale: 0.85,
                    zoom: 1.2,
                    top: "9.5%",
                    left: "11%",
                    roam: false,
                    z: 4,
                    itemStyle: {
                        areaColor: "#004b75",
                        borderColor: "#195175",
                        borderWidth: 1.5,
                        shadowColor: "#0f4c74",
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                        shadowBlur: 5
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
