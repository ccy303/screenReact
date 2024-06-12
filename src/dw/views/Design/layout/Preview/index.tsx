import { ComponentMap } from "dw/views/Design/layout/Center/ComponentItem";
import React, { useEffect, useContext, useState } from "react";
import { ViewItemContext } from "dw/views/ViewItem";
import useMain from "dw/store/useMain";

const Preview = () => {
    const {
        itemList,
        globalConfig: {
            pageControl: { pageConfig },
            hoverId
        },
        setHover
    } = useMain();

    const { model } = useContext(ViewItemContext);

    const { width, height, backgroundSize, backgroundColor, url } = pageConfig;

    const [scale, setScale] = useState(1);

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

    console.log(1234, hoverId);

    return (
        <div>
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
