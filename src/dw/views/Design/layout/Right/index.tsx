import React, { FC } from "react";
import { Icon, Tabs } from "@kdcloudjs/kdesign";
import useMain from "dw/store/useMain";
import useBase from "dw/store/useBase";
import { PropertiesContainer } from "dw/views/Design/layout/Right/PropertiesContainer";
import NavCard from "dw/components/common/NavCard";
import "./index.less";

const Right: FC<any> = props => {
    const { setRight } = useBase();

    const {
        group: { groups, current },
        changeGroupCurrent
    } = useMain();

    const closeConfig = () => {
        setRight(false);
    };

    const tabChange = (v: any) => {
        changeGroupCurrent(v);
    };

    return (
        <div className='dw-design-right'>
            <NavCard title='' operate={<Icon style={{ cursor: "pointer" }} onClick={closeConfig} type='close' />}>
                <Tabs activeKey={current} onChange={tabChange} size={"middle" as any}>
                    {groups.map((item: any) => (
                        <Tabs.TabPane key={item.id} tab={item.name} />
                    ))}
                </Tabs>
            </NavCard>
            <PropertiesContainer />
        </div>
    );
};

export default Right;
