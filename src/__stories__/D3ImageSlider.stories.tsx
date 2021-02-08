/*
 * src/__stories__/D3ImageSlider.stories.tsx
 * Copyright (c) 2021 PredictiveUX
 */
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color } from '@storybook/addon-knobs'
import styled from 'styled-components'
import '@fontsource/poppins'

import D3ImageSlider from 'components/sliders/D3ImageSlider/'
import iconGoose from 'components/sliders/D3ImageSlider/goose_island.png'

const Wrapper = styled.div`
  font-family: 'Poppins', 'Helvetica', sans-serif;
  font-size: 13px;
`

const Info = styled.div`
  display: flex;
  margin-bottom: 15px;
`

const InfoChild = styled.div`
  margin-right: 10px;
`

storiesOf('D3ImageSlider', module)
  .addDecorator(withKnobs)
  .add('Van Halen', () => {
    const startingValue = '1984'

    const [currentValue, setCurrentValue] = useState(+startingValue)

    const props = {
      canvasHeight: '50',
      dragHandler: (val: number) => setCurrentValue(+val | 0),
      min: '1900',
      max: '2000',
      startingValue
    }

    return (
      <Wrapper>
        <Info>
          <InfoChild>
            <b>Min:</b>
          </InfoChild>
          <InfoChild>{props.min}</InfoChild>
          <InfoChild>
            <b>Max:</b>
          </InfoChild>
          <InfoChild>{props.max}</InfoChild>
          <InfoChild>
            <b>Current Value:</b>
          </InfoChild>
          <InfoChild>{currentValue}</InfoChild>
        </Info>
        <Info>
          <div>RIP EVH</div>
        </Info>
        <D3ImageSlider
          trackColorEast={color('East Track Color', '#333333')}
          trackColorWest={color('West Track Color', '#fb0006')}
          {...props}
        />
      </Wrapper>
    )

    return
  })

storiesOf('D3ImageSlider', module)
  .addDecorator(withKnobs)
  .add('Goose Island IPA', () => {
    const startingValue = 6

    const [currentValue, setCurrentValue] = useState(startingValue)

    const props = {
      canvasHeight: '50',
      dragHandler: (val: number) => setCurrentValue(+val),
      image: iconGoose,
      imageHeight: '40',
      imageWidth: '40',
      min: '0',
      max: '10',
      startingValue
    }

    return (
      <Wrapper>
        <Info>
          <InfoChild>
            <b>Min:</b>
          </InfoChild>
          <InfoChild>{props.min}</InfoChild>
          <InfoChild>
            <b>Max:</b>
          </InfoChild>
          <InfoChild>{props.max}</InfoChild>
          <InfoChild>
            <b>Current Value:</b>
          </InfoChild>
          <InfoChild>{currentValue.toFixed(2)}% ABV</InfoChild>
        </Info>
        <D3ImageSlider
          trackColorEast={color('East Track Color', '#cccccc')}
          trackColorWest={color('West Track Color', '#3e8a22')}
          {...props}
        />
      </Wrapper>
    )

    return
  })
