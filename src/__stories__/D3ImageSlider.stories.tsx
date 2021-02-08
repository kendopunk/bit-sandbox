/*
 * src/__stories__/D3ImageSlider.stories.tsx
 * Copyright (c) 2021 PredictiveUX
 */
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import '@fontsource/poppins'

import D3ImageSlider from 'components/sliders/D3ImageSlider/'
import iconVanHalen from 'components/sliders/D3ImageSlider/vanhalen.png'
import iconUA from 'components/sliders/D3ImageSlider/ua.png'

storiesOf('D3ImageSlider', module).add('Under Armour', () => {
  const startingValue = '50'

  const [currentValue, setCurrentValue] = useState(+startingValue)

  const props = {
    canvasHeight: '50',
    dragHandler: (val: number) => setCurrentValue(+val),
    image: iconUA,
    imageHeight: '39',
    imageWidth: '50',
    min: '0',
    max: '100',
    startingValue,
    trackColorEast: '#26f80f',
    trackColorWest: '#000'
  }

  return (
    <div style={{ fontFamily: 'Poppins', fontSize: '13px' }}>
      <div style={{ marginBottom: '10px' }}>
        Min: {props.min} / Max: {props.max}
      </div>
      <div style={{ marginBottom: '10px' }}>Current Value: {currentValue}</div>
      <D3ImageSlider {...props} />
    </div>
  )

  return
})

storiesOf('D3ImageSlider', module).add('Van Halen', () => {
  const startingValue = '1984'

  const [currentValue, setCurrentValue] = useState(+startingValue)

  const props = {
    canvasHeight: '50',
    dragHandler: (val: number) => setCurrentValue(+val),
    image: iconVanHalen,
    imageHeight: '24',
    imageWidth: '30',
    min: '1900',
    max: '2000',
    startingValue,
    trackColorEast: '#333',
    trackColorWest: '#fb0006'
  }

  return (
    <div style={{ fontFamily: 'Poppins', fontSize: '13px' }}>
      <div style={{ marginBottom: '10px' }}>
        Min: {props.min} / Max: {props.max}
      </div>
      <div style={{ marginBottom: '10px' }}>Current Value: {currentValue}</div>
      <div style={{ marginBottom: '10px' }}>R.I.P E.V.H</div>
      <D3ImageSlider {...props} />
    </div>
  )

  return
})
