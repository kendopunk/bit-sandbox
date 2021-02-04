/*
 * src/components/misc/ConwaysGameOfLife/index.tsx
 * Description: Conway's Game of Life in React + Hooks
 * https://pi.math.cornell.edu/~lipa/mec/lesson6.html
 * Copyright (c) 2021 Mark Fehrenbacher
 */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

type CellProps = {
  alive: boolean
  onClick?: any
}

type BaseButtonProps = {
  disabled?: boolean
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export type ConwaysGameOfLifeProps = {
  rows?: number | string
  cols?: number | string
}

export type ConwaysGameOfLifeState = {
  gameOn: boolean
  livingCells: string[]
}

/**
 * styled components here
 */
const Cell = styled.div`
  display: flex;
  align-items: center;
  width: 10px;
  height: 10px;
  justify-content: center;
  border: solid 1px #eee;
  background-color: ${(props: CellProps) => (props.alive ? '#000' : '#fff')};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const GridContainer = styled.div`
  padding: 8px;
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: flex-row;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: flex-row;
  margin-top: 20px;
`

const BaseButton = styled.button`
  border: solid 1px #eee;
  border-radius: 4px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 4px #ccc;
  }
`

const StartButton = styled(BaseButton)`
  background-color: ${(props: BaseButtonProps) => (props.disabled ? '#ccc' : '#0f4735')};
  pointer-events: ${(props: BaseButtonProps) => (props.disabled ? 'none' : 'all')};
  opacity: ${(props: BaseButtonProps) => (props.disabled ? '0.5' : '1')};
  margin-right: 10px;
`

const ResetButton = styled(BaseButton)`
  background-color: #4162fa;
`

/**
 * React.FC
 */
const ConwayGOL: React.FC<ConwaysGameOfLifeProps> = ({
  rows = 20,
  cols = 20
}: ConwaysGameOfLifeProps): JSX.Element => {
  // create ranges from the rows / cols props
  const rowRange: number[] = Array.from(Array(+rows || 20).keys())
  const colRange: number[] = Array.from(Array(+cols || 20).keys())

  // state
  const [state, setState] = useState<ConwaysGameOfLifeState>({
    gameOn: false,
    livingCells: []
  })
  const { gameOn, livingCells } = state

  /**
   * @function
   * Handling the preselection of living cells
   * @param evt
   */
  const precheckLivingCell = (evt: Event & { target: Element }) => {
    if (!gameOn) {
      const id = evt.target.id

      if (livingCells.indexOf(id) >= 0) {
        setState({
          ...state,
          livingCells: state.livingCells.filter((f) => f !== id)
        })
      } else {
        setState({
          ...state,
          livingCells: [...new Set([...state.livingCells, id])]
        })
      }
    }
  }

  /**
   * Determine number of living neighbors for a target
   * @param target
   */
  const isAlive = (target: string): boolean => {
    const [row, col] = target.split('-').map((m) => +m)

    let livingNeighborCount = 0

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        const k = `${r}-${c}`
        if (k !== target && livingCells.indexOf(k) >= 0) {
          livingNeighborCount++
        }
      }
    }

    // a dead cell will come alive if exactly 3 neighbors are live
    if (livingCells.indexOf(target) < 0) {
      return livingNeighborCount === 3 ? true : false
    } else {
      return livingNeighborCount === 2 || livingNeighborCount === 3 ? true : false
    }
  }

  /**
   * @function
   * This is called in useEffect() on a setInterval()
   */
  const regenerateBoard = () => {
    if (gameOn) {
      const newlivingCells: string[] = []

      rowRange.forEach((row: number) => {
        colRange.forEach((col: number) => {
          const target = `${row}-${col}`
          if (isAlive(target)) {
            newlivingCells.push(target)
          }
        })
      })

      setState({
        ...state,
        livingCells: newlivingCells
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      regenerateBoard()
    }, 1200)

    return () => clearInterval(interval)
  })

  return (
    <Wrapper>
      <p
        style={{ fontFamily: 'sans-serif', fontSize: '12px' }}
      >{`Click/select your starting (living) cells and click "Game On!".`}</p>
      <GridContainer>
        {rowRange.map((r: number) => {
          return (
            <RowDiv key={`row-${r}`} id={`row-${r}`}>
              {colRange.map((c: number) => {
                const k = `${r}-${c}`
                return (
                  <Cell
                    key={k}
                    id={k}
                    alive={livingCells.indexOf(k) >= 0}
                    onClick={precheckLivingCell}
                  />
                )
              })}
            </RowDiv>
          )
        })}
      </GridContainer>
      <ButtonContainer>
        <StartButton onClick={() => setState({ ...state, gameOn: true })} disabled={gameOn}>
          Game On!
        </StartButton>
        <ResetButton onClick={() => setState({ ...state, gameOn: false, livingCells: [] })}>
          Stop/Reset
        </ResetButton>
      </ButtonContainer>
    </Wrapper>
  )
}

export default ConwayGOL
