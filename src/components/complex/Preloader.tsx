'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { markSiteReady } from '@/lib/siteReady'

const NAME = 'Fozan Javaid'
// Long enough for the intro to read, short enough not to annoy on refresh.
const MIN_VISIBLE_MS = 2000
// Never hold visitors longer than this, even if something is still loading.
const MAX_VISIBLE_MS = 6000
const EXIT_MS = 950

type Phase = 'loading' | 'exiting' | 'done'

const Preloader = () => {
  const pathname = usePathname()
  const skip = pathname?.startsWith('/studio') ?? false
  const [phase, setPhase] = useState<Phase>(skip ? 'done' : 'loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (skip) {
      markSiteReady()
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = reduceMotion ? 400 : MIN_VISIBLE_MS
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    // Wait for real work: web fonts and every image (the hero banner is ~1.5 MB), so the
    // hero is fully painted when the curtain lifts instead of popping in afterwards.
    let pageLoaded = document.readyState === 'complete'
    let fontsLoaded = false
    const onLoad = () => {
      pageLoaded = true
    }
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(() => {
      fontsLoaded = true
    })
    if (!document.fonts) fontsLoaded = true

    const start = performance.now()
    let shown = 0
    let lastRendered = -1
    let frame = 0
    let exitTimer: ReturnType<typeof setTimeout> | undefined

    const finish = () => {
      setProgress(100)
      setPhase('exiting')
      root.style.overflow = previousOverflow
      markSiteReady()
      exitTimer = setTimeout(() => setPhase('done'), reduceMotion ? 350 : EXIT_MS)
    }

    const tick = (now: number) => {
      const elapsed = now - start
      const assetsReady = pageLoaded && fontsLoaded
      const ready = (assetsReady && elapsed >= minMs) || elapsed >= MAX_VISIBLE_MS
      // Time drives the count toward 100 over the minimum duration, but it holds short of
      // 100 (creeping slowly) until the assets are actually ready.
      const timeTarget = Math.min(100, (elapsed / minMs) * 100)
      const cap = assetsReady ? 100 : 90 + Math.min(7, ((elapsed - minMs) / (MAX_VISIBLE_MS - minMs)) * 7)
      const target = ready ? 100 : Math.min(timeTarget, cap)
      shown += (target - shown) * (ready ? 0.22 : 0.1)

      const rounded = Math.min(100, Math.round(shown))
      if (rounded !== lastRendered) {
        lastRendered = rounded
        setProgress(rounded)
      }
      if (ready && shown > 99.4) {
        finish()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(exitTimer)
      window.removeEventListener('load', onLoad)
      root.style.overflow = previousOverflow
    }
  }, [skip])

  if (phase === 'done') return null

  return (
    <div
      data-preloader
      role='status'
      className={`preloader fixed inset-0 z-[100] overflow-hidden bg-background2 ${phase === 'exiting' ? 'preloader-exit' : ''}`}
    >
      <span className='sr-only'>{phase === 'exiting' ? 'Portfolio loaded' : 'Loading portfolio'}</span>
      <div aria-hidden className='grid-pattern preloader-grid absolute inset-0' />
      <div aria-hidden className='absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,151,118,0.10),transparent_55%)]' />

      <div aria-hidden className='preloader-content relative flex h-full flex-col items-center justify-center px-6'>
        <div className='preloader-logo relative'>
          <div className='preloader-glow absolute inset-0 -m-10 rounded-full bg-custom-orange/25 blur-3xl' />
          <Image src='/assets/logo.png' alt='' width={375} height={302} priority className='relative h-auto w-24 sm:w-32' />
        </div>

        <p className='mt-10 flex text-sm font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-base'>
          {NAME.split('').map((char, i) => (
            <span key={i} className='preloader-letter inline-block' style={{ animationDelay: `${250 + i * 40}ms` }}>
              {char === ' ' ? <>&nbsp;</> : char}
            </span>
          ))}
        </p>
        <p className='preloader-role mt-4 text-[11px] uppercase text-custom-orange sm:text-xs'>AI Full Stack Engineer</p>
      </div>

      <div aria-hidden className='absolute inset-x-0 bottom-0 mx-5 pb-8 sm:mx-14 sm:pb-10 lg:mx-20'>
        <div className='mb-4 flex items-end justify-between'>
          <span className='text-[10px] uppercase tracking-[0.3em] text-text2 sm:text-xs'>Loading portfolio</span>
          <span className='font-bold leading-none tabular-nums text-white text-4xl sm:text-5xl'>
            {progress}
            <span className='ml-1 text-xl text-custom-orange sm:text-2xl'>%</span>
          </span>
        </div>
        <div className='h-px w-full overflow-hidden bg-white/10'>
          <div className='h-full origin-left bg-custom-orange' style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  )
}

export default Preloader
