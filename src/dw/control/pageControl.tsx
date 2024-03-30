// noinspection DuplicatedCode

import React from 'react'
import { Icon } from '@kdcloudjs/kdesign'
import { ControlGroupProps, ControlProps, PropertiesProps } from 'dw/control/interface'
import i18n from 'dw/api/I18n'
import { Button } from '@kdcloudjs/kdesign'
import * as constants from 'dw/api/Constants'
import './pageControl.less'

export const DEFAULT_PAGE_CONFIG = {
  backgroundColor: '#f2f3f5',
  backgroundSize: 'auto auto',
  height: 768,
  scale: 'none',
  size: '2',
  url: '',
  width: 1024,
  id: null,
  number: null,
}

export const DEFAULT_QUERY_CONFIG = {
  dimList: [],
  floatButton: {
    X: 100,
    Y: 400,
    hide: true,
  },
  name: '',
  id: null,
  number: null,
}

export const pageGroup: ControlGroupProps[] = [
  {
    id: 'screenConfig',
    name: '大屏配置',
    properties: [
      {
        id: 'canvasGroup',
        name: '大屏尺寸',
        defaultOpen: true,
        order: 0,
        nodes: [
          {
            visible: true,
            id: 'pageConfig.size',
            name: i18n.msg('pageConfig2'),
            editor: {
              component: 'Select',
              options: [
                { name: i18n.msg('pageConfig12'), value: '0' },
                { name: '800*600 (4:3)', value: '1' },
                { name: '1024*768 (4:3)', value: '2' },
                { name: '1280*960 (4:3)', value: '3' },
                { name: '1280*720 (16:9)', value: '4' },
                { name: '1600*900 (16:9)', value: '5' },
                { name: '1920*1080 (16:9)', value: '6' },
                { name: '1280*800 (16:10)', value: '7' },
                { name: '1920*1200 (16:10)', value: '8' },
              ],
              dataType: 'string',
              defaultValue: DEFAULT_PAGE_CONFIG.size,
            },
            actions: [
              {
                condition: {
                  value: '0',
                },
                todo: [
                  {
                    id: 'pageConfig.width',
                    changeType: 'node',
                    changeId: 'editor.disabled',
                    changeValue: false,
                  },
                  {
                    id: 'pageConfig.height',
                    changeType: 'node',
                    changeId: 'editor.disabled',
                    changeValue: false,
                  },
                ],
                elseTodo: [
                  {
                    id: 'pageConfig.width',
                    changeType: 'node',
                    changeId: 'editor.disabled',
                    changeValue: true,
                  },
                  {
                    id: 'pageConfig.height',
                    changeType: 'node',
                    changeId: 'editor.disabled',
                    changeValue: true,
                  },
                ],
              },
              {
                condition: { value: '1' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 800 },
                  { id: 'pageConfig.height', changeValue: 600 },
                ],
              },
              {
                condition: { value: '2' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1024 },
                  { id: 'pageConfig.height', changeValue: 768 },
                ],
              },
              {
                condition: { value: '3' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1280 },
                  { id: 'pageConfig.height', changeValue: 960 },
                ],
              },
              {
                condition: { value: '4' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1280 },
                  { id: 'pageConfig.height', changeValue: 720 },
                ],
              },
              {
                condition: { value: '5' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1600 },
                  { id: 'pageConfig.height', changeValue: 900 },
                ],
              },
              {
                condition: { value: '6' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1920 },
                  { id: 'pageConfig.height', changeValue: 1080 },
                ],
              },
              {
                condition: { value: '7' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1280 },
                  { id: 'pageConfig.height', changeValue: 800 },
                ],
              },
              {
                condition: { value: '8' },
                todo: [
                  { id: 'pageConfig.width', changeValue: 1920 },
                  { id: 'pageConfig.height', changeValue: 1200 },
                ],
              },
            ],
          },
          {
            visible: true,
            id: 'pageConfig.width',
            name: i18n.msg('pageConfig3'),
            editor: {
              component: 'Stepper',
              dataType: 'number',
              defaultValue: DEFAULT_PAGE_CONFIG.width,
              disabled: false,
              type: 'embed',
            },
          },
          {
            visible: true,
            id: 'pageConfig.height',
            name: i18n.msg('pageConfig4'),
            editor: {
              component: 'Stepper',
              dataType: 'number',
              defaultValue: DEFAULT_PAGE_CONFIG.height,
              disabled: false,
              type: 'embed',
            },
          },
          {
            visible: true,
            id: 'pageConfig.url',
            name: i18n.msg('pageConfig6'),
            editor: {
              component: 'Image',
              dataType: 'string',
              defaultValue: DEFAULT_PAGE_CONFIG.url,
            },
          },
          {
            visible: true,
            id: 'pageConfig.backgroundSize',
            name: i18n.msg('pageConfig8'),
            editor: {
              component: 'Select',
              options: [
                { name: i18n.msg('pageConfig13'), value: 'auto auto' },
                { name: i18n.msg('pageConfig14'), value: 'cover' },
                { name: i18n.msg('pageConfig15'), value: '100% 100%' },
                { name: i18n.msg('pageConfig16'), value: 'contain' },
              ],
              dataType: 'string',
              defaultValue: DEFAULT_PAGE_CONFIG.backgroundSize,
            },
          },
          {
            visible: true,
            id: 'pageConfig.backgroundColor',
            name: i18n.msg('pageConfig9'),
            editor: {
              component: 'ColorPicker',
              dataType: 'string',
              defaultValue: DEFAULT_PAGE_CONFIG.backgroundColor,
            },
          },
          {
            visible: true,
            id: 'pageConfig.scale',
            name: i18n.msg('pageConfig11'),
            editor: {
              component: 'Select',
              dataType: 'string',
              options: [
                { name: i18n.msg('pageConfig17'), value: constants.PageScaleMode.Full },
                { name: i18n.msg('pageConfig18'), value: constants.PageScaleMode.None },
                { name: i18n.msg('pageConfig19'), value: constants.PageScaleMode.FullHeight },
                { name: i18n.msg('pageConfig20'), value: constants.PageScaleMode.FullWidth },
              ],
              defaultValue: DEFAULT_PAGE_CONFIG.scale,
            },
          },
        ],
      },
      {
        id: 'ballGroup',
        name: '大屏设置',
        defaultOpen: true,
        order: 1,
        nodes: [
          {
            visible: true,
            id: 'queryConfig.floatButton.name',
            name: '大屏名称',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: DEFAULT_QUERY_CONFIG.name,
              borderType: 'bordered',
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.mark',
            name: '大屏标识',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: '',
              borderType: 'bordered',
              addonAfter: <Button type="primary">查询</Button>,
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.version',
            name: '版本',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: '',
              borderType: 'bordered',
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.versionMarker',
            name: '版本表述',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: '',
              borderType: 'bordered',
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.theme',
            name: '主题名称',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: '',
              borderType: 'bordered',
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.themeCode',
            name: '主题编码',
            editor: {
              component: 'Input',
              dataType: 'string',
              defaultValue: '',
              borderType: 'bordered',
            },
          },
          {
            visible: true,
            id: 'queryConfig.floatButton.isPublish',
            name: '是否发布',
            editor: {
              component: 'Select',
              dataType: 'string',
              options: [
                { name: '是', value: '1' },
                { name: '否', value: '0' },
              ],
              defaultValue: '1',
            },
          },
        ],
      },
    ],
  },
]

export const pageGroupMap = new Map()

console.log('---pageGroupMap---')
pageGroup.forEach((p) => {
  p.properties.forEach((pr) => {
    pr.nodes.forEach((n) => {
      pageGroupMap.set(n.id, n?.editor?.dataType)
    })
  })
})
