import React, { useCallback, useContext } from "react";
import { Icon, Tree } from "@kdcloudjs/kdesign";
import NavCard from "dw/components/common/NavCard";
import useMain from "dw/store/useMain";
import { ComponentItemProps } from "dw/control/interface";
import { prefixClsLeft } from "dw/views/Design/layout/Left/index";
import { ViewItemContext } from "../../../ViewItem/index";
import _ from "lodash";
const CompItem = () => {
    const {
        itemList,
        selectItem,
        delItem,
        globalConfig: { selectId }
    } = useMain();

    const { observableTag } = useContext(ViewItemContext);

    const click = (e: any, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        selectItem(id);
    };

    const del = (e: any, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        const _itemList = _.cloneDeep(itemList);
        const target = _itemList.find((item: any) => {
            return item.id === id;
        });
        if (target.id) {
            observableTag.deletes.push(target.id);
        }
        delItem(id);
    };

    const getItemList = useCallback(() => {
        const map: any = {};
        const ret: ComponentItemProps[] = [];
        itemList?.forEach((d: any) => {
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
                            {d.name}
                            <>{!d._isShow && "(已隐藏)"}</>
                        </div>
                        <Icon type='delete' onClick={e => del(e, d.id)} />
                    </div>
                ),
                icon: "",
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
                <Tree virtual={false} showIcon selectedKeys={[selectId]} defaultExpandAll treeData={getItemList() as any} />
            </div>
        </NavCard>
    );
};

export default CompItem;
