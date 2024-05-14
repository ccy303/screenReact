import React, { useCallback } from "react";
import { Icon, Tree } from "@kdcloudjs/kdesign";
import NavCard from "dw/components/common/NavCard";
import useMain from "dw/store/useMain";
import { ComponentItemProps } from "dw/control/interface";
import { prefixClsLeft } from "dw/views/Design/layout/Left/index";

const CompItem = () => {
    const { itemList, selectItem, delItem } = useMain();

    const click = (e: any, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        selectItem(id);
    };

    const del = (e: any, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        delItem(id)
    };

    const getItemList = useCallback(() => {
        const map: any = {};
        const ret: ComponentItemProps[] = [];
        itemList?.forEach(d => {
            const t = {
                ...d,
                title: (
                    <div
                        className={`${prefixClsLeft}-comp-item-item`}
                        style={{
                            height: "32px",
                            width: "200px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                        onClick={e => click(e, d.id)}
                    >
                        <div>
                            <Icon type='arrow-right-solid' />
                            {d.chartname}
                        </div>
                        <Icon type='delete' onClick={e => del(e, d.id)} />
                    </div>
                ),
                icon: "",
                // (
                //     <div className={`${prefixClsLeft}-comp-item-item`} onClick={click}>
                //         <Icon type='arrow-right-solid' />
                //         {d.name}
                //     </div>
                // )
                key: d.id,
                children: []
            };
            map[d.id] = t;
            ret.push(t);
        });
        return ret;
    }, [itemList]);

    return (
        <NavCard title={"当前页面组件"} operate={<div></div>}>
            <div className={`${prefixClsLeft}-comp-item-main`}>
                <div className={`${prefixClsLeft}-comp-item-top`}>
                    <Icon type='address' />
                    页面
                </div>
                <Tree virtual={false} showIcon defaultExpandAll treeData={getItemList() as any} />
            </div>
        </NavCard>
    );
};

export default CompItem;
