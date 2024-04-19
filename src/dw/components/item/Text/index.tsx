import { Stepper } from "@kdcloudjs/kdesign";
import React, { useEffect, useState } from "react";
import { ComponentItemProps } from "dw/control/interface";

const AnalysisTextItem = (item: ComponentItemProps) => {
    const {
        content: { config }
    } = item;
    console.log(config);

    return <div style={{ ...config }}>{item.data}</div>;
};

export default AnalysisTextItem;
