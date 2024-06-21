import React, { useMemo, useContext } from "react";
import refreshIcon from "@/assets/refresh.png";
import useMain from "dw/store/useMain";
import { ViewItemContext } from "dw/views/ViewItem";
import "./index.less";

const Refresh = (props: any) => {
    const {
        globalConfig: { pageControl },
        itemList
    } = useMain();
    const { model } = useContext(ViewItemContext);

    const refresh = (e: any) => {
        if (!props.bindchart) {
            return;
        }
        const data = itemList.find((item: any) => {
            return item.id == props.bindchart;
        });
        const _query = { ...data, configparentid: pageControl.pageConfig.id };
        console.info(`%c刷新-${model.key}`, "color:#f00", _query);
        model?.invoke?.("refresh", JSON.stringify(_query));
    };

    return (
        <div className='refresh-warp' onClick={refresh}>
            <img src={refreshIcon} />
        </div>
    );
};

export default Refresh;
