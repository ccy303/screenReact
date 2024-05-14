# drc-web
基于`schema`的可视化页面配置工具

## 目录结构

```
. 🔯 为核心文件

└── drc-web
    ├── build // 构建本地及线上
    ├── mock 
    ├── public
    └── src
        ├── assets
        ├── router // dev 使用
        └── dw  // 自定义组件
            ├── components 
            │   ├── common // 全局通用组件
            │   ├── editor // 右侧表单通用组件,中间展示组件的具体配置项
            │   ├── display // 右侧布局相关组件
            │   └── item  // 中间展示组件
            ├── constant
            ├── 🔯 control // 控制器，详细记录中间展示组件所有配置信息
            │   ├── config // 所有组件配置，根据组件 type 命名
            │   ├── index.ts  // 汇总
            │   ├── common.ts // 定义通用配置
            │   ├── interface.ts // 定义控制器接口
            │   └── pageControl.ts  // 全局页面及参数球的配置，单独拿出
            ├── 🔯 store // 状态管理
            │   ├── useBase // 部分全局基础配置
            │   ├── useMain // 核心数据操作，可在 itemListState，配置默认数据
            │   ├── usePropsData // 处理后台返回数据
            │   └── useBase // 全局页面样式相关
            ├── style
            ├── utils
            ├── views
            │   ├── Design 
            │   │   ├── layout // 页面展示
            │   │   └── Design.tsx // 右侧表单通用组件
            │   ├── 🔯 ViewItem  // 自定义组件
            │   ├── index.tsx  // 用于 dev 模拟
            │   └── main.js 
            └── main.js
```

## 新增组件（component）

首先在 dw/api/Constants 中定义 TYPE

### 1. 命令行新增
```
npm run create:component
// or
yarn create:component
```
### 2. 手动新增
1. dw/components/item 新建组件，并在 dw/components/item/index.ts 中声明
2. dw/control/config 下新建配置文件，并在 dw/control/index 中声明


## 新增编辑器（editor）
### 1. 命令行新增
```
npm run create:editor
// or
yarn create:editor
```
### 2. 手动新增
1. dw/component/editor 新建，并在 dw/component/editor/index.ts 中声明

## 配置说明

### Control 控制器配置

```typescript
// v1.0
export type ControlProps = {
  name: string // 组件名称
  type: string // 组件类型
  category: "common" | "page" | "charts" // 组件类别
  group: {
    // 数据、布局、格式三个分组
    id: string // 分组id
    name: string // 分组名称
    properties: {
      // 属性模块
      id: string 
      name?: string // 属性模块名称
      defaultOpen?: boolean // 分组折叠面板是否展开，折叠面板
      visible?: // 是否显示，可传入条件判断
        | boolean
        | { conditionId: string; mark: "=" | ">" | "<" | ">=" | "<=" | "in" | "noEmpty" | "together"; type?: string }
      show?: {
        // 折叠面板右侧开关配置
        value?: boolean // 是否显示
        actions?: ControlAction // 同 nodes.actions // 开关显示的关联动作
      }
      nodes: {
        // 属性
        visible?: VisibleProp // 是否显示，可传入条件判断
        id: string // 属性id，在数据中的显示路径
        name?: string // 属性名称，不填则不显示属性右侧
        editor?: {
          // 编辑器配置
          options?: { value: any; name: string | React.ReactNode }[]
          component?:
            | "Stepper" // 没有特殊说明，均参考 kdesign 同名组件API
            | "ColorPicker" 
            | "Input"
            | "Switch" 
            | "TextArea"
            | "Checkbox" // 参考 kdesign Checkbox 组件，需要提供 options
            | "Radio" // 参考 kdesign Radio 组件，需要提供 options
            | "Select" // 参考 kdesign Select 组件，需要提供 options
            | "Text" // 纯文本
            | "Image" // 图片上传
            | "Button" // 组件另存为按钮
            | "DatasetInput" // 数据源 type: add(新增数据源)、filter(过滤条件)、guide(指导线)
            | "DatasetVariable" // 变量 type: dimParams(维度变量)、varParams(变量)
          dataType?: "string" | "number" | "boolean" | "array"
          defaultValue?: any
          [key: string]: any
        }
        actions?: {
          // 属性触发动作
          condition: {
            value?: any
            mark?: "=" | ">" | "<" | ">=" | "<=" | "in" | "noEmpty" | "together"
          }
          todo?: {
            id: string
            changeType?: "node" | "value" | "group" | "together"
            changeId?: string
            changeValue?: any
          }[]
          elseTodo?: {
            id: string
            changeType?: "node" | "value" | "group" | "together"
            changeId?: string
            changeValue?: any
          }[]
        }[]
        style?: CSSProperties
      }[]
    }[] // 格式和数据配置
    display?: {
      // 布局配置
      label: string
      component: "DisplayItem" // 组件名，当前仅配置了DisplayItem
      isSort: boolean
      valueProp: RequestKeys // request 字段下的属性名
      nameProp: RequestKeys
      sortProp?: RequestKeys
      sortCustomProp?: RequestKeys
    }[]
    displayDataShow?: boolean // 布局数据选择区
  }[]
}
```
