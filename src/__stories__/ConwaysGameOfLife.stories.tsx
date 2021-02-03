/*
 * src/__stories__/ConwaysGameOfLife.stories.tsx
 */
import { storiesOf } from '@storybook/react'

import ConwaysGameOfLife from '../components/misc/ConwaysGameOfLife/'

storiesOf('ConwaysGameOfLife', module).add('interactive', () => {
  return <ConwaysGameOfLife />
})
