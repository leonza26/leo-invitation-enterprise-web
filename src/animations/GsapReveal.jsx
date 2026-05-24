import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const GsapReveal = ({ children, delay = 0, duration = 0.8, y = 30, x = 0, scale = 1, ease = 'power3.out' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y,
        x,
        scale,
        opacity: 0,
        duration,
        delay,
        ease,
      })
    })

    return () => ctx.revert()
  }, [y, x, scale, duration, delay, ease])

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  )
}

export const GsapStagger = ({ children, stagger = 0.15, delay = 0 }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const childElements = containerRef.current.children
      if (childElements.length > 0) {
        gsap.from(childElements, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger,
          delay,
          ease: 'power3.out'
        })
      }
    })

    return () => ctx.revert()
  }, [stagger, delay])

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  )
}
