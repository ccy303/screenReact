import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Select, Spin } from "@kdcloudjs/kdesign";
import KdCard from "dw/components/common/KdCard";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import { DEFAULT_CHARTS_COLOR,DEFAULT_PIE_ITEMSTYLE,DEFAULT_PIE_LABEL } from "dw/control/common";

const Chart = (item: any) => {
    const { content, userxindex, useryindex, dataset } = item;
    const { rows } = dataset || {};
    const { config } = content;
    const { charts } = config;

    const [selectX, setSelectX] = useState(1);
    const [selectY, setSelectY] = useState(1);

    const { getCurrentItem } = useMain();

    const _rows: any = {};
    for (let i = 0; i < rows?.[0]?.length; i++) {
        const key = rows[0][i];
        _rows[key] = [];
        for (let j = 1; j < rows.length; j++) {
            _rows[key].push(rows[j][i]);
        }
    }

    let chartOption: any = useMemo(() => {
        let echartOpt = {
            color:DEFAULT_CHARTS_COLOR,
            tooltip: {},
            ...charts
        };

        if (["bar", "line"].includes(item.type)) {
            echartOpt = {
                ...echartOpt,
                xAxis: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? {} : { type: "category" },
                yAxis: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? { type: "category" } : {}
            };
        }

        let data = [];
        if (!userxindex || !useryindex || !userxindex?.length || !useryindex?.length) {
            data = [
                ["product", "2015", "2016", "2017"],
                ["Matcha", 120.3, 85.8, 93.7],
                ["Milk", 70, 73.4, 55.1],
                ["Cheese", 100, 65.2, 82.5],
                // ["Walnut", 5, 53.9, 39.1]
            ];
        } else {
            // 初始化X轴
            const [x] = userxindex.slice(-1);
            const xAsia = [x, ...(_rows[x] || [])];
            for (let i = 0; i < xAsia.length; i++) {
                data[i] = [xAsia[i]];
            }

            // 初始化Y轴
            for (let i = 0; i < useryindex.length; i++) {
                const key = useryindex[i];
                const yAsia = [key, ...(_rows[key] || [])];
                for (let j = 0; j < yAsia.length; j++) {
                    data[j].push(yAsia[j]);
                }
            }
        }

        let series = {};
        if (item.type == "pie") {
            series = {
                ...charts.series[0],
                type: item.type,
                areaStyle: item.originname == "面积图" ? {} : null,
                radius: item.originname == "环图" ? ["68%", "80%"] : [0, "80%"],
                label: item.originname == "环图" ? {...charts.series[0].label,...DEFAULT_PIE_LABEL} : {...charts.series[0].label},
                itemStyle: item.originname == "环图" ? DEFAULT_PIE_ITEMSTYLE : {}
            };
            return {
                ...echartOpt,
                dataset: { source: data },
                series
            };
        } else if (item.type == "gauge") {
            // 初始化Y下拉
            const y: any = data[0].slice(1).map((v, i) => {
                return { label: v, value: i + 1 };
            });

            // 初始化X下拉
            const x: any = data.slice(1).map((v, i) => {
                return { label: v[0], value: i + 1 };
            });

            // 计算数据
            const total = data.slice(1).reduce((a, b) => Number(a) + Number(b[1]), 0);

            // 计算当前数据占total的百分比,并转换为百分比
            const percent = Math.round((Number(data[selectX || 1][selectY || 1]) / total) * 100) / 100;

            series = {
                type: item.type,
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '65%'],
                radius: '100%',
                min: 0,
                max: 1,
                splitNumber: 5,
                legendHoverLink: true,
                axisLine: {
                    lineStyle: {
                    width: 10,
                    color: [
                        [0.25, '#F57582'],
                        [0.5, '#FFC53D'],
                        [0.75, '#40BD6E'],
                        [1, '#1890FF']
                    ],
                    shadowColor: '#87CEEB',
                    shadowBlur: 20
                    }
                },
                pointer: {
                    icon: 'triangle',//'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '60%',
                    width: 15,
                    offsetCenter: [0, 0],
                    itemStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 1,
                            r: 0.8,
                            colorStops: [{
                                offset: 0, color: '#89C7FF' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#1890FF' // 100% 处的颜色
                            }]
                        }
                    }
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 15,
                    icon: 'circle',
                    offsetCenter: [0, 0],
                    itemStyle: {
                    color: '#1890FF',
                    shadowColor: '#89C7FF',
                    shadowBlur: 20
                    }
                },
                axisTick: {
                    show: true,
                    length: 10,
                    splitNumber: 15,
                    distance: 32,
                    lineStyle: {
                    color: '#1890FF',
                    width: 1
                    }
                },
                splitLine: {
                    length: 6,
                    distance: 15,
                    lineStyle: {
                    color: '#999999',
                    width: 1
                    }
                },
                axisLabel: {
                    color: '#999999',
                    fontSize: 10,
                    distance: -45,
                    //rotate: 0,
                    formatter: function (value: number) {
                    if (value === 1) {
                        return '100';
                    }else if (value === 0.8) {
                        return '80';
                    } else if (value === 0.6) {
                        return '60';
                    } else if (value === 0.4) {
                        return '40';
                    } else if (value == 0.2) {
                        return '20';
                    } else if (value === 0) {
                        return '0';
                    }
                    return '';
                    }
                },
                title: {
                    offsetCenter: [0, '40%'],
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: 'MicrosoftYaHei',
                },
                detail: {
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: 'KINGDEEKB-Bold',
                    lineHeight: 45,
                    offsetCenter: [0, '30%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                    return Math.round(value * 100) + '%';
                    },
                    color: 'inherit'
                },
                data: [{ value: percent }]
            };

            return {
                ...echartOpt,
                dataset: { source: data },
                series,
                selectX: x,
                selectY: y
            };
        } else {
            series = (useryindex || data?.[0]?.slice(1)).map((v: any, i: any) => ({
                ...charts.series[0],
                type: item.type,
                stack: item.originname == "堆积条形图" || item.originname == "堆积柱形图" ? 'stack' : '',
                areaStyle: item.originname == "面积图" ? {} : null,
                encode: {
                    x: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? [v] : userxindex || ["product"],
                    y: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? userxindex || ["product"] : [v],
                    seriesName: v
                }
            }));
            return {
                ...echartOpt,
                dataset: { source: data },
                series
            };
        }
    }, [userxindex, useryindex, charts]);

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
                    {item.type == "container" && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                            <div style={{ margin: " 0 10px 0 10px" }}>口径:</div>
                            <Select
                                placeholder='请输选择'
                                style={{ width: "100px" }}
                                value={selectOptionsX.select}
                                onChange={(e: any) => {
                                    setSelectOptionsX({
                                        ...selectOptionsX,
                                        select: e
                                    });
                                    console.log(e);
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
                    )}
                    <ReactECharts
                        key={chartOption.dataset.source?.[0]?.join(",")}
                        style={{ width: "100%", height: "100%" }}
                        option={{ ...chartOption }}
                        ref={ref}
                    />
                </div>
            )}
        </KdCard>
    );
};

export default Chart;
