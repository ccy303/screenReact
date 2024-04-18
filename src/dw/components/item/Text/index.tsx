import { Stepper } from "@kdcloudjs/kdesign";
import React, { useEffect, useState } from "react";
import { ComponentItemProps } from "dw/control/interface";
import KdCard from "dw/components/common/KdCard";

const AnalysisTextItem = (item: ComponentItemProps) => {
    console.log(item);
    return <div>{item.data}</div>;
};

export default AnalysisTextItem;
