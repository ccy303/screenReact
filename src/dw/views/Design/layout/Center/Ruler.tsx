import { Stepper } from '@kdcloudjs/kdesign'
import React, { useEffect, useState } from 'react'
import { ComponentItemProps } from 'dw/control/interface'
import useMain from 'dw/store/useMain'
import classNames from 'classnames'

export type RulerProps = {
  type?: 'horizontal' | 'vertical'
  length?: number
  actives?: number[]
}

const Ruler = ({ type = 'horizontal', length = 800, actives = [] }: RulerProps) => {
  const addLength = 60
  const defaultValue = 18
  const prefixCls = `dw-ruler-${type}`
  const isHorizontal = type === 'horizontal'
  const le = length + addLength
  const style = isHorizontal ? { width: le, height: defaultValue } : { height: le, width: defaultValue }

  return (
    <div className={prefixCls} style={style}>
      <div className="dw-ruler">
        {new Array(le).fill(0).map((d, i) => {
          let flag = null
          if (i === 0) {
            flag = 0
          } else if (i % 100 === 0) {
            flag = i / 100
          } else if (i % 50 === 0) {
            flag = -2
          } else if (i % 10 === 0) {
            flag = -1
          }
          let active = false
          if (actives?.length === 2 && i >= actives[0] && i < actives[1]) {
            active = true
          }

          if (flag === -1 || flag === -2) {
            return (
              <div key={i} className={classNames('dw-ruler-px-10', { active })}>
                <div />
              </div>
            )
          }

          if (flag === null) {
            return (
              <div key={i} className={classNames('dw-ruler-px-1', { active }, i)}>
                <div />
              </div>
            )
          }

          return (
            <div key={i} className={classNames('dw-ruler-px-100', { active })}>
              <div />
              <div>{i}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Ruler, (p, n) => {
  return !(JSON.stringify(p.actives) !== JSON.stringify(n.actives) || p.length !== n.length)
})
