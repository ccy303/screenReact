import {
    BACKGROUND_PROP,
    BORDER_PROP,
    DESC_PROP,
    DIGITAL_FORMAT_PROP,
    LEGEND_PROP,
    PIE_OTHER_PROP,
    POSITION_PROP,
    TITLE_PROP,
    CHART_BASE_INFO,
    CHART_DARA_SET,
    QUOTA_PROP,

    // 文本
    BASE_PROP
} from "dw/control/common";

const echartControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [
                CHART_BASE_INFO,
                TITLE_PROP,
                LEGEND_PROP,
                DIGITAL_FORMAT_PROP,
                BACKGROUND_PROP,
                BORDER_PROP,
                DESC_PROP,
                PIE_OTHER_PROP,
                POSITION_PROP()
            ]
        },
        {
            id: "dataset",
            name: "数据配置",
            properties: [CHART_DARA_SET]
        }
    ]
};

const textControls: any = {
    group: [
        {
            id: "data",
            name: "数据",
            properties: [
                BASE_PROP,
                {
                    id: "",
                    name: "插件配置",
                    defaultOpen: true,
                    nodes: [
                        {
                            visible: true,
                            id: "pluginname",
                            name: "插件标识",
                            editor: { component: "Input" }
                        },
                        {
                            visible: true,
                            id: "chartcontrol.ispublish",
                            name: "是否发布",
                            editor: {
                                component: "Select",
                                dataType: "string",
                                options: [
                                    { name: "是", value: "1" },
                                    { name: "否", value: "0" }
                                ],
                                defaultValue: "1"
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "format",
            name: "格式",
            properties: [
                {
                    id: "text",
                    name: "文本设置",
                    defaultOpen: true,
                    order: 0,
                    nodes: [
                        {
                            visible: true,
                            id: "content.config.fontSize",
                            name: "字号",
                            editor: {
                                component: "Stepper",
                                dataType: "number",
                                defaultValue: 14,
                                type: "embed"
                            }
                        },
                        {
                            visible: true,
                            id: "content.config.color",
                            name: "字体颜色",
                            editor: {
                                component: "ColorPicker",
                                dataType: "string",
                                defaultValue: "#000"
                            }
                        },
                        {
                            visible: true,
                            id: "content.config.textAlign",
                            name: "水平方向",
                            editor: {
                                component: "Stepper",
                                dataType: "number",
                                defaultValue: 14,
                                type: "embed"
                            }
                        },
                        {
                            visible: true,
                            id: "content.config.fontStyle",
                            name: "样式",
                            editor: {
                                component: "Select",
                                options: [
                                    { value: "fontWeight", name: "bold-solid" },
                                    { value: "fontStyle", name: "oblique-solid" },
                                    { value: "textDecoration", name: "underline-solid" }
                                ],
                                defaultValue: ""
                            }
                        }
                    ]
                },
                BACKGROUND_PROP,
                BORDER_PROP,
                DESC_PROP,
                POSITION_PROP(90, 30)
            ]
        }
    ]
};

const borderControls = {
    group: [
        {
            id: "format",
            name: "格式",
            properties: [
                {
                    id: "baseInfoCtrl",
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
                            id: "chartcontrol.ispublish",
                            name: "是否发布",
                            editor: {
                                component: "Select",
                                dataType: "string",
                                options: [
                                    { name: "是", value: "1" },
                                    { name: "否", value: "0" }
                                ],
                                defaultValue: "1"
                            }
                        }
                    ]
                },
                TITLE_PROP,
                BACKGROUND_PROP,
                BORDER_PROP,
                DESC_PROP,
                POSITION_PROP(250, 250)
            ]
        }
    ]
};

const tableControls: any = {
    group: [
        {
            id: "data",
            name: "数据",
            properties: [
                {
                    defaultOpen: true,
                    id: "base",
                    name: "属性",
                    nodes: [
                        {
                            visible: true,
                            id: "name",
                            name: "组件名称",
                            editor: { component: "Input", defaultValue: "name" }
                        },
                        { visible: true, id: "pluginname", name: "插件名称", addonAfterBtn: 2, editor: { component: "Input" } },
                        {
                            visible: true,
                            id: "chartcontrol.ispublish",
                            name: "是否发布",
                            editor: {
                                component: "Select",
                                dataType: "string",
                                options: [
                                    { name: "是", value: "1" },
                                    { name: "否", value: "0" }
                                ],
                                defaultValue: "1"
                            }
                        }
                    ]
                },
                TITLE_PROP,
                BACKGROUND_PROP,
                BORDER_PROP,
                DESC_PROP,
                POSITION_PROP()
            ]
        }
    ]
};

const selectControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [
                {
                    defaultOpen: true,
                    id: "base",
                    name: "属性",
                    nodes: [
                        { visible: true, id: "name", name: "组件名称", editor: { component: "Input", defaultValue: "name" } },
                        { visible: true, id: "chartctrl", name: "图表/控制项", editor: { component: "ChartIdSelect" }, style: { height: "80px" } },
                        {
                            visible: true,
                            id: "chartcontrol.ispublish",
                            name: "是否发布",
                            editor: {
                                component: "Select",
                                dataType: "string",
                                options: [
                                    { name: "是", value: "1" },
                                    { name: "否", value: "0" }
                                ],
                                defaultValue: "1"
                            }
                        }
                    ]
                },
                POSITION_PROP(150, 30)
            ]
        }
    ]
};

const radioControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [
                {
                    defaultOpen: true,
                    id: "base",
                    name: "属性",
                    nodes: [
                        { visible: true, id: "name", name: "组件名称", editor: { component: "Input", defaultValue: "name" } },
                        { visible: true, id: "pluginname", name: "插件名称", addonAfterBtn: 3, editor: { component: "Input" } },
                        {
                            visible: true,
                            id: "content",
                            name: "单选器配置",
                            editor: {
                                component: "RadiosOptions",
                                defaultValue: []
                            },
                            style: { height: "auto" }
                        },
                        {
                            visible: true,
                            id: "chartcontrol.ispublish",
                            name: "是否发布",
                            editor: {
                                component: "Select",
                                dataType: "string",
                                options: [
                                    { name: "是", value: "1" },
                                    { name: "否", value: "0" }
                                ],
                                defaultValue: "1"
                            }
                        }
                    ]
                },
                POSITION_PROP(150, 30)
            ]
        }
    ]
};

const quotaControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [CHART_BASE_INFO, BACKGROUND_PROP, BORDER_PROP, DESC_PROP, QUOTA_PROP, POSITION_PROP(150, 50)]
        },
        {
            id: "dataset",
            name: "数据配置",
            properties: [CHART_DARA_SET]
        }
    ]
};

const tabsControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [
                CHART_BASE_INFO,
                BORDER_PROP,
                POSITION_PROP(200, 100),
                {
                    defaultOpen: true,
                    id: "base",
                    name: "大屏绑定",
                    nodes: [
                        {
                            visible: true,
                            id: "bindscreens",
                            name: "大屏标识",
                            editor: { component: "Bindscreens" },
                            style: { height: "auto" }
                        }
                    ]
                }
            ]
        }
    ]
};

const mapControls: any = {
    group: [
        {
            id: "data",
            name: "属性",
            properties: [CHART_BASE_INFO, BORDER_PROP, POSITION_PROP()]
        }
    ]
};

export const ComponentControlMap: any = {
    charts: echartControls,
    text: textControls,
    border: borderControls,
    table: tableControls,
    select: selectControls,
    radio: radioControls,
    quota: quotaControls,
    tabs: tabsControls,
    map: mapControls
};

export const chartList = [
    {
        componentType: "pie",
        icon: require(`assets/img/analysis_pie_chart_pie.png`),
        desc: "饼图",
        name: "饼图",
        category: "charts"
    },
    {
        componentType: "pie",
        icon: require(`assets/img/analysis_pie_chart_doughnut.png`),
        desc: "环图",
        name: "环图",
        category: "charts"
    },
    {
        componentType: "bar",
        icon: require(`assets/img/analysis_bar_chart_bar_areata.png`),
        desc: "柱状图",
        name: "柱状图",
        category: "charts"
    },
    {
        componentType: "gauge",
        icon: require(`assets/img/analysis_dashboard.png`),
        desc: "仪表盘",
        name: "仪表盘",
        category: "charts"
    },
    {
        componentType: "bar",
        icon: require(`assets/img/analysis_bar_chart_areata_bar_chart.png`),
        desc: "横向柱状图",
        name: "横向柱状图",
        category: "charts"
    },
    {
        componentType: "line",
        icon: require(`assets/img/analysis_line_chart_polyline.png`),
        desc: "折线图",
        name: "折线图",
        category: "charts"
    },
    {
        componentType: "line",
        icon: require(`assets/img/analysis_line_chart_stack_square.png`),
        desc: "面积图",
        name: "面积图",
        category: "charts"
    },
    {
        componentType: "bar",
        icon: require(`assets/img/stacked_horizontal_bar.png`),
        desc: "堆积条形图",
        name: "堆积条形图",
        category: "charts"
    },
    {
        componentType: "bar",
        icon: require(`assets/img/stacked_vertical_bar.png`),
        desc: "堆积柱形图",
        name: "堆积柱形图",
        category: "charts"
    },
    {
        componentType: "map",
        icon: require(`assets/img/analysis_chart_chinamap.png`),
        desc: "地图",
        name: "地图",
        category: "map"
    }
];

export const otherComp = [
    {
        componentType: "text",
        icon: require(`assets/img/analysis_text.png`),
        desc: "文字",
        name: "文字",
        category: "text"
    },
    {
        componentType: "border",
        icon: require(`assets/img/square.png`),
        desc: "边框",
        name: "边框",
        category: "border"
    },
    {
        componentType: "table",
        icon: require(`assets/img/analysis_component_table.png`),
        desc: "表格",
        name: "表格",
        category: "table"
    },
    {
        componentType: "select",
        icon: require(`assets/img/select.png`),
        desc: "下拉选择",
        name: "下拉选择",
        category: "select"
    },
    {
        componentType: "radio",
        icon: require(`assets/img/radio.png`),
        desc: "单选",
        name: "单选",
        category: "radio"
    },
    {
        componentType: "quota",
        icon: require(`assets/img/quota.png`),
        desc: "业务指标",
        name: "业务指标",
        category: "quota"
    },
    {
        componentType: "tabs",
        icon: require(`assets/img/analysis_tab.png`),
        desc: "tabs",
        name: "tabs",
        category: "tabs"
    }
];
