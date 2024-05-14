import React, { FC, useEffect, useContext } from "react";
import { ViewItemContext } from "dw/views/ViewItem";
import useBase from "dw/store/useBase";
import Center from "dw/views/Design/layout/Center";
import Left from "dw/views/Design/layout/Left";
import Right from "dw/views/Design/layout/Right";
import useMain from "dw/store/useMain";

import "./index.less";
import Preview from "dw/views/Design/layout/Preview";

const Design = () => {
    const {
        base: { showRight, showLeft }
    } = useBase();
    const { selectPageGroup } = useMain();

    const { customProps } = useContext(ViewItemContext);

    useEffect(() => {
        selectPageGroup(true);
    }, []);

    return (
        <div className='dw-design'>
            {customProps.isShow ? (
                <Preview />
            ) : (
                <>
                    {showLeft && <Left />}
                    <Center />
                    {showRight && <Right />}
                </>
            )}
        </div>
    );
};

export default Design;
