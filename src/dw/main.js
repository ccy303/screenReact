/* eslint-disable */
import React from "react";
import { createRoot } from "react-dom/client";
import ViewItem from "./views/ViewItem";
import JSON from "../../mock/PropsDataType/DATA_INIT.json";

/**
 * 在setHtml中声明Root类，使用ReactDOM.render将其渲染在model.dom中
 * 在Root类的componentDidMount里，声明一个订阅，用于接收后端更新发过来的消息，从而去更新组件
 * 在update里，发布一个消息，当后端插件给自定义控件传递新数据时，就能将消息发布给Root
 * 在Root类的componentWillUnmount里，取消订阅
 * 在destoryed里，使用ReactDOM.unmountComponentAtNode卸载Root
 * 注意loadFile中index.css的引入路径，因为webpack打包后将其放在了css文件夹里，所以路径是./css/index.css
 */
(function (KDApi) {
    const setHtml = function (model, primaryProps) {
        KDApi.loadFile("./index.css", model, () => {
            console.log("loadFileSuccess");
            console.log("this", this);
            console.log("model", model);
            class Root extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        customProps: props.customProps,
                        model: props.model
                    };
                }
                componentDidMount() {}
                shouldComponentUpdate() {}
                componentWillUnmount() {}
                render() {
                    const { customProps, model } = this.state;
                    return <ViewItem model={model} customProps={customProps} />;
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
            this.model = model;
            this.root = createRoot(model.dom);
        },
        init: function (props) {
            console.log("version", 21);
            console.log("-----init", this.model, props);
            this.model.dom.style.height = "100vh";
            this.model.dom.style.width = "100vw";
            this.model.invoke("init", props.configItems);
            setHtml.call(this, this.model, props);
        },
        update: function (props) {
            console.log("-----update:model", this.model);
            console.log("-----update:props", props);

            console.log("useMain", window.$_REACTMAIN);

            const { initPage, changeItemAll } = window.$_REACTMAIN || {};

            if (props.data.invokeKey == "selectconfig") {
                // 大屏查询
                console.log(`%c大屏查询`, "color:#00ff00", props.data);
                initPage(props.data);
            } else if (["refresh", "optionversion", "selectTable"].includes(props.data.invokeKey)) {
                // 图表刷新/图表版本修改
                console.log(`%c${props.data.invokeKey}`, "color:#00ff00", props.data);
                changeItemAll(props.data, props.data.id);
            } else if (props.data.invokeKey == "configversion") {
                // 大屏版本修改
                console.log(`%c大屏版本修改`, "color:#00ff00", props.data);
                initPage(props.data);
            } else if (props.data.invokeKey == "init") {
                console.log(`%c大屏init`, "color:#00ff00", props.data);
                initPage(props.data);
                // initPage({ ...JSON, isShow: true });
            }
        },
        destoryed: function () {
            console.log("-----destoryed", this.model);
            this.root.unmount();
        }
    };

    console.log("MyComponent", MyComponent);

    // 注册自定义组件
    KDApi.register("echartReactShow", MyComponent);
})(window.KDApi);
