import { ComponentItemProps } from "dw/control/interface";
import { ComponentMap } from "dw/views/Design/layout/Center/ComponentItem";
import React from "react";
import useMain from "dw/store/useMain";

const Preview = () => {
    const {
        itemList,
        globalConfig: {
            pageControl: { pageConfig }
        }
    } = useMain();

    const { width, height, backgroundSize, backgroundColor, url } = pageConfig;

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    width: Number(width),
                    height: Number(height),
                    backgroundImage: url ? `url(${url})` : undefined,
                    backgroundSize,
                    backgroundColor,
                    backgroundRepeat: "no-repeat"
                }}
            >
                {itemList.map((it: any) => {
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
                    return (
                        <div style={style} key={id}>
                            <Component {...it} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Preview;
