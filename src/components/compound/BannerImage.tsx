'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const BannerImage = () => {
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40
    setTransform({ x, y })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  return (
    <div
      className='hidden md:block'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src='/assets/BannerImg.png'
        alt='Banner Image'
        width={550}
        height={550}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          transition: 'transform 0.1s ease', // smoother reset
        }}
      />
    </div>
  )
}

export default BannerImage
