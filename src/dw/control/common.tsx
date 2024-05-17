import { ControlProProps, DisplayProps, RequestProps } from "dw/control/interface";
import { Icon } from "@kdcloudjs/kdesign";
import React from "react";
import _ from "lodash";
import i18n from "dw/api/I18n";
import {
    getUpdateArray,
    legendPosition0,
    legendPosition1,
    legendPosition2,
    legendPosition3,
    legendPosition4,
    legendPosition5,
    legendPosition6,
    legendPosition7,
    legendPosition8,
    legendPosition9
} from "dw/api";

import { BarChartPieDataLabelTypes, BorderStyleList, CurrencySymbols, DigitalTypes, FunnelLabelPosition } from "dw/api/Constants";
import { legendPositionList, legendOrientList, legendRectList, unitarea, units } from "dw/api/EchartsOption";

export const DEFAULT_REQUEST_PROP: RequestProps = {
    legendReName: null,
    displayReName: null,
    legendDetailReName: null,
    xAxisReName: "",
    yAxisReName: "",
    customValueX: "",
    customValueY: "",
    xTitleShow: false,
    yTitleShow: false,
    xnameRotate: 0,
    ynameRotate: 90,
    yLineSubRotate: -90,
    yAxisLineReName: null,
    smallSeriesLegendReName: null,
    sortSelectX: "",
    sortSelectY: "",
    xAxisNumber: null,
    yAxisNumber: null,
    smallSeriesChartNumber: null,
    yAxisLineNumbers: [],
    TableColumns: [],
    legendNumber: "",
    displayValueNumber: "",
    legendDetailNumber: ""
};

export const DEFAULT_DATASET = {
    id: null,
    name: "",
    detail: [],
    var: [],
    filter: [],
    request: { ...DEFAULT_REQUEST_PROP }
};

export const DEFAULT_PIE_LABEL = {
    position: "center",
    formatter: function (seriesValue: any) {
        console.log("formatter", seriesValue);
        return seriesValue.data[1] + "\n\n" + seriesValue.data[0];
    }
};
export const DEFAULT_PIE_ITEMSTYLE = {
    borderRadius: 0,
    borderColor: "#fff",
    borderWidth: 2
};

