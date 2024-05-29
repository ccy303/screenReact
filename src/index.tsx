import React from "react";
import { createRoot } from "react-dom/client";
import ViewItem from "dw/views/ViewItem/index";
import { observable } from "mobx";

(function () {
    class Root extends React.Component<any> {
        constructor(props: any) {
            super(props);
            this.state = {
                customProps: props.customProps,
                model: props.model,
                [`${props.model.key}Observable`]: observable({
                    invoke: {},
                    loading: false,
                    deletes: []
                })
            };
        }
        componentDidMount() {}
        render() {
            const { customProps, model } = this.state as any;
            const observableTag = this.state[`${String(model.key)}Observable`];
            return <ViewItem model={model} customProps={customProps} observableTag={observableTag} />;
        }
    }

    const root = createRoot(document.getElementById("react-drag-root") as any);

    root.render(
        <div>
            <Root customProps={{ isShow: false }} model={{ key: "test" }} />
        </div>
    );
})();
