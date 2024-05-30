import React, { useEffect, useMemo, useRef, useState, useContext, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { Filter, Spin } from "@kdcloudjs/kdesign";
import KdCard from "dw/components/common/KdCard";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import { ViewItemContext } from "dw/views/ViewItem";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_CHARTS_COLOR, DEFAULT_PIE_ITEMSTYLE, DEFAULT_PIE_LABEL } from "dw/control/common";
import Right from "@/dw/views/Design/layout/Right";
import Left from "@/dw/views/Design/layout/Left";

const gaugeStyle = {
    startAngle: 180,
    endAngle: 0,
    center: ["50%", "65%"],
    radius: "100%",
    min: 0,
    max: 1,
    splitNumber: 5,
    legendHoverLink: true,
    axisLine: {
        lineStyle: {
            width: 10,
            color: [
                [0.25, "#F57582"],
                [0.5, "#FFC53D"],
                [0.75, "#40BD6E"],
                [1, "#1890FF"]
            ],
            shadowColor: "#A3C6FF",
            shadowBlur: 20
        }
    },
    pointer: {
        icon: "triangle", //'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: "65%",
        width: 10,
        offsetCenter: [0, 0],
        itemStyle: {
            color: {
                type: "radial",
                x: 0.5,
                y: 1,
                r: 0.8,
                colorStops: [
                    {
                        offset: 0,
                        color: "#89C7FF" // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "#1890FF" // 100% 处的颜色
                    }
                ]
            }
        }
    },
    anchor: {
        show: true,
        showAbove: true,
        size: 10,
        icon: "circle",
        offsetCenter: [0, 0],
        itemStyle: {
            color: "#1890FF",
            shadowColor: "#89C7FF",
            shadowBlur: 20
        }
    },
    axisTick: {
        show: true,
        length: 10,
        splitNumber: 20,
        distance: 30,
        lineStyle: {
            color: "#89C7FF",
            width: 1
        }
    },
    splitLine: {
        length: 6,
        distance: 15,
        lineStyle: {
            color: "#999999",
            width: 1
        }
    },
    axisLabel: {
        color: "#999999",
        fontSize: 10,
        distance: -45,
        //rotate: 0,
        formatter: function (value: number) {
            if (value === 1) {
                return "100";
            } else if (value === 0.8) {
                return "80";
            } else if (value === 0.6) {
                return "60";
            } else if (value === 0.4) {
                return "40";
            } else if (value == 0.2) {
                return "20";
            } else if (value === 0) {
                return "0";
            }
            return "";
        }
    },
    title: {
        offsetCenter: [0, "40%"],
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "MicrosoftYaHei"
    },
    detail: {
        fontSize: 32,
        fontWeight: 700,
        fontFamily: "KINGDEEKB-Bold",
        lineHeight: 45,
        offsetCenter: [0, "30%"],
        valueAnimation: true,
        formatter: function (value: number) {
            return Math.round(value * 100) + "%";
        },
        color: "inherit"
    }
};

