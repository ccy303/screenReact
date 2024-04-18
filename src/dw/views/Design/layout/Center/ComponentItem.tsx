import useMain from "dw/store/useMain";
import EchartItem from "dw/components/item/EchartItem";
import Text from "dw/components/item/Text";
import Table from "dw/components/item/Table";
import Border from "dw/components/item/Border";
import Select from "dw/components/item/Select";
import React from "react";

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

    return (
        <div className={`${props.prefixClx}-item-main`} onClick={onItemClick} onDragOver={onDragOver} onDrop={onDrop}>
            {props.category == "charts" && <EchartItem {...props} />}
            {props.category == "text" && <Text {...props} />}
            {props.category == "table" && <Table {...props} />}
            {props.category == "border" && <Border {...props} />}
            {props.category == "select" && <Select {...props} />}
        </div>
    );
};

export default ComponentItem;
