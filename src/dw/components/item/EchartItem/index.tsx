import React, { useEffect, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import KdCard from "dw/components/common/KdCard";
import _ from "lodash";
import useMain from "@/dw/store/useMain";

const Chart = (item: any) => {
    const { content, userXIndex, userYIndex, dataset } = item;
    const { rows } = dataset || {};
    const { config } = content;
    const { charts } = config;
    const { getCurrentItem } = useMain();

    console.log(888, userXIndex, userYIndex);

    const _rows: any = {};
    for (let i = 0; i < rows?.[0]?.length; i++) {
        const key = rows[0][i];
        _rows[key] = [];
        for (let j = 1; j < rows.length; j++) {
            _rows[key].push(rows[j][i]);
        }
    }

    useEffect(() => {}, [userXIndex, userYIndex]);

    let chartOption = null;
    {
        let echartOpt = {
            tooltip: {},
            ...charts
        };

        if (["bar", "line"].includes(item.type)) {
            echartOpt = {
                ...echartOpt,
                xAxis: item.originName == "横向柱状图" ? {} : { type: "category" },
                yAxis: item.originName == "横向柱状图" ? { type: "category" } : {}
            };
        }

        let data = [];

        if (!userXIndex || !userYIndex) {
            data = [
                ["product", "2015", "2016", "2017"],
                ["Matcha", 43.3, 85.8, 93.7],
                ["Milk", 83.1, 73.4, 55.1],
                ["Cheese", 86.4, 65.2, 82.5],
                ["Walnut", 72.4, 53.9, 39.1]
            ];
        } else {
            // 初始化X轴
            const [x] = userXIndex.slice(-1);
            const xAsia = [x, ...(_rows[x] || [])];
            for (let i = 0; i < xAsia.length; i++) {
                data[i] = [xAsia[i]];
            }

            // 初始化Y轴
            for (let i = 0; i < userYIndex.length; i++) {
                const key = userYIndex[i];
                const yAsia = [key, ...(_rows[key] || [])];
                for (let j = 0; j < yAsia.length; j++) {
                    data[j].push(yAsia[j]);
                }
            }
        }

        const series =
            item.type == "pie"
                ? {
                      ...charts.series[0],
                      type: "pie",
                      areaStyle: item.originName == "面积图" ? {} : null,
                      radius: item.originName == "环图" ? ["40%", "70%"] : [0, "75%"]
                  }
                : (userYIndex || data?.[0]?.slice(1)).map((v: any, i: any) => ({
                      ...charts.series[0],
                      type: item.type,
                      areaStyle: item.originName == "面积图" ? {} : null,
                      encode: {
                          x: item.originName == "横向柱状图" ? [v] : userXIndex || ["product"],
                          y: item.originName == "横向柱状图" ? userXIndex || ["product"] : [v],
                          seriesName: v
                      }
                  }));

        chartOption = {
            ...echartOpt,
            dataset: { source: data },
            series
        };
    }

    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);

    const ref: any = useRef(null);

    useEffect(() => {
        if (getCurrentItem()?.id == item.id) {
            ref.current?.getEchartsInstance().clear();
            ref.current?.getEchartsInstance().setOption({ ...chartOption });
        }
    }, [chartOption]);

    console.log(chartOption);

    return (
        <KdCard item={item} showTitle={showTitle}>
            <ReactECharts
                key={chartOption.dataset.source?.[0]?.join(",")}
                style={{ width: "100%", height: "100%" }}
                option={{ ...chartOption }}
                ref={ref}
            />
        </KdCard>
    );
};

export default Chart;
