import { ControlProps, PropertiesProps } from 'dw/control/interface'
import { Icon } from '@kdcloudjs/kdesign'
import React from 'react'
import { TYPE_TEXT } from 'dw/api/Constants'
import { BACKGROUND_PROP, BASE_PROP, BORDER_PROP, DESC_PROP } from 'dw/control/common'
import i18n from 'dw/api/I18n'

const analysisText: ControlProps = {
  name: TYPE_TEXT.name,
  type: TYPE_TEXT.type,
  category: 'common',
  group: [
    {
      id: 'data',
      name: '数据',
      properties: [BASE_PROP],
    },
    {
      id: 'format',
      name: '格式',
      properties: [
        {
          id: 'text',
          name: '文本设置',
          defaultOpen: true,
          order: 0,
          nodes: [
            {
              visible: true,
              id: 'c.config.fontSize',
              name: i18n.msg('textCompConfig2'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 14,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'c.config.color',
              name: i18n.msg('textCompConfig3'),
              editor: {
                component: 'ColorPicker',
                dataType: 'string',
                defaultValue: '#000',
              },
            },
            {
              visible: true,
              id: 'c.config.textAlign',
              name: i18n.msg('textCompConfig4'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 14,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'c.config.fontStyle',
              name: i18n.msg('c72'),
              editor: {
                component: 'Checkbox',
                options: [
                  { value: 'fontWeight', name: <Icon type="bold-solid" /> },
                  { value: 'fontStyle', name: <Icon type="oblique-solid" /> },
                  { value: 'textDecoration', name: <Icon type="underline-solid" /> },
                ],
                dataType: 'array',
                defaultValue: [],
                checkboxType: 'square',
              },
            },
          ],
        },
        BACKGROUND_PROP,
        BORDER_PROP,
        DESC_PROP,
        {
          id: 'position',
          name: i18n.msg('sizeAndPosition'),
          defaultOpen: true,
          nodes: [
            {
              visible: true,
              id: 'x',
              name: i18n.msg('textCompConfig4'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 10,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'y',
              name: i18n.msg('textCompConfig8'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: 10,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'h',
              name: i18n.msg('pageConfig4'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: TYPE_TEXT.defaultHeight,
                type: 'embed',
              },
            },
            {
              visible: true,
              id: 'w',
              name: i18n.msg('pageConfig3'),
              editor: {
                component: 'Stepper',
                dataType: 'number',
                defaultValue: TYPE_TEXT.defaultWidth,
                type: 'embed',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default analysisText
