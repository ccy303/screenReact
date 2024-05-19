import React, { useContext } from "react";
import KdCard from "dw/components/common/KdCard";
import { Tabs, Radio } from "@kdcloudjs/kdesign";
import { ViewItemContext } from "dw/views/ViewItem";
import _ from "lodash";
import useMain from "@/dw/store/useMain";
import JSONData from "../../../../../mock/PropsDataType/ITEM_TEST.json";

export default (item: any) => {
    const {
        globalConfig: { pageControl },
        itemList,
        initPage,
        init
    } = useMain();
    const { model } = useContext(ViewItemContext);

    const tabChange = (e: any) => {
        const value = e.target.value;
        // 保存当前大屏数据
        const data = { pageConfig: { ...(pageControl.pageConfig as any) }, itemList };
        if (data.pageConfig.configtag) {
            localStorage.setItem(data.pageConfig.configtag, JSON.stringify(data));
        }

        // 判断localStorage中是否存在目标大屏数据
        if (localStorage.getItem(value)) {
            const screenData: any = localStorage.getItem(value);
            setTimeout(() => {
                initPage(JSON.parse(screenData));
            });
        } else {
            localStorage.setItem("targetTab", JSON.stringify(item));
            model?.invoke?.("screenchange", value);
        }
    };

    const click = (e: any) => {
        e.stopPropagation();
    };

    return (
        <KdCard item={item} showTitle={false}>
            <div onClick={click}>
                <Radio.Group defaultValue={item.bindscreens?.[0]?.value} onChange={tabChange}>
                    {(item.bindscreens || []).map((item: any, idx: any) => {
                        return (
                            <Radio key={idx} value={item.value} radioType='square'>
                                {item.name}
                            </Radio>
                        );
                    })}
                </Radio.Group>
            </div>
        </KdCard>
    );
};
