import React, { FC, useContext } from "react";
import Collapse from "dw/components/common/Collapse";
import useMain, { ChangeItemProps } from "dw/store/useMain";
import { ControlNodeProps, PropertiesItemProps, VisibleProp } from "dw/control/interface";
import NameTipWrapper from "dw/components/common/NameTipWrapper";
import editorMap from "dw/components/editor";
import { Button, Message } from "@kdcloudjs/kdesign";
import _ from "lodash";
import { ViewItemContext } from "dw/views/ViewItem";
import { toJS } from "mobx";
import "./PropertiesContainer.less";

export const PropertiesItem: FC<PropertiesItemProps> = props => {
    const {
        prefixCls,
        node: { name = "", editor, id, style }
    } = props;

    const { globalConfig, getCurrentItem } = useMain();
    const { model, observableTag } = useContext(ViewItemContext);

    const searchScreen = () => {
        const tag = globalConfig?.pageControl?.pageConfig?.configtag;
        if (!tag) {
            return Message.warning("请输入大屏标识");
        }
        console.log(`%c大屏标识查询-${model.key}`, "color:#f00", tag);
        observableTag.loading = true;
        model?.invoke?.("selectconfig", tag);
    };

    const searchTable = () => {
        const { pluginname } = getCurrentItem();
        if (!pluginname) {
            return Message.warning("请输入插件名称");
        }
        console.log(`%ctable插件名称查询-${model.key}`, "color:#f00", pluginname);
        model?.invoke?.("selectTable", pluginname);
    };

    const searchSelect = () => {
        const { pluginname } = getCurrentItem();
        if (!pluginname) {
            return Message.warning("请输入插件名称");
        }
        console.log(`%c下拉列表插件名称查询-${model.key}`, "color:#f00", pluginname);
        model?.invoke?.("searchSelect", pluginname);
    };

    if (editor?.component) {
        const comp = editor.component;
        const Component = editorMap[comp];
        let _props = {
            ...props
        };

        if (props.addonAfterBtn) {
            _props = {
                ...props,
                node: {
                    ...props.node,
                    editor: {
                        ...props.node.editor,
                        addonAfter: props.addonAfterBtn ? (
                            <Button
                                type='primary'
                                onClick={() => {
                                    props.addonAfterBtn == 1 && searchScreen();
                                    props.addonAfterBtn == 2 && searchTable();
                                    props.addonAfterBtn == 3 && searchSelect();
                                }}
                            >
                                查询
                            </Button>
                        ) : null
                    }
                }
            };
        }

        return (
            <div className={`${prefixCls}-item`} key={id} style={style}>
                {name && <NameTipWrapper className={`${prefixCls}-item-label`} label={name} />}
                <div className={`${prefixCls}-item-component`}>
                    <Component {..._props} />
                </div>
            </div>
        );
    }

    return null;
};

export const PropertiesContainer: FC<any> = props => {
    const {
        properties,
        globalConfig: { selectId, selectType, pageControl },
        group,
        changeItem,
        getCurrentItem,
        itemList
    } = useMain();

    const { model, observableTag } = useContext(ViewItemContext);

    const prefixCls = "dw-design-right-properties-view";
    const currentItem = getCurrentItem();

    const getVisible = (visible: VisibleProp = true) => {
        let ret = visible;
        if (typeof visible === "object") {
            const { conditionId, mark, type = "array" } = visible;
            const temp = _.get(currentItem, conditionId);
            switch (mark) {
                case "noEmpty":
                    ret = type === "string" ? !!temp : Array.isArray(temp) && temp.length > 0;
                    break;
            }
        }
        return ret;
    };

    const onChange = (arr: ChangeItemProps[]) => {
        changeItem(arr, selectId);
    };

    return (
        <div className={prefixCls}>
            {Array.isArray(properties) && properties.length > 0
                ? properties.map(p => {
                      const { id, name = "", visible = true, show, nodes, defaultOpen } = p;
                      const v = getVisible(visible);
                      if (v) {
                          return (
                              <Collapse
                                  title={name}
                                  key={id}
                                  id={id}
                                  rootId={selectId}
                                  defaultOpen={defaultOpen || false}
                                  show={show?.value}
                                  actions={show?.actions}
                              >
                                  <div style={{ padding: 10 }}>
                                      {nodes.map((node: ControlNodeProps) => {
                                          const propertiesItemProps: PropertiesItemProps = {
                                              value: _.get(selectId ? currentItem : pageControl, node.id),
                                              node,
                                              onChange,
                                              selectType,
                                              selectId,
                                              currentItem,
                                              prefixCls,
                                              addonAfterBtn: node.addonAfterBtn
                                          };
                                          const vn = getVisible(node.visible);
                                          if (vn) {
                                              return <PropertiesItem key={node.id} {...propertiesItemProps} />;
                                          }
                                          return null;
                                      })}
                                  </div>
                              </Collapse>
                          );
                      }
                      return null;
                  })
                : null}

            {
                <div className='w-100 flex-center mb-20'>
                    {group.category == "screenConfig" && (
                        <div className='action-group'>
                            <Button
                                type='primary'
                                onClick={() => {
                                    const data = {
                                        pageConfig: { ...(pageControl.pageConfig as any) },
                                        itemList,
                                        deleteList: toJS(observableTag.deletes)
                                    };
                                    console.log(`%c提交数据-${model.key}`, "color:#f00", data);
                                    model?.invoke?.("save", JSON.stringify({ ...data }));
                                }}
                            >
                                保存
                            </Button>
                        </div>
                    )}
                    {group.category == "charts" && (
                        <>
                            <Button
                                style={{ marginLeft: "10px" }}
                                type='primary'
                                onClick={() => {
                                    let data = getCurrentItem();
                                    data = { ...data, configparentid: pageControl.pageConfig.id };
                                    console.log(`%c刷新-${model.key}`, "color:#f00", data);
                                    model?.invoke?.("refresh", JSON.stringify(data));
                                }}
                            >
                                刷新
                            </Button>
                        </>
                    )}
                </div>
            }
        </div>
    );
};
