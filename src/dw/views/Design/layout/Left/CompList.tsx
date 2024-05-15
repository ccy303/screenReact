import React, { FC, useCallback, useMemo, useState } from "react";
import NavCard from "dw/components/common/NavCard";
import useMain from "dw/store/useMain";
import { prefixClsLeft } from "dw/views/Design/layout/Left/index";

export type CompListProp = {
    title: string;
    list: any[];
};

const CompList: FC<CompListProp> = ({ title, list }) => {
    const { addItemWithType } = useMain();

    const addComponents = (d: any) => {
        addItemWithType(d);
    };

    const onDragStart = (e: any, d: any) => {
        e.dataTransfer.setData("Data", JSON.stringify(d));
    };

    return (
        <NavCard title={title}>
            <div className={`${prefixClsLeft}-container`}>
                {list.map((d: any, idx: any) => {
                    return (
                        <div
                            className={`${prefixClsLeft}-main-item`}
                            key={idx}
                            draggable
                            onDragStart={(e: any) => onDragStart(e, d)}
                            onClick={() => addComponents(d)}
                            title={d.desc}
                        >
                            <img className={`${prefixClsLeft}-main-item-img`} src={d.icon} />
                        </div>
                    );
                })}
            </div>
        </NavCard>
    );
};

export default CompList;
