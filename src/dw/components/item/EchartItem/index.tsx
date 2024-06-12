import React, { useEffect, useMemo, useRef, useState, useContext, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { Filter, Spin } from "@kdcloudjs/kdesign";
import KdCard from "dw/components/common/KdCard";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import { ViewItemContext } from "dw/views/ViewItem";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_CHARTS_COLOR, DEFAULT_PIE_ITEMSTYLE, DEFAULT_PIE_LABEL,GAUGE_STYLE2 } from "dw/control/common";
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
            return ((value * 10000) / 100).toFixed(2) + "%"; //精度问题 例如 0.11255 * 100 = 11.254999999999999
        },
        color: "inherit"
    }
};

export default React.memo(
    (item: any) => {
        const { model, customProps } = useContext(ViewItemContext);
        const { content, userxindex, useryindex, dataset, datafilter, userseries, sortfield } = item;
        const { config } = content;
        const { charts } = config;
        const { topnum } = charts;
        const [echartStyle, setEchartStyle] = useState<any>(null);
        const [echartKey, setEchartKey] = useState(uuidv4());

        const chartOptionRef = useRef<any>({});
        const activeEchartIndex = useRef(0);
        const timer = useRef<any>(null);

        const initData = [
            ["product", "2015", "2016", "2017"],
            ["Matcha", 300, 85.8, 93.7],
            ["Milk", 83.1, 73.4, 55.1],
            ["Cheese", 86.4, 65.2, 82.5],
            ["Walnut", 72.4, 53.9, 39.1]
        ];

        const defaultDataSet = item?.dataset?.rows || initData;
        const firstRow = defaultDataSet[0];
        const filterDataSet =
            (datafilter && datafilter.length) || item._echartFilter
                ? defaultDataSet.filter((row: any, index: number) => {
                      if (index == 0) {
                          return true;
                      } else {
                          if (datafilter && datafilter.length) {
                              for (let i = 0; i < datafilter.length; i++) {
                                  const { key, selectkey } = datafilter[i];
                                  if (!selectkey.includes(row[firstRow.indexOf(key)])) {
                                      return false;
                                  }
                              }
                          }
                          if (item._echartFilter) {
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
        let sortDataSet;
        if (userxindex && sortfield?.length > 0 && filterDataSet?.length > 1 && sortfield.filter((v: any) => v.key == userxindex?.[0])?.length > 0) {
            const sortkey = sortfield.filter((v: any) => v.key == userxindex?.[0])?.[0]?.sortkey;
            const sorttype = sortfield.filter((v: any) => v.key == userxindex?.[0])?.[0]?.sorttype;
            const sortIndex = firstRow.indexOf(sortkey);
            if (sortkey && sorttype && sortIndex >= 0) {
                const afterSortDataSet = filterDataSet.slice(1).sort((a: any, b: any) => {
                    if (typeof a[sortIndex] === "string" || typeof b[sortIndex] === "string") {
                        if (sorttype == "asc") {
                            return a[sortIndex].localeCompare(b[sortIndex]);
                        } else {
                            return b[sortIndex].localeCompare(a[sortIndex]);
                        }
                    } else if (typeof a[sortIndex] === "number" || typeof b[sortIndex] === "number") {
                        if (sorttype == "asc") {
                            return a[sortIndex] - b[sortIndex];
                        } else {
                            return b[sortIndex] - a[sortIndex];
                        }
                    } else {
                        return 0;
                    }
                });
                sortDataSet = [firstRow, ...afterSortDataSet];
            } else {
                sortDataSet = filterDataSet;
            }
        } else {
            sortDataSet = filterDataSet;
        }
        const dataSet: any = [{ source: sortDataSet }];
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
                        top: "10%", // 上边距
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
                console.log("_rows!!!!!!!!!", _rows);

                let _data = null;
                let _center = ["50%", "50%"];
                let _radius = ["68%", "80%"];
                if (item._echartFilterValue && item._echartFilterValue?.length) {
                    const x = _rows[item._echartFilterKey];
                    _data = x?.map((v: any, i: any) => {
                        return { name: xshow?.[i], value: y?.[i] };
                    });
                } else {
                    _data = xshow?.map((v: any, i: any) => {
                        return { name: v, value: y?.[i] };
                    });
                    _data = _data?.reduce((accumulator, currentItem) => {
                        const existingItem = accumulator.find(item => item.name === currentItem.name);
                        if (existingItem) {
                            existingItem.value += currentItem.value;
                        } else {
                            accumulator.push(currentItem);
                        }
                        return accumulator;
                    }, []);
                }

                if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "right") {
                    _center = ["27%", "50%"];
                } else if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "left") {
                    _center = ["60%", "50%"];
                } else if (item.content.config.legendPos == "bottom") {
                    _center = ["50%", "35%"];
                } else if (item.content.config.charts.legend.orient == "vertical" && item.content.config.legendPos == "top") {
                    _center = ["50%", "66%"];
                } else if (item.content.config.charts.legend.orient == "horizontal" && item.content.config.legendPos == "top") {
                    _center = ["50%", "57.5%"];
                }
                if(item.content.config.legendCustom == "true"){
                    _center = ["50%", "27%"];
                    _radius = ["34%", "40%"];
                }

                series = {
                    ...charts.series[0],
                    type: item.type,
                    areaStyle: item.originname == "面积图" ? {} : null,
                    radius: item.originname == "环图" ? _radius : [0, "80%"],
                    label: item.originname == "环图" ? { ...charts.series[0].label, ...DEFAULT_PIE_LABEL } : { ...charts.series[0].label },
                    emphasis: { label: { show: true } },
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
                                        top: i ? 30 * (i + 1) + item.content.config.charts.legend.top : 30 + item.content.config.charts.legend.top,
                                        left: "52%"
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
                                            target = formatNumberWithEllipsis(_data[i].value);
                                        }
                                    }
                                    const arr = ["{a|" + name + "}", target];
                                    return arr.join("   ");
                                },
                                textStyle: {
                                    padding: 5,
                                    // 添加
                                    rich: { a: { width: 100 } }
                                }
                            };
                        });
                    } else {
                        delete res.right;
                        delete res.left;
                        delete res.bottom;
                        delete res.top;
                        if (item.content.config.legendPos == "top") {
                            delete res.bottom;
                            delete res.right;
                            res = { ...res, left: "center", top: item.content.config.charts.legend.top };
                        } else if (item.content.config.legendPos == "left") {
                            delete res.right;
                            res = { ...res, left: item.content.config.charts.legend.left };
                        } else if (item.content.config.legendPos == "right") {
                            delete res.left;
                            res = { ...res, right: 5 };
                        } else if (item.content.config.legendPos == "bottom") {
                            delete res.top;
                            delete res.right;
                            res = { ...res, left: "center", bottom: item.content.config.charts.legend.bottom };
                        } else if (item.content.config.legendPos == "topCenter") {
                            delete res.bottom;
                            delete res.right;
                            res = { ...res, left: "center", top: 0 };
                        } else if (item.content.config.legendPos == "bottomCenter") {
                            delete res.top;
                            delete res.right;
                            res = { ...res, left: "center", bottom: item.content.config.charts.legend.bottom };
                        }
                    }

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
            } else if (item.type == "gauge" || item.type == "gauge2") {
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
                    type: "gauge",
                    data: [{ value: isNaN(value) ? 0 : value }]
                };
            }else if(item.type == "progressbar"){
              const y = useryindex?.[0] || "2015";
              const percent = ((_rows?.[y]?.[0] * 10000) / 100).toFixed(2);
              return {
                ...echartOpt,
                xAxis: { type: "value", min: 0, max: 100, show: false },
                yAxis: { type: "category", show: false },
                grid: {
                  top: 0, // 上边距
                  left: 0, // 左边距
                  right: 0, // 左边距
                  bottom: 0
                },
                label: {
                  show: false
                },
                tooltip: {
                  show: false
                },
                series: [{
                  type: "bar",
                  data: [100],
                  itemStyle: {
                    color: "#ffffff",
                    borderRadius:10
                  },
                  barGap: "-100%",
                  animation: false,
                  silent: true
                },{
                  type: "bar",
                  data: [percent],
                  barGap: "-100%",
                  itemStyle: {
                    borderRadius: 10,
                    color: function(params) {
                      var value = params.value; // 获取当前柱子的数据值
                      if (value < 50) {
                        return {
                          type: "linear",
                          x: 0,
                          y: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#FAC53E" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#FF9E4C" // 100% 处的颜色
                            }
                          ],
                          global: false // 缺省为 false
                        };
                      } else {
                        return {
                          type: "linear",
                          x: 0,
                          y: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#246FFF" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#6CAAFF" // 100% 处的颜色
                            }
                          ],
                          global: false // 缺省为 false
                        };
                      }
                    }
                  }
                }]
              };
            }else if(item.type == "progresspie"){
              const y = useryindex?.[0] || "2015";
              const percent = ((_rows?.[y]?.[0] * 10000) / 100).toFixed(2);
              const percentColor = percent <= 33 ? "#1DB363" : percent <= 66 ?"#FF8F0F":"#F0262D";
              return {
                series: [{
                  name: 'progresspie',
                  type: 'pie',
                  radius: ['68%', '80%'], // 设置环形图的内外半径，实现环形效果
                  clockwise: true, // 是否顺时针展示
                  hoverAnimation: false, // 禁用鼠标悬停时的放大效果
                  label: {
                    show: false,
                  },
                  emphasis:{
                    disabled:true
                  },
                  itemStyle: {
                    color: function(param) {
                      const value = param.data.value;
                      if (value <= 33) {
                        return {
                          type: "linear",
                            x: 0,
                          y: 1,
                          colorStops: [
                          {
                            offset: 0,
                            color: "#1DB363" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#34D780" // 100% 处的颜色
                          }
                        ],
                          global: false // 缺省为 false
                        };
                      } else if (value > 33 && value <= 66) {
                        return {
                          type: "linear",
                          x: 0,
                          y: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#FF9E4C" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#FAC53E" // 100% 处的颜色
                            }
                          ],
                          global: false // 缺省为 false
                        };
                      } else {
                        return {
                          type: "linear",
                          x: 0,
                          y: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#FF4C4C" // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#FF8686" // 100% 处的颜色
                            }
                          ],
                          global: false // 缺省为 false
                        };
                      }
                    }
                  },
                  data: [
                    {value: percent, name: 'percentnumber',label:{show:true,position:"center",color:percentColor,fontSize:24,fontFamily:"KINGDEEKB",formatter:percent+"%"}}, // 实际进度数据
                    {value: 100-percent, name: 'emptynumber', itemStyle: {color: '#E5EFFE'}}  // 剩余未完成数据
                  ]
                }
                ]
              };
            } else {
                if ((item.type == "bar" || item.type == "line") && userseries?.length > 0) {
                    const firstRow = dataSet?.[0]?.source?.[0];
                    const userseriesIndex = firstRow.indexOf(userseries[0]);
                    let extractedColumn = dataSet?.[0]?.source
                        ?.slice(1)
                        .map(temprow => temprow[userseriesIndex])
                        .filter((tempvalue, tempindex, tempself) => {
                            return tempself.indexOf(tempvalue) === tempindex;
                        });

                    if (extractedColumn?.length > 1 && sortfield?.length > 0 && sortfield.filter((v: any) => v.key == userseries?.[0])?.length > 0) {
                        const userseriesSortKey = sortfield.filter((v: any) => v.key == userseries?.[0])?.[0]?.sortkey;
                        const userseriesSortType = sortfield.filter((v: any) => v.key == userseries?.[0])?.[0]?.sorttype;
                        const userseriesSortIndex = firstRow.indexOf(userseriesSortKey);
                        if (userseriesSortKey && userseriesSortType && userseriesSortIndex >= 0) {
                            let extractedColumnBeforeSort = dataSet?.[0]?.source
                                ?.slice(1)
                                .reduce((acc, current) => {
                                    let index = acc.findIndex(item => item[userseriesIndex] == current[userseriesIndex]);
                                    if (index === -1) {
                                        acc.push(current);
                                    }
                                    return acc;
                                }, [])
                                .map(temprow => [temprow[userseriesIndex], temprow[userseriesSortIndex]]);

                            const extractedColumnAfterSort = extractedColumnBeforeSort.sort((a: any, b: any) => {
                                if (typeof a[1] === "string" || typeof b[1] === "string") {
                                    if (userseriesSortType == "asc") {
                                        return a[1].localeCompare(b[1]);
                                    } else {
                                        return b[1].localeCompare(a[1]);
                                    }
                                } else if (typeof a[1] === "number" || typeof b[1] === "number") {
                                    if (userseriesSortType == "asc") {
                                        return a[1] - b[1];
                                    } else {
                                        return b[1] - a[1];
                                    }
                                } else {
                                    return 0;
                                }
                            });

                            if (extractedColumnAfterSort?.length > 0) {
                                extractedColumn = extractedColumnAfterSort.map(temprow => temprow[0]);
                            }
                        }
                    }
                    const result = dataSet?.[0]?.source?.slice(1).reduce((acc, current) => {
                        if (!current) {
                            return acc;
                        }
                        const groupName = current[userseriesIndex];
                        // 检查累加器中是否已经存在该分组
                        if (!acc[groupName]) {
                            // 如果不存在，创建一个新的分组
                            acc[groupName] = [];
                        }
                        // 将当前项添加到对应的分组中
                        acc[groupName].push(current);
                        // 返回更新后的累加器
                        return acc;
                    }, {});

                    series = (extractedColumn || dataSet?.[0]?.source?.[0].slice(1)).map((v: any, i: any) => ({
                        ...charts.series[0],
                        type: item.type,
                        name: v,
                        stack: item.originname == "堆积条形图" || item.originname == "堆积柱形图" ? "stack" : "",
                        areaStyle: item.originname == "面积图" ? {} : null,
                        dimensions: firstRow,
                        data: result[v] || [],
                        encode: {
                            x: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? useryindex : userxindex || ["product"],
                            y: item.originname == "横向柱状图" || item.originname == "堆积条形图" ? userxindex || ["product"] : useryindex
                        }
                    }));
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
            }

            let output = { ...echartOpt, dataset: dataSet, series };

            if (!_.isEqual(chartOptionRef.current.option, output)) {
                setEchartKey(uuidv4());
            }

            chartOptionRef.current = {
                option: _.cloneDeep(output)
            };

            item.type == "gauge" && _.assign(output.series, gaugeStyle);
            item.type == "gauge2" && _.assign(output.series, GAUGE_STYLE2);

            if (item.type == "bar" || item.type == "line") {
                let res = { ...echartOpt.legend };
                delete res.right;
                delete res.left;
                delete res.bottom;
                delete res.top;

                if (item.content.config.legendPos == "top") {
                    delete res.bottom;
                    res = { ...res, top: item.content.config.charts.legend.top };
                } else if (item.content.config.legendPos == "left") {
                    delete res.right;
                    res = { ...res, left: item.content.config.charts.legend.left };
                } else if (item.content.config.legendPos == "right") {
                    delete res.left;
                    res = { ...res, right: 5 };
                } else if (item.content.config.legendPos == "bottom") {
                    delete res.top;
                    res = { ...res, bottom: item.content.config.charts.legend.bottom };
                } else if (item.content.config.legendPos == "topCenter") {
                    delete res.bottom;
                    delete res.right;
                    res = { ...res, left: "center", top: 0 };
                } else if (item.content.config.legendPos == "bottomCenter") {
                    delete res.top;
                    delete res.right;
                    res = { ...res, left: "center", bottom: item.content.config.charts.legend.bottom };
                }

                output = { ...output, legend: res };
            }

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

        const setLegendStyle = (echart: any, legend: any, index?: any) => {
            const _index = index === undefined ? activeEchartIndex.current : index;
            const _legend = legend.map((leg: any, idx: any) => {
                if (idx === _index) {
                    return {
                        ...leg,
                        align: "left",
                        shadowColor: "rgba(0, 0, 0, 0.17)",
                        shadowBlur: 5,
                        borderWidth: 0.4,
                        borderRadius: 0.2,
                        backgroundColor: "#fff"
                    };
                } else {
                    return leg;
                }
            });
            echart.setOption({ legend: [..._legend] }, { replaceMerge: "legend" });
        };
        function formatNumberWithEllipsis(number: any) {
            // 将数字转换为字符串
            const numberString = String(number);

            // 如果数字字符串长度超过8位，则截取前8位并加上三个点
            if (numberString.length > 12) {
                return numberString.slice(0, 12) + "...";
            }

            // 如果没有超过8位，则直接返回原数字字符串
            return numberString;
        }
        const initScroll = (echart: any, legend: any, data: any, index: any) => {
            clearInterval(timer.current);
            timer.current = setInterval(() => {
                echart.dispatchAction({
                    type: "downplay",
                    dataIndex: index
                });

                echart.dispatchAction({
                    type: "highlight",
                    dataIndex: activeEchartIndex.current
                });

                echart.dispatchAction({
                    type: "downplay",
                    dataIndex: activeEchartIndex.current == 0 ? data.length - 1 : activeEchartIndex.current - 1
                });

                setLegendStyle(echart, legend);

                if (activeEchartIndex.current == data.length - 1) {
                    activeEchartIndex.current = 0;
                } else {
                    activeEchartIndex.current += 1;
                }
            }, 3000);
        };

        useEffect(() => {
            const echart = ref.current?.getEchartsInstance();
            if (!echart) {
                return;
            }
            const data = chartOption.series?.data;
            const legendStyle = item.content.config.legendStyle == "customMade";
            const legend = chartOption.legend;

            clearInterval(timer.current);
            echart.off("highlight");
            echart.off("mouseover");
            echart.off("downplay");
            echart.off("mouseout");

            if (item.type == "pie" && echart && data) {
                if (legendStyle) {
                    initScroll(echart, legend, data, 0);

                    // 鼠标滑过事件
                    (() => {
                        const hoverFn = (name: any) => {
                            if (name) {
                                const index = legend?.findIndex((v: any) => v.data?.[0]?.name == name);
                                echart.dispatchAction({ type: "downplay" });
                                echart.dispatchAction({ type: "highlight", dataIndex: index });
                                setLegendStyle(echart, legend, index);
                                clearInterval(timer.current);
                            }
                        };
                        const outHoverFn = (name: any) => {
                            if (name) {
                                const index = legend?.findIndex((v: any) => v.data?.[0]?.name == name);
                                echart.dispatchAction({ type: "highlight", dataIndex: index });
                                initScroll(echart, legend, data, index);
                            }
                        };
                        echart.on("highlight", (e: any) => hoverFn(e.name));
                        echart.on("mouseover", (e: any) => hoverFn(e.name));
                        echart.on("downplay", (e: any) => outHoverFn(e.name));
                        echart.on("mouseout", (e: any) => outHoverFn(e.name));
                    })();
                } else {
                    echart.dispatchAction({
                        type: "highlight",
                        dataIndex: 0 // 要高亮的数据项的索引
                    });

                    // 鼠标滑过事件
                    (() => {
                        let downplayIndex = 0;
                        const hoverFn = (name: any) => {
                            if (name) {
                                const index = data.findIndex((item: any) => item.name === name);
                                echart.dispatchAction({
                                    type: "downplay",
                                    dataIndex: downplayIndex // 取消高亮
                                });
                                echart.dispatchAction({
                                    type: "highlight",
                                    dataIndex: index // 要高亮的数据项的索引
                                });
                            }
                        };
                        const outHoverFn = (name: any) => {
                            if (name) {
                                const index = data.findIndex((item: any) => item.name === name);
                                downplayIndex = index;
                                echart.dispatchAction({
                                    type: "downplay",
                                    dataIndex: downplayIndex // 取消高亮
                                });
                                echart.dispatchAction({
                                    type: "highlight",
                                    dataIndex: index // 要高亮的数据项的索引
                                });
                            }
                        };
                        echart.on("highlight", (e: any) => {
                            hoverFn(e.name);
                        });
                        echart.on("downplay", (e: any) => {
                            outHoverFn(e.name);
                        });
                        echart.on("mouseover", (e: any) => {
                            hoverFn(e.name);
                        });
                        echart.on("mouseout", (e: any) => {
                            outHoverFn(e.name);
                        });
                    })();
                }
            }
        }, [chartOption]);

      const onChartClick = useCallback((params: any) => {
        // 在这里处理点击事件，可以获取点击的图形的数据
        const { data } = params;
        const { pluginname,category,type} = item;
        if (pluginname && category && type) {
          const clickData = {
            pluginname: pluginname,
            data: data,
            category: category,
            type: type,
            selectFilter:item._echartFilter
          };
          model?.invoke?.("clickcharts", JSON.stringify(clickData));
        }
      },[]);

        useEffect(() => {
            if (!ref.current) {
                return;
            }
            const parent = ref.current.ele.parentElement;
            const padding = (getComputedStyle(parent).padding || "0").replace("px", "");
            setEchartStyle({
                width: `${parent.offsetWidth - Number(padding) * 2}px`,
                height: `${parent.offsetHeight - Number(padding) * 2}px`
            });
        }, [chartOption]);

        return (
            <KdCard item={item} showTitle={showTitle} bodyStyle={{ overflow: "hidden" }}>
                {showLoading ? (
                    <Spin type='page' spinning={showLoading} style={{ width: "100%", height: "100%", justifyContent: "center" }}></Spin>
                ) : (
                    <ReactECharts
                        key={echartKey}
                        style={customProps.isShow && echartStyle ? echartStyle : { width: "100%", height: "100%" }}
                        option={{ ...chartOption, animationEasing: "cubicInOut", animationDuration: 2000 }}
                        ref={ref}
                        onEvents={{ click: onChartClick }}
                    />
                )}
            </KdCard>
        );
    },
    (oldProps, newProps) => {
        return _.isEqual(oldProps, newProps);
    }
);
