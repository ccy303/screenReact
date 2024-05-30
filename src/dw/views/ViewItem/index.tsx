import React, { FC, useEffect, useContext, useState, useRef, useCallback } from "react";
import { Spin } from "@kdcloudjs/kdesign";
import { RecoilRoot } from "recoil";
import "dw/style/reset.less";
import "@kdcloudjs/kdesign/dist/kdesign.css";
import "dw/style/reset-kdesign.less";
import { v4 as uuidv4 } from "uuid";
// import JSONData from "../../../../mock/PropsDataType/ITEM_TEST.json";
import JSONData from "../../../../mock/PropsDataType/a.json";
// import JSONData from "../../../../mock/PropsDataType/DATA_INIT.json";
import "./index.less";
import Design from "dw/views/Design/Design";
import useMain from "@/dw/store/useMain";
import _ from "lodash";
import { observe, toJS } from "mobx";

export const ViewItemContext = React.createContext<any>({});

const BaseView = () => {
    // 要处理的数据列表
    const _itemList: any = useRef([]);
    const {
        globalConfig: { pluginSet, pageControl },
        itemList,
        setItemList,
        initPage
    } = useMain();

    const [loading, setLoading] = useState(false);

    const { model, observableTag } = useContext(ViewItemContext);

    const isForPluginData: any = useRef(false);
    const observeRef: any = useRef(null);

    const initInvokeKeyObserve = useCallback((key: any, data: any) => {
        data = toJS(data);
        if (key == "selectconfig") {
            // 大屏查询
            console.log(`%c大屏查询`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            isForPluginData.current = false;
            initPage({ ...data });
            observableTag.deletes = [];
            observableTag.loading = false;
            _itemList.current = data.itemList;
        } else if (["refresh", "optionversion", "selectTable"].includes(key)) {
            // 图表刷新/图表版本修改
            console.log(`%c${key}`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            changeLocalItemList([data]);
        } else if (key == "configversion") {
            // 大屏版本修改
            console.log(`%c大屏版本修改`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            isForPluginData.current = false;
            initPage({ ...data });
            observableTag.deletes = [];
            _itemList.current = data.itemList;
        } else if (key == "init") {
            console.log(`%c大屏init`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            isForPluginData.current = false;
            initPage({ ...data });
            observableTag.deletes = [];
            _itemList.current = data.itemList;
        } else if (key == "selectoption") {
            console.log(`%c(selectoption)回调返回`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            changeLocalItemList(data?.itemList);
        } else if (key == "screenchange") {
            console.log(`%c(screenchange)回调返回`, "color:#00ff00", JSON.parse(JSON.stringify(data)));
            const { itemList } = data;
            let zindex = 0;
            itemList.map((item: any) => item.zindex > zindex && (zindex = item.zindex));
            const _itemList = itemList.map((item: any) => {
                const _item = _.cloneDeep(item);
                delete _item._isShow;
                _item.zindex > zindex && (zindex = _item.zindex);
                return _item;
            });
            const targetTab = JSON.parse(localStorage.getItem("targetTab") || "");
            const _data = {
                ...data,
                itemList: [..._itemList, { ...targetTab, zindex: zindex + 1 }]
            };
            setTimeout(() => {
                observableTag.deletes = [];
                initPage(_data);
            });
        }
    }, []);

    const changeLocalItemList = (items: any) => {
        const cloneItl = _.cloneDeep(_itemList.current);
        items.map((item: any) => {
            const currentItem = cloneItl.filter((f: any) => f.id === item.id)[0];
            _.assign(currentItem, toJS(item));
        });
        _itemList.current = cloneItl;
        setItemList(cloneItl);
    };

    useEffect(() => {
        observeRef.current?.();
        observeRef.current = observe(observableTag, "invoke", ({ newValue }: any) => {
            const { key, data } = newValue;
            initInvokeKeyObserve(key, data);
        });
        observe(observableTag, "loading", ({ newValue }: any) => {
            setLoading(newValue);
        });
        // observableTag.invoke = {
        //     key: "selectconfig",
        //     data: { ...JSONData }
        // };
        return () => observeRef.current?.();
    }, []);

    useEffect(() => {
        if (isForPluginData.current) {
            return;
        }
        if (pluginSet && pluginSet.length) {
            console.info("pluginSet", pluginSet);
            pluginSet.map((item: any, idx: any) => {
                setTimeout(() => {
                    const t = uuidv4();
                    console.log(`%c触发selectoption/${t}`, "color:#00ff00", item);
                    model?.invokeAsync?.(`selectoption/${t}`, item);
                });
            });
            isForPluginData.current = true;
        }
    }, [pluginSet]);

    return (
        // <>1</>
        <div className='dw-view-item'>
            <Spin type='page' spinning={loading} tip={"数据加载中，请稍等"}>
                <Design />
            </Spin>
        </div>
    );
};

const ViewItem: FC<any> = props => {
    console.log("ViewItem props", props);
    const value = {
        ...(props || {})
    };

    return (
        <RecoilRoot>
            <ViewItemContext.Provider value={value}>
                <BaseView />
            </ViewItemContext.Provider>
        </RecoilRoot>
    );
};

export default ViewItem;
