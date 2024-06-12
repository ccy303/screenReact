import React, { ReactNode, useState, useContext } from "react";
import tips from "@/assets/tips.png";
import { Tooltip } from "@kdcloudjs/kdesign";
import { ViewItemContext } from "dw/views/ViewItem";
import "./index.less";

const Tips = props => {
    const { customProps } = useContext(ViewItemContext);

    return (
        <Tooltip
            tip={props.content || ""}
            getPopupContainer={triggerNode => {
                if (customProps?.isShow) {
                    return triggerNode?.parentNode;
                } else {
                    return document.body;
                }
            }}
        >
            <div className='tips-warp'>
                <img src={tips} />
            </div>
        </Tooltip>
    );
};

export default Tips;
