/* eslint-disable */
import React from "react";
import { createRoot } from "react-dom/client";
import ViewItem from "./views/ViewItem";
import { observable } from "mobx";
import JSON from "../../mock/PropsDataType/DATA_INIT.json";

/**
 * 在setHtml中声明Root类，使用ReactDOM.render将其渲染在model.dom中
 * 在Root类的componentDidMount里，声明一个订阅，用于接收后端更新发过来的消息，从而去更新组件
 * 在update里，发布一个消息，当后端插件给自定义控件传递新数据时，就能将消息发布给Root
 * 在Root类的componentWillUnmount里，取消订阅
 * 在destoryed里，使用ReactDOM.unmountComponentAtNode卸载Root
 * 注意loadFile中index.css的引入路径，因为webpack打包后将其放在了css文件夹里，所以路径是./css/index.css
 */

const init = () => {};

(function (KDApi) {
    const setHtml = function (model, primaryProps) {
        KDApi.loadFile("./index.css", model, () => {
            console.log("loadFileSuccess");
            console.log("model", model);
            const that = this;
            class Root extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        customProps: props.customProps,
                        model: props.model
                    };
                }
                render() {
                    const { customProps, model } = this.state;
                    return <ViewItem observableTag={that[`${model.key}Observable`]} model={model} customProps={customProps} />;
                }
            }
            this.root.render(<Root model={model} customProps={primaryProps} />);
        });
    };
    function MyComponent(model) {
        this._setModel(model);
    }
    MyComponent.prototype = {
        _setModel: function (model) {
            console.info("setHtml");
            this.model = model;
            this.root = createRoot(model.dom);
        },
        init: function (props) {
            console.log("version", "0.0.67");
            console.log("-----init", this.model, props);
            this.model.dom.style.height = "100%";
            this.model.dom.style.width = "100%";
            this.model.dom.parentNode.style.height = "100%";
            this.model.dom.parentNode.style.width = "100%";

            const flag = props.configItems?.find(({ key }) => key == "category") || {};
            if (flag.value != "design") {
                this.model.invokeAsync("init", props.configItems);
            }
            this[`${this.model.key}Observable`] = observable({
                invoke: {},
                loading: false,
                deletes: []
            });
            setHtml.call(this, this.model, { isShow: flag.value != "design" });
        },
        update: function (props) {
            console.log("-----update:props", props);
            const key = props.data?.invokeKey?.split("/")?.[0];
            this[`${this.model.key}Observable`].invoke = {
                key,
                data: props.data
            };
        },
        destoryed: function () {
            console.log("-----destoryed", this.model);
            this.root.unmount();
        }
    };

    console.log("MyComponent", MyComponent);
    // 注册自定义组件
    KDApi.register("echartReact", MyComponent);
})(window.KDApi);
