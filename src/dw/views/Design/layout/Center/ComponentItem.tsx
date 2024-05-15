import useMain from "dw/store/useMain";
import EchartItem from "dw/components/item/EchartItem";
import Text from "dw/components/item/Text";
import Table from "dw/components/item/Table";
import Border from "dw/components/item/Border";
import Select from "dw/components/item/Select";
import Radio from "dw/components/item/Radio";
import Quota from "dw/components/item/Quota";
import React from "react";

export const ComponentMap: any = {
    charts: EchartItem,
    text: Text,
    table: Table,
    border: Border,
    select: Select,
    radio: Radio,
    quota: Quota
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
