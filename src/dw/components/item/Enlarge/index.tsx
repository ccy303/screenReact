import React, { ReactNode, useEffect, useState } from "react";
import enlargeIcon from "@/assets/enlarge.png";
import useMain from "dw/store/useMain";
import { Modal } from "@kdcloudjs/kdesign";
import EchartItem from "@/dw/components/item/EchartItem";
import _ from "lodash";
import "./index.less";

const Enlarge = (props: any) => {
    const { itemList } = useMain();
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState<any>([]);

    const enlarge = (e: any) => {
        if (!props.bindchart) {
            return;
        }
        setVisible(true);
    };

    const ModalBody: any = () => {
        const target = itemList.find((v: any) => v.id == props.bindchart);
        const _target = _.cloneDeep(target);
        _.set(_target, "content.config.charts.topnum", 20);
        return <EchartItem {..._target} />;
    };

    useEffect(() => {
        setSize([document.body.clientWidth * 0.8, document.body.clientHeight * 0.8]);
    }, []);

    return (
        <>
            <div className='refresh-warp' onClick={enlarge}>
                <img src={enlargeIcon} />
            </div>
            <Modal
                width={size[0]}
                height={size[1]}
                body={<ModalBody />}
                type='normal'
                closable={true}
                mask={true}
                visible={visible}
                destroyOnClose
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            />
        </>
    );
};

export default Enlarge;
