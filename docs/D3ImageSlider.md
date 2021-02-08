# &lt;D3ImageSlider&gt;

A range slider built with React, Typescript and D3.js.

## Features

- Support for custom icon
- Support conifiguring the color of the West/East tracks
- Responsive...will respond to window resize
- 100% width of parent container

## Props

| prop           | data type              | required | default value |
| -------------- | ---------------------- | -------- | ------------- |
| canvasHeight   | string \| number       | Y        | --            |
| dragHandler    | (value: number) => any | Y        | --            |
| image          | string                 | Y        | --            |
| imageHeight    | string \| number       | Y        | --            |
| imageWidth     | string \| number       | Y        | --            |
| min            | string \| number       | Y        | --            |
| max            | string \| number       | Y        | --            |
| startingValue  | string \| number       | Y        | --            |
| trackColorEast | string (hex)           | N        | #eeeeee       |
| trackColorWest | string (hex)           | N        | #000000       |
