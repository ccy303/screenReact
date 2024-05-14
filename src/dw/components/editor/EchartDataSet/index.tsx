import useMain from "@/dw/store/useMain";
import { Select, Icon } from "@kdcloudjs/kdesign";
import React, { useMemo } from "react";
import "./index.less";
import _ from "lodash";
export default (props: any) => {
    const { onChange } = props;

    const { getCurrentItem } = useMain();

    const { dataset, userxindex, useryindex } = getCurrentItem();

    const xIndex = useMemo(() => {
        const { dataindex } = dataset || {};
        if (!dataindex) return [];
        const xIndex = [];
        for (let i = 0; i < dataindex.length; i++) {
            const item = dataindex[i];
            if (item[2] != 2 && item[2] != 3) {
                xIndex.push({ name: item[1], value: item[1], type: "x" });
            }
        }
        return xIndex;
    }, [dataset]);

    const yIndex = useMemo(() => {
        const { dataindex } = dataset || {};
        if (!dataindex) return [];
        const xIndex = [];
        for (let i = 0; i < dataindex.length; i++) {
            const item = dataindex[i];
            if (item[2] == 2 || item[2] == 3) {
                xIndex.push({ name: item[1], value: item[1], type: "y" });
            }
        }
        return xIndex;
    }, [dataset]);

    // const onSelChange = (type: any, e: any) => {
    //   if (type == 'xIndex') {
    //     onChange([{ prop: 'userxindex', value: e }])
    //   } else if (type == 'yIndex') {
    //     onChange([{ prop: 'useryindex', value: e }])
    //   }
    // }

    const onDrag = (e: any, item: any) => {
        e.dataTransfer?.setData("dataset", JSON.stringify(item));
    };

    const onDrop = (e: any, type: any) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer?.getData("dataset"));
        if (type != data.type) {
            return;
        }
        if (type == "x") {
            onChange([{ prop: "userxindex", value: _.uniq([...(userxindex || []), data.value]) }]);
        } else {
            onChange([{ prop: "useryindex", value: _.uniq([...(useryindex || []), data.value]) }]);
        }
    };

    const allowDrop = (e: any) => {
        e.preventDefault();
    };

    const del = (type: any, item: any) => {
        if (type == "x") {
            onChange([{ prop: "userxindex", value: _.uniq(userxindex.filter((v: any) => v != item)) }]);
        } else {
            onChange([{ prop: "useryindex", value: _.uniq(useryindex.filter((v: any) => v != item)) }]);
        }
    };

    return (
        <div className='data-set-warp'>
            <div className='data-set-data'>
                <div>数据</div>
                <div className='data-set-dargabled'>
                    <div className='list'>
                        {[...(xIndex as any), ...(yIndex as any)].map((v: any, i) => {
                            return (
                                <div key={i} className='list-item' draggable onDragStart={e => onDrag(e, v)}>
                                    {v.name}({v.type == "x" ? "文字" : "数字"})
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "10px" }}>横轴</div>
                <div className='data-set-dargabled'>
                    <div className='list' onDragOver={allowDrop} onDrop={e => onDrop(e, "x")}>
                        {userxindex &&
                            userxindex.map((v: any, i: any) => {
                                return (
                                    <div key={i} className='list-item space-between' onClick={() => del("x", v)}>
                                        {v}(文字)
                                        <Icon type='delete' className='del-icon'></Icon>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "10px" }}>纵轴</div>
                <div className='data-set-dargabled'>
                    <div className='list' onDragOver={allowDrop} onDrop={e => onDrop(e, "y")}>
                        {useryindex &&
                            useryindex.map((v: any, i: any) => {
                                return (
                                    <div key={i} className='list-item space-between' onClick={() => del("y", v)}>
                                        {v}(数字)
                                        <Icon type='delete' className='del-icon'></Icon>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '50px' }}>横轴</div>
        <div style={{ flex: 1 }}>
          <Select
            onChange={(e) => onSelChange('xIndex', e)}
            style={{ width: '100%' }}
            placeholder="横轴"
            mode="multiple"
            value={userxindex}
          >
            {xIndex?.map((o) => {
              return (
                <Select.Option key={`${o.value}`} value={o.value}>
                  {o.name}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div> */}

            {/* <div style={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
        <div style={{ width: '50px' }}>纵轴</div>
        <div style={{ flex: 1 }}>
          <Select
            onChange={(e) => onSelChange('yIndex', e)}
            style={{ width: '100%' }}
            placeholder="纵轴"
            mode="multiple"
            value={useryindex}
          >
            {yIndex?.map((o) => {
              return (
                <Select.Option key={`${o.value}`} value={o.value}>
                  {o.name}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      </div> */}
        </div>
    );
};
