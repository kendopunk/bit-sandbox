# bit-sandbox

Bit.dev component and utility file library bootstrapped with create-react-app (Typescript) and [Storybook](https://storybook.js.org/)

[https://bit.dev/kendopunk](https://bit.dev/kendopunk)

## Getting Started

I use `yarn` as the default package manager for this application. Please do not use `npm`.

```
// install dependencies
$> yarn

// start development server
$> yarn dev
```

## Running Storybook

```
$> yarn storybook
```

## Building and Exporting a Component for bit.dev

- One component per folder

- Unit tests in `src/__tests__`
- Storybook stories in `src/__stories__`
- Use `styled-components` for CSS / styling due to various framework inconsistencies w/ bundling and transpilation

### Example: &lt;MyButton&gt;

- `/src/components/buttons/MyButton`  
  `index.tsx` (component)

```
$> bit add src/components/buttons/MyButton (id will be "my-button")
$> bit build my-button
$> bit tag my-button 0.0.1
$> bit export [username].[collection]
```

## Running the Linter

```
// basic linting
$> yarn lint

// with --fix option (use with caution)
$> yarn lint:fix
```

## Running the Unit Tests

```
// basic test suite running
$> yarn test

// run the test suite in watch mode
$> yarn test:watch

// generate code coverage report
$> yarn coverage
```
