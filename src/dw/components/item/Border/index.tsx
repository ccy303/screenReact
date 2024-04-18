import React from "react";
import { ComponentItemProps } from "dw/control/interface";

const Border = (item: ComponentItemProps) => {
    return <div style={{ width: "100%", height: "100%", ...item.content }}></div>;
};

export default Border;
