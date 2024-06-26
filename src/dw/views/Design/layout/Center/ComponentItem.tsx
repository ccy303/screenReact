import useMain from "dw/store/useMain";
import EchartItem from "dw/components/item/EchartItem";
import Text from "dw/components/item/Text";
import Table from "dw/components/item/Table";
import Border from "dw/components/item/Border";
import Select from "dw/components/item/Select";
import Radio from "dw/components/item/Radio";
import Quota from "dw/components/item/Quota";
import Tabs from "dw/components/item/Tabs";
import Map from "dw/components/item/Map";
import Picture from "dw/components/item/Picture";
import Refresh from "dw/components/item/Refresh";
import Enlarge from "dw/components/item/Enlarge";
import Tips from "dw/components/item/Tips";
import React from "react";

export const ComponentMap: any = {
    charts: EchartItem,
    text: Text,
    table: Table,
    border: Border,
    select: Select,
    radio: Radio,
    quota: Quota,
    tabs: Tabs,
    map: Map,
    picture: Picture,
    refresh: Refresh,
    enlarge: Enlarge,
    tips: Tips
};

export const ComponentItem = (props: any) => {
    const { selectItem } = useMain();
    const { id } = props;
    const onItemClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectItem(id);
    };

    const onDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const ComponentItem = ComponentMap[props.category];

    return (
        <div className={`${props.prefixClx}-item-main`} onClick={onItemClick} onDragOver={onDragOver} onDrop={onDrop}>
            <ComponentItem {...props} />
        </div>
    );
};

export default ComponentItem;
