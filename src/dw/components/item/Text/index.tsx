import { Stepper } from "@kdcloudjs/kdesign";
import React, { useEffect, useState } from "react";
import { ComponentItemProps } from "dw/control/interface";

const AnalysisTextItem = (item: ComponentItemProps) => {
        const {
        content: { config }
    } = item;

    return <div style={{ ...config }}>{item.content.data}</div>;
};

export default AnalysisTextItem;
