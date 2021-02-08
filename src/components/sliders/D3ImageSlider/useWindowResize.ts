/*
 * src/components/sliders/LemonbrewD3Slider/useWindowResize.ts
 * Description: https://usehooks.com/useWindowSize/
 * Copyright (c) 2021 PredictiveUX
 */
import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

const useWindowResize = (delay = 500): { width: number; height: number } => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    const debouncer = debounce(handleResize, delay)

    // Add event listener
    window.addEventListener('resize', debouncer)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', debouncer)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

export default useWindowResize
