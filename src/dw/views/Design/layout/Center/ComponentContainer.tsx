import React, { useEffect, useState } from "react";
import useMain from "dw/store/useMain";
import { DraggableData, ResizableDelta, Rnd } from "react-rnd";
import { ComponentItemProps } from "dw/control/interface";
import _ from "lodash";
import Ruler from "dw/views/Design/layout/Center/Ruler";
import ComponentItem from "dw/views/Design/layout/Center/ComponentItem";
import { getMidCoordinate } from "../../../../../../util";

export interface ILine {
    x: number;
    y: number;
    w?: number;
    h?: number;
}

type TAdsorbResult = { x: number | null; y: number | null; w: number | null; h: number | null };

const coordinateMap: Map<string, ComponentItemProps[]> = new Map();
const guidelineWidth = 2;
const threshold = 3;
let tempList: ComponentItemProps[] = [];

const ComponentContainer = (props: any) => {
    const { prefixClx } = props;
    const {
        itemList,
        changeItem,
        globalConfig: {
            pageControl: { pageConfig },
            selectId
        }
    } = useMain();

    const [activeX, setActiveX] = useState<number[]>([]);
    const [activeY, setActiveY] = useState<number[]>([]);

    const [guidelines, setGuidelines] = useState<ILine[]>([]);

    const updateCoordinateMap = (dragItem?: ComponentItemProps) => {
        if (dragItem) {
            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].id === dragItem.id) {
                    tempList[i] = dragItem;
                    break;
                }
            }
        }

        coordinateMap.clear();

        for (let i = 0; i < tempList.length; i++) {
            const item = tempList[i];
            const x1 = item.x;
            const x2 = x1 + item.w;
            const x3 = getMidCoordinate(x2, x1);
            const y1 = item.y;
            const y2 = y1 + item.h;
            const y3 = getMidCoordinate(y2, y1);
            const keys = [`${x1}|x`, `${x2}|x`, `${x3}|xCenter`, `${y1}|y`, `${y2}|y`, `${y3}|yCenter`];
            keys.forEach(key => {
                if (coordinateMap.get(key)) {
                    coordinateMap.set(key, [...coordinateMap.get(key)!, item]);
                } else {
                    coordinateMap.set(key, [item]);
                }
            });
        }
    };

    const getGuideLine = (dragItem: ComponentItemProps) => {
        updateCoordinateMap(dragItem);
        const x1 = dragItem.x;
        const x2 = dragItem.x + dragItem.w;
        const x3 = getMidCoordinate(x2, x1);
        const y1 = dragItem.y;
        const y2 = dragItem.y + dragItem.h;
        const y3 = getMidCoordinate(y2, y1);
        const keys = [`${x1}|x`, `${x2}|x`, `${x3}|xCenter`, `${y1}|y`, `${y2}|y`, `${y3}|yCenter`];
        const gl: ILine[] = [];

        keys.forEach(key => {
            // eslint-disable-next-line no-restricted-syntax
            for (const [k, items] of coordinateMap) {
                if (items.length > 1) {
                    if (key === k) {
                        let line: ILine;
                        if (key.includes("x")) {
                            const sorted = [...items].sort((a, b) => a.y - b.y);
                            const minY = sorted[0].y;
                            const maxY = sorted[sorted.length - 1].y;
                            line = {
                                x: +key.split("|")[0],
                                y: minY,
                                w: guidelineWidth,
                                h: maxY + sorted[sorted.length - 1].h - minY
                            };
                        } else if (key.includes("y")) {
                            const sorted = [...items].sort((a, b) => a.x - b.x);
                            const minX = sorted[0].x;
                            const maxX = sorted[sorted.length - 1].x;
                            line = {
                                x: minX,
                                y: +key.split("|")[0],
                                w: maxX + sorted[sorted.length - 1].w - minX,
                                h: guidelineWidth
                            };
                        }
                        gl.push(line!);
                    }
                }
            }
        });

        setGuidelines(gl);
    };

    const onDrag = ({ id, w, h }: any, data: any) => {
        const dragItem: any = {
            id,
            x: data.x,
            y: data.y,
            w: Number.parseInt(w, 10),
            h: Number.parseInt(h, 10)
        };

        getGuideLine(dragItem);

        setActiveX([data.x, data.x + w]);
        setActiveY([data.y, data.y + h]);

        // if (onAdsorb) {
        //   const arr = [
        //     { prop: 'x', value: adsorb.x || data.x },
        //     { prop: 'y', value: adsorb.y || data.y },
        //   ]
        //   changeItem(arr, id)
        // }
    };

    const onDragStop = ({ id, x: xo, y: yo }: any, data: DraggableData) => {
        setGuidelines([]);
        const { x = 0, y = 0 } = data;
        if (xo !== x || yo !== y) {
            const arr = [
                { prop: "x", value: parseInt(`${data.x}`, 10) },
                { prop: "y", value: parseInt(`${data.y}`, 10) }
            ];
            changeItem(arr, id);
        }
    };

    const onResizeStop = ({ id, w: wo, h: ho }: any, ref: HTMLElement) => {
        const w = Number.parseInt(ref.style.width || "0", 10);
        const h = Number.parseInt(ref.style.height || "0", 10);
        if (w !== wo || h !== ho) {
            const arr = [
                { prop: "w", value: parseInt(`${w}`, 10) },
                { prop: "h", value: parseInt(`${h}`, 10) }
            ];
            changeItem(arr, id);
        }
    };

    useEffect(() => {
        if (itemList.length !== tempList.length) {
            tempList = _.cloneDeep(itemList);
            updateCoordinateMap();
        }
    }, [itemList.length]);

    useEffect(() => {
        if (selectId) {
            const c = itemList.filter(d => d.id === selectId)[0];
            const { x, y, w, h } = c;
            setActiveX([Number(x), Number(x) + Number(w)]);
            setActiveY([Number(y), Number(y) + Number(h)]);
        } else {
            setActiveX([]);
            setActiveY([]);
        }
    }, [selectId]);

    return (
        <>
            <Ruler length={pageConfig.width} actives={activeX} type='horizontal' />
            <Ruler length={pageConfig.height} actives={activeY} type='vertical' />
            {itemList.map((it: ComponentItemProps) => {
                const { x, y, w, h, id, zIndex } = it;
                return (
                    <Rnd
                        className={`${prefixClx}-item`}
                        style={{ background: "#fff", zIndex }}
                        key={id}
                        bounds='parent'
                        position={{ x, y }}
                        size={{ width: w, height: h }}
                        enableResizing={{
                            bottom: true,
                            bottomLeft: false,
                            bottomRight: true,
                            left: false,
                            right: true,
                            top: false,
                            topLeft: false,
                            topRight: false
                        }}
                        onDrag={(e: any, data: DraggableData) => {
                            e.stopPropagation();
                            onDrag({ id, w, h }, data);
                        }}
                        onResize={(e: MouseEvent | TouchEvent, dir: any, ref: HTMLElement, delta: ResizableDelta, position: any) => {
                            e.stopPropagation();
                            // onResize({ id, w, h }, ref)
                        }}
                        onDragStop={(e: any, data: DraggableData) => {
                            e.stopPropagation();
                            onDragStop({ id, x, y }, data);
                        }}
                        onResizeStop={(e: MouseEvent | TouchEvent, dir: any, ref: HTMLElement, delta: ResizableDelta, position: any) => {
                            e.stopPropagation();
                            onResizeStop({ id, w, h }, ref);
                        }}
                    >
                        <ComponentItem {...it} prefixClx={prefixClx} />
                    </Rnd>
                );
            })}
            {guidelines.map((line, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        zIndex: 9999,
                        left: line.x,
                        top: line.y,
                        width: line.w,
                        height: line.h,
                        backgroundColor: "#448ef7"
                    }}
                />
            ))}
        </>
    );
};

export default ComponentContainer;
