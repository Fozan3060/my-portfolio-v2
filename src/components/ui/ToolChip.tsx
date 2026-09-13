import React from 'react'
import { IconType } from 'react-icons'

export type Tool = {
  name: string
  icon: IconType
  // Brand colour shown on hover; dark brands fall back to white.
  color?: string
  // Part of the production stack.
  core?: boolean
}

const ToolChip = ({ tool }: { tool: Tool }) => {
  const { name, icon: Icon, color = '#ffffff', core } = tool
  return (
    <li
      style={{ '--brand': color } as React.CSSProperties}
      className={`group/chip inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors duration-300 ${
        core
          ? 'border-custom-orange/25 bg-custom-orange/[0.06] text-white'
          : 'border-white/5 bg-white/[0.03] text-text3 hover:border-white/15 hover:text-white'
      }`}
    >
      <Icon aria-hidden size={16} className='shrink-0 text-white/60 transition-colors duration-300 group-hover/chip:text-[var(--brand)]' />
      {name}
      {core && (
        <>
          <span aria-hidden className='h-1.5 w-1.5 rounded-full bg-custom-orange' />
          <span className='sr-only'>(production stack)</span>
        </>
      )}
    </li>
  )
}

export default ToolChip