export default React.memo(
    (item: any) => {
        const { model } = useContext(ViewItemContext);
        const { content, userxindex, useryindex, dataset, datafilter } = item;
        const { config } = content;
        const { charts } = config;
        const { topnum } = charts;

        const [echartKey, setEchartKey] = useState(uuidv4());

        const chartOptionRef = useRef<any>({});
        const activeEchartIndex = useRef(0);
        const timer = useRef<any>(null);

        const initData = [
            ["product", "2015", "2016", "2017"],
            ["Matcha", 43.3, 85.8, 93.7],
            ["Milk", 83.1, 73.4, 55.1],
            ["Cheese", 86.4, 65.2, 82.5],
            ["Walnut", 72.4, 53.9, 39.1]
        ];

        const defaultDataSet = item?.dataset?.rows || initData;
        const firstRow = defaultDataSet[0];
        const filterDataSet = datafilter && datafilter.length || item._echartFilter
            ? defaultDataSet.filter((row: any, index: number) => {
                  if (index == 0) {
                      return true;
                  } else {
                      if(datafilter && datafilter.length) {
                        for (let i = 0; i < datafilter.length; i++) {
                          const { key, selectkey } = datafilter[i];
                          if (!selectkey.includes(row[firstRow.indexOf(key)])) {
                            return false;
                          }
                        }
                      }
                      if(item._echartFilter) {
                        for (let selectFilterKey in item._echartFilter) {
                          if (item._echartFilter[selectFilterKey] != row[firstRow.indexOf(selectFilterKey)]) {
                            return false;
                          }
                        }
                      }
                      return true;
                  }
              })
            : defaultDataSet;
        const dataSet: any = [{ source: filterDataSet }];
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
                color: DEFAULT_CHARTS_COLOR,
                tooltip: {},
                ...charts
            };

            if (["bar", "line"].includes(item.type)) {
                let xOrYAxisIndex = {};
                xOrYAxisIndex = item.originname == "横向柱状图" || item.originname == "堆积条形图" ? { yAxisIndex: 0 } : { xAxisIndex: 0 };
                echartOpt = {
                    ...echartOpt,
                    xAxis: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? {} : { type: "category" },
                    yAxis: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? { type: "category" } : {},
                    dataZoom:
                        topnum && topnum > 0
                            ? [
                                  {
                                      ...xOrYAxisIndex,
                                      type: "slider",
                                      show: false,
                                      startValue: 0,
                                      endValue: topnum - 1,
                                      filterMode: "filter"
                                  }
                              ]
                            : [],
                  grid: {
                    top: '10%', // 上边距
                    left: 10, // 左边距
                    bottom: 10, // 下边距
                    containLabel: true // 自动计算标签大小
                  }
                };
            }

            let series: any = {};
            if (item.type == "pie") {
                const xshow = _rows[userxindex?.[0] || "product"];
                const y = _rows[useryindex?.[0] || "2015"];
                console.log("_rows!!!!!!!!!",_rows);
          
                

                let _data = null;
                let _center = ["50%", "50%"];
                if (item._echartFilterValue && item._echartFilterValue?.length) {
                    const x = _rows[item._echartFilterKey]; 
                    _data = x
                        ?.map((v: any, i: any) => {
                            return { name: xshow?.[i], value: y?.[i] };
                        });
                        console.log("_data99999999999",_data);       
                } else {
                    _data = xshow?.map((v: any, i: any) => {
                        return { name: v, value: y?.[i] };
                    });
                }
                if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "right") {
                    _center = ["30%", "50%"];
                } else if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "left") {
                    _center = ["60%", "50%"];
                } else if (item.content.config.legendPos == "bottom") {
                    _center = ["50%", "35%"];
                } else if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "top") {
                    _center = ["50%", "66%"];
                }

                series = {
                    ...charts.series[0],
                    type: item.type,
                    areaStyle: item.originname == "面积图" ? {} : null,
                    radius: item.originname == "环图" ? ["68%", "80%"] : [0, "80%"],
                    label: item.originname == "环图" ? { ...charts.series[0].label, ...DEFAULT_PIE_LABEL } : { ...charts.series[0].label },
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    itemStyle: item.originname == "环图" ? DEFAULT_PIE_ITEMSTYLE : {},
                    center: _center,
                    data: topnum && topnum > 0 ? _data?.slice(0, topnum) : _data
                };

                const legend = (() => {
                    let res = { ...echartOpt.legend, ...{ [item.content.config.legendPos]: item.content.config.legendPos } };
                    if (item.content.config.legendStyle == "customMade") {
                        res = _data?.map((v: any, i: any) => {
                            let position = {};
                            const width = 100;
                            if (echartOpt.legend.orient == "horizontal") {
                                if (item.content.config.legendPos == "left") {
                                    position = {
                                        left: (width + 30 + 30) * i,
                                        right: "auto"
                                    };
                                }
                                if (item.content.config.legendPos == "right") {
                                    position = {
                                        right: (width + 30 + 30) * (_data.length - 1 - i),
                                        left: "auto"
                                    };
                                }
                                if (item.content.config.legendPos == "top") {
                                    position = {
                                        top: item.content.config.charts.legend.top,
                                        left: item.content.config.legendPos == "top" && i ? (width + 60) * i : 30,
                                        right: "auto"
                                    };
                                }
                                if (item.content.config.legendPos == "bottom") {
                                    position = {
                                        bottom: item.content.config.charts.legend.top,
                                        left: item.content.config.legendPos == "bottom" && i ? (width + 60) * i : 30,
                                        right: "auto",
                                        top: "auto"
                                    };
                                }
                            } else if (echartOpt.legend.orient == "vertical") {
                                delete res.top;
                                delete res.right;
                                delete res.left;
                                delete res.bottom;

                                if (item.content.config.legendPos == "left") {
                                    res = {
                                        ...res,
                                        right: "auto"
                                    };
                                    position = {
                                        top: i ? 30 * (i + 1) : 30,
                                        [item.content.config.legendPos]: 5
                                    };
                                } else if (item.content.config.legendPos == "right") {
                                    position = {
                                        top: i ? 30 * (i + 1) : 30,
                                        left: "66%"
                                    };
                                } else if (item.content.config.legendPos == "top") {
                                    position = {
                                        top: i ? 30 * (i + 1) + item.content.config.charts.legend.top : 30 + item.content.config.charts.legend.top,
                                        Left: "center"
                                    };
                                } else if (item.content.config.legendPos == "bottom") {
                                    position = {
                                        top: "auto",
                                        bottom: i
                                            ? 30 * (i + 1) + item.content.config.charts.legend.bottom
                                            : 30 + item.content.config.charts.legend.bottom,
                                        Left: "center"
                                    };
                                }
                                console.log(4555555555555555, position);
                            }
                            return {
                                ...echartOpt.legend,
                                ...position,
                                width,
                                data: [{ name: v.name }],
                                formatter: function (name: any) {
                                    // 添加
                                    let target;
                                    for (let i = 0; i < _data.length; i++) {
                                        if (_data[i].name === name) {
                                            target = _data[i].value;
                                        }
                                    }
                                    const arr = ["{a|" + name + "}", target];
                                    return arr.join("  ");
                                },
                                textStyle: {
                                    padding: 5,
                                    // 添加
                                    rich: {
                                        a: { width: 90 }
                                    }
                                }
                            };
                        });
                    } else {
                        delete res.right;
                        delete res.left;
                        delete res.bottom;
                        if (item.content.config.legendPos == "top") {
                            res = {
                                ...res,
                                top: item.content.config.charts.legend.top,
                                right: "auto"
                            };
                        } else if (item.content.config.legendPos == "left") {
                            res = {
                                ...res,
                                left: item.content.config.charts.legend.left
                            };
                        } else if (item.content.config.legendPos == "right") {
                            res = {
                                ...res,
                                right: "5%"
                            };
                        } else if (item.content.config.legendPos == "bottom") {
                            delete res.top;
                            res = {
                                ...res,
                                bottom: item.content.config.charts.legend.bottom
                            };
                        }
                    }
                    console.log(1111111111111, res);

                    return res;
                })();

                const output = {
                    ...echartOpt,
                    series
                };

                if (!_.isEqual(chartOptionRef.current.option, output)) {
                    setEchartKey(uuidv4());
                }

                chartOptionRef.current = {
                    option: output
                };

                return { ...output, legend };
            } else if (item.type == "gauge") {
                const y = useryindex?.[0] || "2015";
                const x = userxindex?.[0] || "product";

                const total = _.sum(_rows?.[y]);

                let val = _rows?.[y]?.[0];

                if (item._echartFilterValue?.length) {
                    val = 0;
                    const indexs: any = [];

                    _rows?.[x]?.map((x: any, i: any) => {
                        item._echartFilterValue?.includes(x) && indexs.push(i);
                    });

                    indexs.map((index: any) => {
                        val += _rows[y][index] || 0;
                    });
                }

                const value = total;

                series = {
                    type: item.type,
                    data: [{ value: isNaN(value) ? 0 : value }]
                };
            } else {
                series = (useryindex || dataSet?.[0]?.source?.[0].slice(1)).map((v: any, i: any) => ({
                    ...charts.series[0],
                    type: item.type,
                    stack: item.originname == "堆积条形图" || item.originname == "堆积柱形图" ? "stack" : "",
                    areaStyle: item.originname == "面积图" ? {} : null,
                    encode: {
                        x: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? [v] : userxindex || ["product"],
                        y: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? userxindex || ["product"] : [v],
                        seriesName: v
                    }
                }));
                if (item._echartFilterValue && item._echartFilterValue?.length) {
                    
                    series = series.map((_series: any, index: any) => {
                        dataSet.push({
                            transform: {
                                type: "filter",
                                config: {
                                    and: item._echartFilterValue?.map((v: any) => {
                                        return { dimension: item._echartFilterKey, "=": v };
                                    })
                                },
                                print: true
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
                option: _.cloneDeep(output)
            };

            item.type == "gauge" && _.assign(output.series, gaugeStyle);

            return output;
        }, [userxindex, useryindex, charts, item._echartFilterValue, item._echartFilterKey]);

        const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);

        const ref: any = useRef(null);

        const showLoading = useMemo(() => {
            if (item.pluginname && !item.dataset) {
                return true;
            } else {
                return false;
            }
        }, [item]);

        useEffect(() => {
            return () => {
                clearInterval(timer.current);
            };
        }, []);

        useEffect(() => {
            const echart = ref.current?.getEchartsInstance();
            if (!echart) {
                return;
            }
            const data = chartOption.series?.data;
            const legendStyle = item.content.config.legendStyle == "customMade";
            const legend = chartOption.legend;

            clearInterval(timer.current);

            if (item.type == "pie" && echart && data) { 
                
                if (legendStyle) {
                    timer.current = setInterval(() => {
                        echart.dispatchAction({
                            type: "highlight",
                            dataIndex: activeEchartIndex.current
                        });
                      
                        echart.dispatchAction({
                            type: "downplay",
                            dataIndex: activeEchartIndex.current == 0 ? data.length - 1 : activeEchartIndex.current - 1
                        });

                        const _legend = legend.map((leg: any, idx: any) => {
                            if (idx == activeEchartIndex.current) {
                                return {
                                    ...leg,
                                    shadowColor: "rgba(0, 0, 0, 0.1)",
                                    shadowBlur: 5,
                                    borderWidth: 0.3,
                                    borderRadius: 5,
                                    backgroundColor: "#fff"
                                };
                            } else {
                                return leg;
                            }
                        });

                        echart.setOption({ legend: [..._legend] }, { replaceMerge: "legend" });

                        if (activeEchartIndex.current == data.length - 1) {
                            activeEchartIndex.current = 0;
                        } else {
                            activeEchartIndex.current += 1;
                        }
                    }, 3000);
                }  else {
                    echart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0, // 图表中的第一个系列
                        dataIndex: 0, // 要高亮的数据项的索引
                    });
                
                }
                  // 图例选中/取消选中事件
                  echart.on('legendselectchanged', (e: any) => {
                    var isSelected = e.selected[e.name];
                    if (!isSelected) {
                         // 如果图例被取消选中，则重新选中
                         echart.dispatchAction({
                            type: 'legendSelect',
                            name: e.name
                        });
                      data.forEach((d: any, idx: any) => {
                        if(d.name == e.name ){
                            echart.dispatchAction({
                                type: "highlight",
                                dataIndex: idx
                            });
                        }else {
                            echart.dispatchAction({
                                type: "downplay",
                                dataIndex: idx
                            });
                        }
                    });
                     
                    }
                    // 阻止默认行为，防止图例被置灰
                     return false;
                });
            }
        }, [chartOption]);

        const onChartClick = useCallback((params: any) => {
            // 在这里处理点击事件，可以获取点击的图形的数据
            console.log("clickChart", params);
            const { dataIndex } = params;
            const { pluginname, dataset } = item;
            if (dataIndex && pluginname && dataset && dataset.dataindex && dataset.rows && dataset.rows[dataIndex + 1]) {
                const clickData = {
                    pluginname: pluginname,
                    dataindex: dataset.dataindex,
                    row: dataset.rows[dataIndex + 1]
                };
                console.log(clickData);
                model?.invoke?.("clickcharts", JSON.stringify(clickData));
            }
        }, []);

        return (
            <KdCard item={item} showTitle={showTitle}>
                {showLoading ? (
                    <Spin type='page' spinning={showLoading} style={{ width: "100%", height: "100%", justifyContent: "center" }}></Spin>
                ) : (
                    <div style={{ width: "100%", height: "100%" }}>
                        <ReactECharts
                            key={echartKey}
                            style={{ width: "100%", height: "100%" }}
                            option={{ ...chartOption }}
                            ref={ref}
                            onEvents={{ click: onChartClick }}
                        />
                    </div>
                )}
            </KdCard>
        );
    },
    (oldProps, newProps) => {
        return _.isEqual(oldProps, newProps);
    }
);
