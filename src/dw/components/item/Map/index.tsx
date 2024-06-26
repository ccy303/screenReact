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

    const ref = useRef(null);

    const { mapData, dataset } = item;

    const rows = dataset?.rows || [];

    const _data: any = {};

    for (let i = 0; i < rows[0]?.length; i++) {
        const key = rows[0][i];
        _data[key] = rows.slice(1).map((row: any) => row[i]);
    }

    const country = _data["国家名称"];
    const value = _data[mapData];

    const data: any = [];

    value &&
        country?.map((v: any, i: any) => {
            if (!/中国/.test(v)) {
                data.push({ name: v, value: value[i] });
            } else {
                const target = data.find((item: any) => {
                    item.name == "中国";
                });
                if (target) {
                    target.value = target.value + value[i];
                } else {
                    data.push({ name: "中国", value: value[i] });
                }
            }
        });

    const chartOption = useMemo(() => {
        return {
            // geo: {
            //     map: "world",
            //     aspectScale: 0.8,
            //     zoom: 1.2,
            //     top: "9%",
            //     left: "11%",
            //     bottom: "10%",
            //     roam: false,
            //     z: 5,
            //     itemStyle: {
            //         areaColor: "#D9E7FE",
            //         borderColor: "#aaa",
            //         borderWidth: 0.5,
            //         shadowColor: "#D9E7FE",
            //         shadowOffsetX: 0,
            //         shadowOffsetY: 0,
            //         emphasis: {
            //             show: true,
            //             areaColor: "#6895FE",
            //             shadowOffsetX: 5,
            //             shadowOffsetY: 5,
            //             shadowColor: "#4F94CD",
            //             shadowBlur: 10
            //         }
            //     }
            // },
            // {
            //     map: "world",
            //     aspectScale: 0.8,
            //     zoom: 1.2,
            //     top: "9.06%",
            //     left: "11%",
            //     roam: false,
            //     z: 4,
            //     itemStyle: {
            //         areaColor: "#6B81FD",
            //         borderWidth: 0,
            //         shadowColor: "#6B81FD",
            //         shadowOffsetX: 0,
            //         shadowOffsetY: 1,
            //         shadowBlur: 2
            //     }
            // }
            tooltip: {
                trigger: "item",
                formatter: "{b}<br/>{a}: {c}"
            },
            visualMap: {
                type: "piecewise",
                // pieces: [
                //     {gt: 5000, label: '5000'}, 
                //     {gt: 4000, lte: 5000, label: '4000'}, 
                //     {gt: 3000, lte: 4000, label: '3000'},
                //     {gt: 2000, lte: 3000, label: '2000'},
                //     {gt: 1000, lte: 2000, label: '1000'},
                //     {gt: 0, lte: 1000, label: ' 0'},
                // ],
                text: [mapData],
                splitNumber: 5,
                // maxOpen: true,
                align: "left",
                left: "3%",
                bottom: "2%",
                showLabel: true,
                orient: "vertical",
                inRange: { color: ["#8DB5FE", "#518DFE", "#3379FF", "#3C76FF", "#5D75FE", "#7175FE"] }
            },
            series: [
                {
                    type: "map",
                    map: "world",
                    name: mapData,
                    data: data,
                    aspectScale: 0.8,
                    zoom: 1.2,
                    top: "9%",
                    z: 5,
                    itemStyle: {
                        areaColor: "#D9E7FE",
                        borderColor:'#667B99',
                        borderWidth: 0.1,
                        shadowColor: "#667B99",
                        shadowBlur: 2,
                        opacity:2,
                        shadowOffsetX: -1,
                        shadowOffsetY: 1,
                        emphasis: {
                            show: true,
                            areaColor: "#6895FE",
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            shadowColor: "#4F94CD",
                            shadowBlur: 10
                        }
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