export const DEFAULT_CHARTS_COLOR = [
    {
        type: "linear",
        x: 0,
        y: 1,
        colorStops: [
            {
                offset: 0,
                color: "#248AFF" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#6CBEFF" // 100% 处的颜色
            },
            {
                offset: 1,
                color: "#6CBEFF" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    },
    {
        type: "linear",
        x: 0,
        y: 1,
        colorStops: [
            {
                offset: 0,
                color: "#FF9E4C" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#FFD66D" // 100% 处的颜色
            },
            {
                offset: 1,
                color: "#FFD66D" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    },
    {
        type: "linear",
        x: 0,
        y: 1,
        colorStops: [
            {
                offset: 0,
                color: "#84F2D4" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#48D1CC" // 50% 处的颜色
            },
            {
                offset: 1,
                color: "#48D1CC" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    },
    {
        type: "linear",
        x: 0,
        y: 1,

        colorStops: [
            {
                offset: 0,
                color: "#FFA0AA" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#FF5667" // 50% 处的颜色
            },
            {
                offset: 1,
                color: "#FF5667" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    },
    {
        type: "linear",
        x: 0,
        y: 1,
        colorStops: [
            {
                offset: 0,
                color: "#7C96FF" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#3F64FF" // 50% 处的颜色
            },
            {
                offset: 1,
                color: "#3F64FF" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    },
    {
        type: "linear",
        x: 0,
        y: 1,
        colorStops: [
            {
                offset: 0,
                color: "#B3FF87" // 0% 处的颜色
            },
            {
                offset: 0.5,
                color: "#7CE043" // 50% 处的颜色
            },
            {
                offset: 1,
                color: "#7CE043" // 100% 处的颜色
            }
        ],
        global: false // 缺省为 false
    }
];

export const DEFAULT_STYLE = {
    fontColor: "#2a2a2a",
    background: "#fff"
};

// 文本
export const BASE_PROP: ControlProProps = {
    id: "base",
    name: "基本信息",
    defaultOpen: true,
    nodes: [
        {
            visible: true,
            id: "name",
            name: "组件名称",
            editor: { component: "Input", defaultValue: "name" }
        },
        {
            visible: true,
            id: "zindex",
            name: "显示顺序",
            editor: {
                component: "Input",
                dataType: "number",
                type: "embed"
            }
        },
        {
            visible: true,
            id: "content.data",
            name: "内容",
            editor: {
                component: "TextArea",
                dataType: "string",
                defaultValue: "请输入内容",
                borderType: "bordered",
                autoSize: { minRows: 2, maxRows: 6 },
                placeholder: "请输入内容"
            },
            style: {
                alignItems: "start",
                height: "auto"
            }
        }
    ]
};

export const TITLE_PROP: ControlProProps = {
    id: "content.title",
    name: "标题",
    defaultOpen: false,
    show: {
        value: true,
        actions: [
            {
                condition: { value: true },
                todo: [{ id: "content.title.show", changeValue: true }],
                elseTodo: [{ id: "content.title.show", changeValue: false }]
            }
        ]
    },
    nodes: [
        {
            visible: false,
            id: "content.title.show",
            editor: { defaultValue: true }
        },
        {
            visible: false,
            id: "content.title.fontWeight",
            editor: { defaultValue: "normal" }
        },
        {
            visible: false,
            id: "content.title.fontStyle",
            editor: { defaultValue: "normal" }
        },
        {
            visible: false,
            id: "content.title.underline",
            editor: { defaultValue: "none" }
        },
        {
            visible: true,
            id: "content.title.fontSize",
            name: "字体大小",
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 14
            }
        },
        {
            visible: true,
            id: "content.title.fontStyleArray",
            name: "样式",
            editor: {
                component: "Checkbox",
                options: [
                    { value: "fontWeight", name: <Icon type='bold-solid' /> },
                    { value: "fontStyle", name: <Icon type='oblique-solid' /> },
                    { value: "textDecoration", name: <Icon type='underline-solid' /> }
                ],
                dataType: "array",
                defaultValue: [],
                checkboxType: "square"
            },
            actions: [
                {
                    condition: { value: "fontWeight", mark: "in" },
                    todo: [{ id: "content.title.fontWeight", changeValue: "bold" }],
                    elseTodo: [{ id: "content.title.fontWeight", changeValue: "normal" }]
                },
                {
                    condition: { value: "fontStyle", mark: "in" },
                    todo: [{ id: "content.title.fontStyle", changeValue: "italic" }],
                    elseTodo: [{ id: "content.title.fontStyle", changeValue: "normal" }]
                },
                {
                    condition: { value: "textDecoration", mark: "in" },
                    todo: [{ id: "content.title.underline", changeValue: "underline" }],
                    elseTodo: [{ id: "content.title.underline", changeValue: "none" }]
                }
            ]
        },
        {
            visible: true,
            id: "content.title.align",
            name: "样式",
            editor: {
                component: "Radio",
                options: [
                    { value: "left", name: <Icon type='align-left' /> },
                    { value: "center", name: <Icon type='align-center' /> },
                    { value: "right", name: <Icon type='align-right' /> }
                ],
                dataType: "string",
                defaultValue: "center",
                radioType: "square"
            }
        },
        {
            visible: true,
            id: "content.title.fontColor",
            name: "字体颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.fontColor
            }
        },
        {
            visible: true,
            id: "content.title.backColor",
            name: "背景颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.background
            }
        },
        {
            visible: true,
            id: "title",
            name: "内容",
            editor: {
                component: "Input",
                dataType: "string",
                defaultValue: "标题"
            }
        }
    ]
};

export const BORDER_PROP: ControlProProps = {
    id: "border",
    name: "边框",
    defaultOpen: false,
    show: {
        value: true,
        actions: [
            {
                condition: { value: true },
                todo: [
                    { id: "content.showBorder", changeValue: true },
                    { id: "content.borderOpacity", changeValue: 1 },
                    { id: "content.borderColor", changeValue: "#fff" }
                ],
                elseTodo: [
                    { id: "content.showBorder", changeValue: false },
                    { id: "content.borderOpacity", changeValue: 0 }
                ]
            }
        ]
    },
    nodes: [
        {
            visible: false,
            id: "content.showBorder",
            editor: { defaultValue: true }
        },
        {
            visible: true,
            id: "content.borderColor",
            name: "颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.fontColor
            }
        },
        {
            visible: true,
            id: "content.borderOpacity",
            name: "透明度",
            editor: {
                component: "Stepper",
                dataType: "number",
                max: 1,
                min: 0,
                step: 0.01,
                defaultValue: 1
            }
        },
        {
            visible: true,
            id: "content.borderWidth",
            name: "边框线宽度",
            editor: {
                component: "Stepper",
                dataType: "number",
                max: 10,
                min: 0,
                step: 1,
                defaultValue: 0
            }
        },
        {
            visible: true,
            id: "content.borderStyle",
            name: "边框样式",
            editor: {
                component: "Select",
                dataType: "string",
                defaultValue: "dotted",
                options: getUpdateArray(BorderStyleList)
            }
        }
    ]
};

export const BACKGROUND_PROP: ControlProProps = {
    id: "background",
    name: "背景",
    defaultOpen: false,
    show: { value: true },
    nodes: [
        {
            visible: false,
            id: "content.showBak",
            editor: { defaultValue: true }
        },
        {
            visible: true,
            id: "content.backgroundColor",
            name: "颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.background
            }
        },
        {
            visible: true,
            id: "content.opacity",
            name: "透明度",
            editor: {
                component: "Stepper",
                dataType: "number",
                max: 1,
                min: 0,
                step: 0.01,
                defaultValue: 1
            }
        },
        {
            visible: true,
            id: "content.backgroundImage",
            name: "背景图片",
            editor: {
                component: "Input"
            }
        }
    ]
};

export const DESC_PROP: ControlProProps = {
    id: "desc",
    name: "组件说明",
    defaultOpen: false,
    show: {
        value: false,
        actions: [
            {
                condition: { value: true },
                todo: [{ id: "content.desc.show", changeValue: true }],
                elseTodo: [{ id: "content.desc.show", changeValue: false }]
            }
        ]
    },
    nodes: [
        {
            visible: false,
            id: "content.desc.show",
            editor: { defaultValue: false }
        },
        {
            visible: true,
            id: "content.desc.content",
            name: "内容",
            editor: {
                component: "TextArea",
                dataType: "string",
                defaultValue: "",
                borderType: "bordered",
                autoSize: { minRows: 2, maxRows: 6 },
                placeholder: "请输入内容"
            },
            style: {
                alignItems: "start",
                height: "auto"
            }
        }
    ]
};

export const POSITION_PROP = (defaultW: Number = 400, defaultH: Number = 300) => ({
    id: "position",
    name: i18n.msg("sizeAndPosition"),
    defaultOpen: false,
    nodes: [
        {
            visible: true,
            id: "zindex",
            name: "显示顺序",
            editor: { component: "Stepper", dataType: "number", type: "embed" }
        },
        {
            visible: true,
            id: "x",
            name: "水平方向",
            editor: { component: "Stepper", dataType: "number", defaultValue: 10, type: "embed" }
        },
        {
            visible: true,
            id: "y",
            name: "垂直方向",
            editor: { component: "Stepper", dataType: "number", defaultValue: 10, type: "embed" }
        },
        {
            visible: true,
            id: "h",
            name: "高度",
            editor: { component: "Stepper", dataType: "number", defaultValue: defaultH, type: "embed" }
        },
        {
            visible: true,
            id: "w",
            name: "宽度",
            editor: { component: "Stepper", dataType: "number", defaultValue: defaultW, type: "embed" }
        }
    ]
});

export const PIE_OTHER_PROP: ControlProProps = {
    id: "pie.other",
    name: "其它",
    defaultOpen: false,
    nodes: [
        {
            visible: true,
            id: "content.chartParameters",
            name: "图表参数",
            editor: {
                component: "Switch",
                dataType: "boolean",
                defaultValue: true
            }
        },
        {
            visible: true,
            id: "content.config.showStarAngle",
            name: "旋转",
            editor: {
                component: "Switch",
                dataType: "boolean",
                defaultValue: false
            },
            actions: [
                {
                    condition: { value: true },
                    todo: [
                        {
                            id: "content.config.charts.series[0].starAngle",
                            changeType: "node",
                            changeId: "visible",
                            changeValue: true
                        }
                    ],
                    elseTodo: [
                        {
                            id: "content.config.charts.series[0].starAngle",
                            changeType: "node",
                            changeId: "visible",
                            changeValue: false
                        }
                    ]
                }
            ]
        },
        {
            visible: false,
            id: "content.config.charts.series[0].starAngle",
            name: "旋转角度",
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 90,
                min: -90,
                max: 90
            }
        }
    ]
};

export const LEGEND_PROP: ControlProProps = {
    id: "content.config.charts.legend",
    name: "图例",
    defaultOpen: false,
    show: {
        value: true,
        actions: [
            {
                condition: { value: true },
                todo: [{ id: "content.config.charts.legend.show", changeValue: true }],
                elseTodo: [{ id: "content.config.charts.legend.show", changeValue: false }]
            }
        ]
    },
    nodes: [
        { visible: false, id: "content.config.charts.legend.show", editor: { defaultValue: true } },
        { visible: false, id: "content.config.charts.legend.left", editor: { defaultValue: "auto" } },
        { visible: false, id: "content.config.charts.legend.right", editor: { defaultValue: "auto" } },
        { visible: false, id: "content.config.charts.legend.bottom", editor: { defaultValue: "auto" } },
        { visible: false, id: "content.config.charts.legend.top", editor: { defaultValue: "auto" } },
        { visible: false, id: "content.config.charts.legend.align", editor: { defaultValue: "auto" } },
        { visible: false, id: "content.config.charts.legend.orient", editor: { defaultValue: "horizontal" } },
        { visible: false, id: "content.config.charts.legend.textStyle.fontWeight", editor: { defaultValue: "normal" } },
        { visible: false, id: "content.config.charts.legend.textStyle.fontStyle", editor: { defaultValue: "normal" } },
        {
            visible: true,
            id: "content.config.charts.legend.textStyle.fontSize",
            name: "字体大小",
            editor: { component: "Stepper", dataType: "number", defaultValue: 12 }
        },
        {
            visible: true,
            id: "content.config.charts.legend.top",
            name: "距离顶部",
            editor: { component: "Stepper", dataType: "number", defaultValue: -5 }
        },
        {
            visible: true,
            id: "content.config.charts.legend.itemWidth",
            name: "图例宽",
            editor: { component: "Stepper", dataType: "number", defaultValue: 15 }
        },
        {
            visible: true,
            id: "content.config.charts.legend.itemHeight",
            name: "图例高",
            editor: { component: "Stepper", dataType: "number", defaultValue: 15 }
        },
        {
            visible: true,
            id: "content.config.charts.legend.textStyle.color",
            name: "字体颜色",
            editor: { component: "ColorPicker", dataType: "string", defaultValue: DEFAULT_STYLE.fontColor }
        },
        {
            visible: true,
            id: "content.config.charts.legend.orient",
            name: "图例方向",
            editor: { component: "Select", options: getUpdateArray(legendOrientList), defaultValue: "horizontal" }
        },
        {
            visible: true,
            id: "content.config.legendPos",
            name: "图例位置",
            editor: {
                component: "Select",
                options: getUpdateArray(legendPositionList),
                dataType: "number",
                defaultValue: 0
            },
            actions: [
                {
                    condition: { value: 0 },
                    todo: _.cloneDeep(legendPosition0)
                },
                {
                    condition: { value: 1 },
                    todo: _.cloneDeep(legendPosition1)
                },
                {
                    condition: { value: 2 },
                    todo: _.cloneDeep(legendPosition2)
                },
                {
                    condition: { value: 3 },
                    todo: _.cloneDeep(legendPosition3)
                },
                {
                    condition: { value: 4 },
                    todo: _.cloneDeep(legendPosition4)
                },
                {
                    condition: { value: 5 },
                    todo: _.cloneDeep(legendPosition5)
                },
                {
                    condition: { value: 6 },
                    todo: _.cloneDeep(legendPosition6)
                },
                {
                    condition: { value: 7 },
                    todo: _.cloneDeep(legendPosition7)
                },
                {
                    condition: { value: 8 },
                    todo: _.cloneDeep(legendPosition8)
                },
                {
                    condition: { value: 9 },
                    todo: _.cloneDeep(legendPosition9)
                }
            ]
        },
        {
            visible: true,
            id: "content.config.charts.legend.icon",
            name: "图例形状",
            editor: { component: "Select", options: getUpdateArray(legendRectList), defaultValue: "rect" }
        },
        {
            visible: true,
            id: "content.config.fontStyleArray",
            name: "样式",
            editor: {
                component: "Checkbox",
                options: [
                    { value: "fontWeight", name: <Icon type='bold-solid' /> },
                    { value: "fontStyle", name: <Icon type='oblique-solid' /> }
                ],
                dataType: "array",
                defaultValue: [],
                checkboxType: "square"
            },
            actions: [
                {
                    condition: { value: "fontWeight", mark: "in" },
                    todo: [{ id: "content.config.charts.legend.textStyle.fontWeight", changeValue: "bold" }],
                    elseTodo: [{ id: "content.config.charts.legend.textStyle.fontWeight", changeValue: "normal" }]
                },
                {
                    condition: { value: "fontStyle", mark: "in" },
                    todo: [{ id: "content.config.charts.legend.textStyle.fontStyle", changeValue: "italic" }],
                    elseTodo: [{ id: "content.config.charts.legend.textStyle.fontStyle", changeValue: "normal" }]
                }
            ]
        }
    ]
};

export const DIGITAL_FORMAT_PROP: ControlProProps = {
    id: "content.config.digitalFormat",
    name: i18n.msg("c26"),
    defaultOpen: false,
    show: {
        value: true,
        actions: [
            {
                condition: { value: true },
                todo: [{ id: "content.config.charts.series[0].label.show", changeValue: true }],
                elseTodo: [{ id: "content.config.charts.series[0].label.show", changeValue: false }]
            }
        ]
    },
    nodes: [
        {
            visible: false,
            id: "content.config.charts.series[0].label.show",
            editor: { defaultValue: true }
        },
        {
            visible: false,
            id: "content.config.charts.series[0].label.fontWeight",
            editor: { defaultValue: "normal" }
        },
        {
            visible: false,
            id: "content.config.charts.series[0].label.fontStyle",
            editor: { defaultValue: "normal" }
        },
        {
            visible: true,
            id: "content.config.charts.series[0].label.fontSize",
            name: i18n.msg("c03"),
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 12
            }
        },
        {
            visible: true,
            id: "content.config.charts.series[0].label.color",
            name: "字体颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.fontColor
            }
        },
        {
            visible: true,
            id: "content.config.label.fontStyleArray",
            name: "样式",
            editor: {
                component: "Checkbox",
                options: [
                    { value: "fontWeight", name: <Icon type='bold-solid' /> },
                    { value: "fontStyle", name: <Icon type='oblique-solid' /> }
                ],
                dataType: "array",
                defaultValue: [],
                checkboxType: "square"
            },
            actions: [
                {
                    condition: { value: "fontWeight", mark: "in" },
                    todo: [{ id: "content.config.charts.series[0].label.fontWeight", changeValue: "bold" }],
                    elseTodo: [{ id: "content.config.charts.series[0].label.fontWeight", changeValue: "normal" }]
                },
                {
                    condition: { value: "fontStyle", mark: "in" },
                    todo: [{ id: "content.config.charts.series[0].label.fontStyle", changeValue: "italic" }],
                    elseTodo: [{ id: "content.config.charts.series[0].label.fontStyle", changeValue: "normal" }]
                }
            ]
        },
        {
            visible: true,
            id: "content.config.charts.series[0].label.position",
            name: i18n.msg("labelPosition"),
            editor: {
                component: "Select",
                dataType: "string",
                defaultValue: "outside",
                options: getUpdateArray(FunnelLabelPosition)
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.dataLabelType",
            name: i18n.msg("c75"),
            editor: {
                component: "Select",
                dataType: "string",
                defaultValue: "classificationdatavalue",
                options: getUpdateArray(BarChartPieDataLabelTypes)
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.digitalType",
            name: i18n.msg("c32"),
            editor: {
                component: "Select",
                dataType: "string",
                defaultValue: "digital",
                options: getUpdateArray(DigitalTypes)
            },
            actions: [
                {
                    condition: { value: "currency" },
                    todo: [
                        {
                            id: "content.config.digitalFormat.currencySymbols",
                            changeId: "visible",
                            changeValue: true,
                            changeType: "node"
                        }
                    ],
                    elseTodo: [
                        {
                            id: "content.config.digitalFormat.currencySymbols",
                            changeId: "visible",
                            changeValue: false,
                            changeType: "node"
                        }
                    ]
                },
                {
                    condition: { value: "percent" },
                    todo: [
                        {
                            id: "content.config.digitalFormat.unit",
                            changeId: "visible",
                            changeValue: false,
                            changeType: "node"
                        },
                        {
                            id: "content.config.digitalFormat.unitarea",
                            changeId: "visible",
                            changeValue: false,
                            changeType: "node"
                        },
                        {
                            id: "content.config.digitalFormat.enableThousands",
                            changeId: "visible",
                            changeValue: false,
                            changeType: "node"
                        }
                    ],
                    elseTodo: [
                        {
                            id: "content.config.digitalFormat.unit",
                            changeId: "visible",
                            changeValue: true,
                            changeType: "node"
                        },
                        {
                            id: "content.config.digitalFormat.unitarea",
                            changeId: "visible",
                            changeValue: true,
                            changeType: "node"
                        },
                        {
                            id: "content.config.digitalFormat.enableThousands",
                            changeId: "visible",
                            changeValue: true,
                            changeType: "node"
                        }
                    ]
                }
            ]
        },
        {
            visible: false,
            id: "content.config.digitalFormat.currencySymbols",
            name: i18n.msg("c33"),
            editor: {
                component: "Select",
                dataType: "string",
                defaultValue: "¥",
                options: getUpdateArray(CurrencySymbols)
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.unit",
            name: i18n.msg("displayElement"),
            editor: {
                component: "Select",
                dataType: "number",
                defaultValue: 1,
                options: getUpdateArray(units)
            },
            actions: [
                {
                    condition: { mark: "together" },
                    todo: [{ id: "content.config.unit", changeType: "together" }]
                }
            ]
        },
        {
            visible: false,
            id: "content.config.unit",
            editor: {
                defaultValue: 1
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.decimalPlace",
            name: i18n.msg("c34"),
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 2,
                min: 0,
                max: 10
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.enableThousands",
            name: i18n.msg("c35"),
            editor: {
                component: "Switch",
                dataType: "boolean",
                defaultValue: false
            }
        },
        {
            visible: true,
            id: "content.config.digitalFormat.unitarea",
            name: i18n.msg("unitarea"),
            editor: {
                component: "Select",
                dataType: "number",
                defaultValue: 1,
                options: getUpdateArray(unitarea)
            }
        },
        {
            visible: true,
            id: "content.config.charts.series[0].barWidth",
            name: i18n.msg("c97"),
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 10
            }
        }
    ]
};

// 新增-图表基本信息
export const CHART_BASE_INFO: any = {
    id: "chartcontrol",
    name: "基本信息",
    defaultOpen: true,
    nodes: [
        {
            visible: true,
            id: "name",
            name: "组件名称",
            editor: { component: "Input", defaultValue: "name" }
        },
        {
            visible: true,
            id: "",
            name: "版本筛选",
            type: "chartConfig",
            editor: { component: "VersionSelect" }
        },
        {
            visible: true,
            id: "chartcontrol.version",
            name: "版本",
            editor: { component: "Input" }
        },
        {
            visible: true,
            id: "chartcontrol.versiondesc",
            name: "版本描述",
            editor: { component: "Input" }
        },
        {
            visible: true,
            id: "chartcontrol.pluginname",
            name: "插件标识",
            editor: { component: "Input" }
        },
        {
            visible: true,
            id: "chartcontrol.ispublish",
            name: "是否发布",
            editor: {
                component: "Select",
                options: [
                    { name: "是", value: "1" },
                    { name: "否", value: "0" }
                ],
                defaultValue: "1"
            }
        }
    ]
};

export const CHART_DARA_SET: any = {
    id: "userDataSelct",
    name: "基本信息",
    defaultOpen: true,
    nodes: [
        {
            visible: false,
            id: "pkid",
            name: "pkid",
            type: "chartConfig",
            editor: { component: "Input" }
        },
        {
            visible: true,
            id: "",
            name: "",
            type: "chartConfig",
            editor: { component: "EchartDataSet" },
            style: { height: "430px", alignItems: "flex-start" }
        }
    ]
};

export const QUOTA_PROP: ControlProProps = {
    id: "content.quota",
    name: "业务指标内容",
    defaultOpen: true,
    nodes: [
        {
            visible: false,
            id: "content.quota.show",
            editor: { defaultValue: true }
        },
        {
            visible: false,
            id: "content.quota.fontWeight",
            editor: { defaultValue: "normal" }
        },
        {
            visible: false,
            id: "content.quota.fontStyle",
            editor: { defaultValue: "normal" }
        },
        {
            visible: false,
            id: "content.quota.underline",
            editor: { defaultValue: "none" }
        },
        {
            visible: true,
            id: "content.quota.fontSize",
            name: "字体大小",
            editor: {
                component: "Stepper",
                dataType: "number",
                defaultValue: 25
            }
        },
        {
            visible: true,
            id: "content.quota.fontStyleArray",
            name: "样式",
            editor: {
                component: "Checkbox",
                options: [
                    { value: "fontWeight", name: <Icon type='bold-solid' /> },
                    { value: "fontStyle", name: <Icon type='oblique-solid' /> },
                    { value: "textDecoration", name: <Icon type='underline-solid' /> }
                ],
                dataType: "array",
                defaultValue: [],
                checkboxType: "square"
            },
            actions: [
                {
                    condition: { value: "fontWeight", mark: "in" },
                    todo: [{ id: "content.quota.fontWeight", changeValue: "bold" }],
                    elseTodo: [{ id: "content.quota.fontWeight", changeValue: "normal" }]
                },
                {
                    condition: { value: "fontStyle", mark: "in" },
                    todo: [{ id: "content.quota.fontStyle", changeValue: "italic" }],
                    elseTodo: [{ id: "content.quota.fontStyle", changeValue: "normal" }]
                },
                {
                    condition: { value: "textDecoration", mark: "in" },
                    todo: [{ id: "content.quota.underline", changeValue: "underline" }],
                    elseTodo: [{ id: "content.quota.underline", changeValue: "none" }]
                }
            ]
        },
        {
            visible: true,
            id: "content.quota.align",
            name: "样式",
            editor: {
                component: "Radio",
                options: [
                    { value: "left", name: <Icon type='align-left' /> },
                    { value: "center", name: <Icon type='align-center' /> },
                    { value: "right", name: <Icon type='align-right' /> }
                ],
                dataType: "string",
                defaultValue: "center",
                radioType: "square"
            }
        },
        {
            visible: true,
            id: "content.quota.fontColor",
            name: "字体颜色",
            editor: {
                component: "ColorPicker",
                dataType: "string",
                defaultValue: DEFAULT_STYLE.fontColor
            }
        }
    ]
};
