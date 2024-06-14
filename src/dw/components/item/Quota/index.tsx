import { Stepper } from "@kdcloudjs/kdesign";
import React, { useContext, useMemo } from "react";
import KdCard from "dw/components/common/KdCard";
import { ComponentItemProps } from "dw/control/interface";
import _ from "lodash";
import { ViewItemContext } from "dw/views/ViewItem";
import { formatNumber } from "../../../../../util";

const Quota = (item: ComponentItemProps) => {
  const { model } = useContext(ViewItemContext);
  const showTitle = useMemo(() => item && item.content && item.content.title && item.content.title.show, [item]);
    const { content, userxindex, useryindex, dataset, datafilter } = item;
    const {quota} = content;
    const {numberformat} = content;
    const style = {
        width: "100%",
        height: "100%",
        fontSize: quota?.fontSize || 25,
        color: quota?.fontColor || "#333",
        display: "flex",
        justifyContent: quota?.align || "center",
        alignItems: "center",
        fontWeight: quota?.fontWeight || "normal",
        fontStyle:  quota?.fontStyle || "normal",
        textDecoration:  quota?.underline || "none",
        fontFamily: "KINGDEEKB-Bold",
    };

  const defaultDataSet = item?.dataset?.rows || [];

  const firstRow = defaultDataSet[0];
  const filterDataSet =
    (datafilter && datafilter.length) || item._echartFilter
      ? defaultDataSet.filter((row: any, index: number) => {
        if (index == 0) {
          return true;
        } else {
          if (datafilter && datafilter.length) {
            for (let i = 0; i < datafilter.length; i++) {
              const { key, selectkey } = datafilter[i];
              if (!selectkey.includes(row[firstRow.indexOf(key)])) {
                return false;
              }
            }
          }
          if (item._echartFilter) {
            for (let selectFilterKey in item._echartFilter) {
              if (item._echartFilter[selectFilterKey] != row[firstRow.indexOf(selectFilterKey)]) {
                return false;
              }
            }
          }
          return true;
        }
      })
      : defaultDataSet;
    
    const _rows: any = {};
    for (let i = 0; i < filterDataSet?.[0]?.length; i++) {
        const key = filterDataSet[0][i];
        _rows[key] = [];
        for (let j = 1; j < filterDataSet.length; j++) {
            _rows[key].push(filterDataSet[j][i]);
        }
    }

    let value = useryindex? _rows[useryindex]?.reduce((total : number, num: number) => total + num, 0) : 0;
  const handleClick = (item:any,data:any) => {
    // 在这里处理点击事件，可以获取点击的图形的数据
    const { pluginname} = item;
    if (pluginname) {
      const clickData = {
        pluginname: pluginname,
        data: data,
        category: "quota",
        type: "quota",
        selectFilter:item._echartFilter
      };
      let pageId = new URLSearchParams(window.location.search).get("sourcePageId");
      if (pageId) {
        window.parent.postMessage({
            pageId: pageId, //该字段是苍穹专用
            type: 'invokeCustomEvent',
            content: {
              param: JSON.stringify(clickData)
            }
          },
          '*',
        );
      }else {
        model?.invoke?.("clickcharts", JSON.stringify(clickData));
      }
    }
  };
    return (
        <KdCard item={item} showTitle={showTitle}>
            {useryindex ? <div style={style} onClick={()=>handleClick(item,value)}>{numberformat ? formatNumber(value,numberformat.decimalPlace,numberformat.enableThousands,numberformat.isPencent,numberformat.unit) : value}</div> : <div style={style}>业务指标</div>}
        </KdCard>
    );
};

export default Quota;