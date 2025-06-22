'use client'

import React, { useRef, useState } from 'react'

type DirectionalButtonType = {
  label?: string
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

const DirectionalButton: React.FC<DirectionalButtonType> = ({
  label,
  children,
  type = 'button',
  onClick,
  className
}) => {
  const wrapperRef = useRef<HTMLButtonElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return

    const { left, top, width, height } =
      wrapperRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    const horizontal = x < width / 2 ? -1 : 1
    const vertical = y < height / 2 ? -1 : 1

    const offsetX = 9
    const offsetY = 3

    const translateX = horizontal * offsetX
    const translateY = vertical * offsetY

    setTransform(`translate(${translateX}px, ${translateY}px)`)
  }

  const handleMouseLeave = () => {
    setTransform('translate(0px, 0px)')
  }

  return (
    <button
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      className={`transition-transform duration-500 relative z-0 directional-overlay bg-custom-orange cursor-pointer text-lg px-7 sm:px-14 rounded-xl flex items-center justify-center ${className}`}
      style={{ transform }}
    >
      <span className='relative text-nowrap font-semibold text-background hover:text-background h-14 z-10 bg-transparent flex items-center justify-center'>
        {label || children}
      </span>
    </button>
  )
}

export default DirectionalButton
