import { ComponentMap } from "dw/views/Design/layout/Center/ComponentItem";
import React, { useEffect, useContext, useState, useRef } from "react";
import { ViewItemContext } from "dw/views/ViewItem";
import useMain from "dw/store/useMain";
import { v4 as uuidv4 } from "uuid";

const Preview = () => {
    const {
        itemList,
        globalConfig: {
            pageControl: { pageConfig },
            hoverId
        },
        setHover
    } = useMain();

    const observar = useRef<any>(null);
    const renderKey = useRef<any>("");

    const { model } = useContext(ViewItemContext);

    const { width, height, backgroundSize, backgroundColor, url } = pageConfig;

    const [scale, setScale] = useState(1);

    (() => {
        if (observar.current) {
            observar.current?.disconnect?.();
            observar.current = null;
        }

        observar.current = new MutationObserver((mutationList: any, observer: any) => {
            for (const mutation of mutationList) {
                if (mutation.type === "attributes" && mutation.attributeName == "style") {
                    renderKey.current = uuidv4();
                }
            }
        });

        observar.current.observe(model.dom, { attributes: true });
    })();

    useEffect(() => {
        const ro = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const { contentRect } = entry;
                const { width: orignWidth } = contentRect;
                const scale = orignWidth / width;
                setScale(scale);
            }
        });
        ro.observe(model.dom || document.querySelector(".dw-view-item"));
    }, [width, height]);

    const mouseEnter = (data: any) => {
        setHover(data.id);
    };
    const mouseLeave = (data: any) => {
        setHover("");
    };

    return (
        <div key={renderKey.current}>
            <div
                style={{
                    transform: `scale(${scale})`,
                    position: "relative",
                    // width: Number(_width),
                    // height: Number(_height),
                    backgroundImage: url ? `url(${url})` : undefined,
                    backgroundSize,
                    backgroundColor,
                    backgroundRepeat: "no-repeat"
                }}
            >
                {itemList
                    .filter(v => v._isShow)
                    .map((it: any) => {
                        const { id, x, y, w, h, zindex, category } = it;
                        const Component = ComponentMap[category];
                        const style: React.CSSProperties = {
                            position: "absolute",
                            zIndex: zindex,
                            width: Number(w),
                            height: Number(h),
                            top: Number(y),
                            left: Number(x)
                        };
                        if (["refresh", "enlarge", "tips"].includes(it.type)) {
                            style.display = it.bindchart == hoverId ? "" : "none";
                        }

                        return (
                            <div style={style} key={id} onMouseEnter={() => mouseEnter(it)} onMouseLeave={() => mouseLeave(it)}>
                                <Component {...it} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Preview;
