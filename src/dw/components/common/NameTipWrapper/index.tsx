import React from 'react'

export type NameTipWrapperProps = {
  label: string
  className: string
  tip?: string
}

const NameTipWrapper = ({ label, className }: NameTipWrapperProps) => {
  return <div className={className}>{label}</div>
}

export default NameTipWrapper
