import React, { ReactNode, useState } from "react";
import enlargeIcon from "@/assets/enlarge.png";
import useMain from "dw/store/useMain";
import { Modal } from "@kdcloudjs/kdesign";
import EchartItem from "@/dw/components/item/EchartItem";
import "./index.less";

const Enlarge = (props: any) => {
    const { itemList } = useMain();
    const [visible, setVisible] = useState(false);

    const enlarge = (e: any) => {
        if (!props.bindchart) {
            return;
        }
        setVisible(true);
    };

    const ModalBody: any = () => {
        const target = itemList.find((v: any) => v.id == props.bindchart);
        return <EchartItem {...target} />;
    };

    return (
        <>
            <div className='refresh-warp' onClick={enlarge}>
                <img src={enlargeIcon} />
            </div>
            <Modal
                width={1500}
                height={1000}
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
