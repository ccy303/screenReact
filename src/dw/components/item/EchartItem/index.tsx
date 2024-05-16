import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Select, Spin } from "@kdcloudjs/kdesign";
import KdCard from "dw/components/common/KdCard";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import { v4 as uuidv4 } from "uuid";

const Chart = (item: any) => {
    const { content, userxindex, useryindex, dataset } = item;
    const { rows } = dataset || {};
    const { config } = content;
    const { charts } = config;

    const [echartKey, setEchartKey] = useState(uuidv4());

    const { getCurrentItem } = useMain();
    const chartOptionRef = useRef<any>({});

    const initData = [
        ["product", "2015", "2016", "2017"],
        ["Matcha", 43.3, 85.8, 93.7],
        ["Milk", 83.1, 73.4, 55.1],
        ["Cheese", 86.4, 65.2, 82.5],
        ["Walnut", 72.4, 53.9, 39.1]
    ];

    const dataSet: any = [{ source: item?.dataset?.rows || initData }];

    const _rows: any = {};
    for (let i = 0, data = dataSet[0].source; i < data?.[0]?.length; i++) {
        const key = data[0][i];
        _rows[key] = [];
        for (let j = 1; j < data.length; j++) {
            _rows[key].push(data[j][i]);
        }
    }

    let chartOption: any = useMemo(() => {
        let echartOpt = {
            tooltip: {},
            ...charts
        };

        if (["bar", "line"].includes(item.type)) {
            echartOpt = {
                ...echartOpt,
                xAxis: item.originname == "横向柱状图" ? {} : { type: "category" },
                yAxis: item.originname == "横向柱状图" ? { type: "category" } : {}
            };
        }

        let series: any = {};
        if (item.type == "pie") {
            series = {
                ...charts.series[0],
                type: item.type,
                areaStyle: item.originname == "面积图" ? {} : null,
                radius: item.originname == "环图" ? ["40%", "70%"] : [0, "75%"]
            };

            if (item._echartFilterValue && item._echartFilterValue?.length) {
                dataSet.push({
                    transform: {
                        type: "filter",
                        config: {
                            and: item._echartFilterValue.map((v: any) => {
                                return { dimension: item._echartFilterKey, "!=": v };
                            })
                        }
                    }
                });
                series.datasetIndex = 1;
            }
        } else if (item.type == "gauge") {
            const y = useryindex?.[0] || "2015";
            const x = userxindex?.[0] || "product";

            const total = _.sum(_rows[y]);

            let val = _rows[y][0];

            if (item._echartFilterValue?.length) {
                val = 0;
                const indexs: any = [];

                _rows[x].map((x: any, i: any) => {
                    item._echartFilterValue?.includes(x) && indexs.push(i);
                });

                indexs.map((index: any) => {
                    val += _rows[y][index] || 0;
                });
            }

            series = {
                type: item.type,
                data: [{ value: (_.divide(val, total) * 100).toFixed(2) }]
            };
        } else {
            series = (useryindex || dataSet?.[0]?.source?.[0].slice(1)).map((v: any, i: any) => ({
                ...charts.series[0],
                type: item.type,
                areaStyle: item.originname == "面积图" ? {} : null,
                encode: {
                    x: item.originname == "横向柱状图" ? [v] : userxindex || ["product"],
                    y: item.originname == "横向柱状图" ? userxindex || ["product"] : [v],
                    seriesName: v
                }
            }));
            if (item._echartFilterValue && item._echartFilterValue?.length) {
                series = series.map((_series: any, index: any) => {
                    dataSet.push({
                        transform: {
                            type: "filter",
                            config: {
                                and: item._echartFilterValue.map((v: any) => {
                                    return { dimension: item._echartFilterKey, "!=": v };
                                })
                            }
                        }
                    });
                    _series.datasetIndex = index + 1;
                    return _series;
                });
            }
        }

        const output = { ...echartOpt, dataset: dataSet, series };

        if (!_.isEqual(chartOptionRef.current.option, output)) {
            setEchartKey(uuidv4());
        }

        chartOptionRef.current = {
            option: output
        };

        return output;
    }, [userxindex, useryindex, charts, item._echartFilterValue, item._echartFilterKey]);

    const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);

    const ref: any = useRef(null);

    useEffect(() => {
        if (getCurrentItem()?.id == item.id) {
            ref.current?.getEchartsInstance().clear();
            ref.current?.getEchartsInstance().setOption({ ...chartOption });
        }
    }, [chartOption]);

    const showLoading = useMemo(() => {
        if (item.pluginname && !item.dataset) {
            return true;
        } else {
            return false;
        }
    }, [item]);

    return (
        <KdCard item={item} showTitle={showTitle}>
            {showLoading ? (
                <Spin type='page' spinning={showLoading} style={{ width: "100%", height: "100%", justifyContent: "center" }}></Spin>
            ) : (
                <div style={{ width: "100%", height: "100%" }}>
                    {/* {item.type == "container" && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                            <div style={{ margin: " 0 10px 0 10px" }}>口径:</div>
                            <Select
                                placeholder='请输选择'
                                style={{ width: "100px" }}
                                value={selectOptionsX.select}
                                onChange={(e: any) => {
                                 
                                }}
                            >
                                {selectOptionsX.data?.map((v: any) => {
                                    return (
                                        <Select.Option key={v.value} value={v.value}>
                                            {v.label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                            <div style={{ margin: " 0 10px 0 10px" }}>维度:</div>
                            <Select
                                placeholder='请输选择'
                                style={{ width: "100px" }}
                                value={selectOptionsY.select}
                                onChange={(e: any) => {
                                    setSelectOptionsY({
                                        ...selectOptionsY,
                                        select: e
                                    });
                                    console.log(e);
                                }}
                            >
                                {selectOptionsY.data?.map((v: any) => {
                                    return (
                                        <Select.Option key={v.value} value={v.value}>
                                            {v.label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </div>
                    )} */}
                    <ReactECharts key={echartKey} style={{ width: "100%", height: "100%" }} option={{ ...chartOption }} ref={ref} />
                </div>
            )}
        </KdCard>
    );
};

export default Chart;
