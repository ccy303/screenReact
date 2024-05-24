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
            geo: [
                {
                    map: "china",
                    aspectScale: 0.8,
                    zoom: 1.2,
                    top: "9%",
                    left: "11%",
                    roam: false,
                    z: 5,
                    itemStyle: {
                        areaColor: "#D9E7FE",
                        borderColor: "#aaa",
                        borderWidth: 0.5,
                        shadowColor: "#D9E7FE",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        emphasis: {
                            show:true,
                            areaColor: "#6895FE",
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            shadowColor: "#4F94CD",
                            shadowBlur: 10,
                        
                        }
                    }
                },
                {
                    map: "china",
                    aspectScale: 0.8,
                    zoom: 1.2,
                    top: "9.06%",
                    left: "11%",
                    roam: false,
                    z: 4,
                    itemStyle: {
                        areaColor: "#6B81FD",
                        borderWidth: 0,
                        shadowColor: "#6B81FD",
                        shadowOffsetX: 0,
                        shadowOffsetY: 1,
                        shadowBlur: 2,
                       
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
