/*
 * src/components/sliders/D3ImageSlider/index.tsx
 * Description: D3.js-based slider component with icon/image
 * Copyright (c) 2021 Mark Fehrenbacher
 */
import React, { useEffect, useRef, useState } from 'react'
import { drag, Selection, scaleLinear, select } from 'd3'

import useWindowResize from './useWindowResize'

type D3ImageSliderProps = {
  canvasHeight: string | number
  dragHandler: (value: number) => any
  image: string
  imageHeight: string | number
  imageWidth: string | number
  min: string | number
  max: string | number
  startingValue: string | number
  trackColorEast?: string
  trackColorWest?: string
}

type D3ImageSliderState = {
  currentValue: number
}

const D3ImageSlider: React.FC<D3ImageSliderProps> = ({
  canvasHeight,
  dragHandler,
  image,
  imageHeight,
  imageWidth,
  min,
  max,
  startingValue,
  trackColorEast = '#eee',
  trackColorWest = '#000'
}: D3ImageSliderProps): JSX.Element => {
  const svgRef = useRef(null)
  const windowDimensions = useWindowResize(500)
  const trackHeight = 10
  const marginLeft = +imageWidth / 2
  const marginRight = +imageWidth / 2

  /**
   * local state
   */
  const [state, setState] = useState<D3ImageSliderState>({
    currentValue: +startingValue || +min
  })
  const { currentValue } = state

  /**
   * Adding the east and west tracks which are just <rect>s
   * @param svg
   */
  const createTracks = (svg: Selection<Element, any, HTMLElement, any>) => {
    const gTrack: any = svg.select('g.track')

    // east track first
    gTrack
      .append('rect')
      .attr('class', 'east')
      .attr('x', 0)
      .attr('y', +canvasHeight / 2 - trackHeight / 2)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('height', 10)
      .attr('width', getParentElementWidth() - marginLeft - marginRight)
      .attr('fill', trackColorEast)
      .lower()
      .style('opacity', 0)
      .attr('transform', () => {
        return `translate(${marginLeft}, 0)`
      })

    // west track
    gTrack
      .append('rect')
      .attr('class', 'west')
      .attr('x', 0)
      .attr('y', +canvasHeight / 2 - trackHeight / 2)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('height', 10)
      .attr('width', getParentElementWidth() - marginLeft - marginRight)
      .attr('fill', trackColorWest)
      .style('opacity', 0)
      .attr('transform', () => {
        return `translate(${marginLeft}, 0)`
      })

    // add the icon
    gTrack
      .append('image')
      .attr('class', 'icon')
      .attr('xlink:href', image)
      .attr('width', imageWidth)
      .attr('height', imageHeight)
      .attr('x', 0)
      .attr('y', 0)
      .style('opacity', 0)

    // center line for reference (development only)
    // gTrack
    //   .append('line')
    //   .attr('class', 'bisect')
    //   .attr('x1', getParentElementWidth() / 2)
    //   .attr('x2', getParentElementWidth() / 2)
    //   .attr('y1', 0)
    //   .attr('y2', +canvasHeight)
    //   .style('stroke', 'red')
    //   .style('stroke-width', 1)
  }

  const getParentElementWidth = (): number => {
    return svgRef.current.parentElement.getBoundingClientRect().width
  }

  /**
   * calculate the linear / horizontal scale
   */
  const getXScale = (): any => {
    return scaleLinear()
      .domain([+min, +max])
      .range([0, getParentElementWidth() - marginLeft - marginRight])
  }

  /**
   * This function shows the track with the slider icon at the correct
   * starting position
   */
  const initialRender = (svg: Selection<Element, any, HTMLElement, any>) => {
    const xScale = getXScale()

    svg.select('rect.west').attr('width', xScale(currentValue)).style('opacity', 1)
    svg.select('rect.east').style('opacity', 1)
    svg
      .select('image')
      .attr('x', xScale(currentValue))
      .attr('y', +canvasHeight / 2 - trackHeight / 2 - (+imageHeight / 2 - 5))
      .style('opacity', 1)
  }

  /**
   * On window resize, we need to calculate the reposition of the east + west tracks
   * and the position of the slider icon
   * @param svg
   */
  const redraw = (svg: Selection<Element, any, HTMLElement, any>) => {
    const xScale = getXScale()

    // move the icon and resize/reposition the east and west tracks
    svg.select('image').attr('x', xScale(currentValue))
    svg.select('rect.west').attr('width', xScale(currentValue))
    svg.select('rect.east').attr('width', xScale(max))

    setDragConfig(svg)
  }

  /**
   * Setting up the icon drag handler
   */
  const setDragConfig = (svg: Selection<Element, any, HTMLElement, any>) => {
    const xScale = getXScale()

    const dragEventConfig = drag()
      .on('drag', (evt: DragEvent) => {
        // expand or contract the west track
        // we don't need to worry about the east track because it's underneath and will remain unchanged
        svg.select('rect.west').attr('width', () => {
          if (evt.x <= xScale(min)) {
            return xScale(min)
          }
          return Math.min(evt.x, xScale(max))
        })

        // move the icon
        svg.select('image.icon').attr('x', () => {
          if (evt.x < xScale(min)) {
            return xScale(min)
          }
          return Math.min(evt.x, xScale(max))
        })

        const val = xScale.invert(evt.x)
        if (val < min) {
          dragHandler(+min)
        } else {
          dragHandler(Math.min(val, +max))
        }
      })
      .on('end', (evt: DragEvent) => {
        const val = xScale.invert(evt.x)
        if (val < min) {
          setState({ ...state, currentValue: +min })
        } else {
          setState({ ...state, currentValue: Math.min(val, +max) })
        }
      })

    dragEventConfig(svg.select('image.icon'))
  }

  /**
   * run on mount
   */
  useEffect(() => {
    const svg: Selection<Element, any, HTMLElement, any> = select(svgRef.current)

    createTracks(svg)
    setDragConfig(svg)
    initialRender(svg)
  }, [])

  /**
   * run on window size change
   */
  useEffect(() => {
    const svg: Selection<Element, any, HTMLElement, any> = select(svgRef.current)
    redraw(svg)
  }, [windowDimensions])

  return (
    <div>
      <svg
        ref={svgRef}
        version='1.1'
        baseProfile='full'
        width='100%'
        height={canvasHeight}
        className='d3-image-slider'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g className='track' />
      </svg>
    </div>
  )
}

export default D3ImageSlider
