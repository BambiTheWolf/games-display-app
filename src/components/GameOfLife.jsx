import produce from "immer";
import React, { useRef, useCallback, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const numRows = 40
const numCols = 45

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
]

const generateEmptyGrid = () => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows
}

const GameOfLife = () => {

    const [ grid, setGrid ] = useState(() => {
        return generateEmptyGrid()        
    })

    const [running, setRunning] = useState(false)

    const runningRef = useRef(running)
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return
        }
        // simulation
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0
                        operations.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            })
        })

        setTimeout(runSimulation, 100)
    }, [])

    return (
        <>
        <Container style={{ height: 100}}>
            <Row>
                <Col>
                    <Button block
                        onClick={() => {
                            setRunning(!running)
                            if (!running) {
                                runningRef.current = true
                                runSimulation()
                            }
                        }}
                        >
                        {running ? 'stop' : 'start'}
                    </Button>
                    <Button block
                        onClick={() => {
                            const rows = []
                            for (let i = 0; i < numRows; i++) {
                                rows.push(
                                    Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
                                )
                            }

                            setGrid(rows)
                        }}
                    >
                        random
                    </Button>
                    <Button block
                        onClick={() => {
                            setGrid(generateEmptyGrid())
                        }}
                        >
                        clear
                    </Button>
                </Col>
                <Col className="justify-content-end">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${numCols}, 20px)`
                    }}
                    >
                        {grid.map((rows, i) =>
                            rows.map((col, k) => (
                            <div
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                    })
                                    setGrid(newGrid)
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k] ? 'black' : undefined,
                                    border: "solid 1px black"
                                }}
                            />
                            ))
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default GameOfLife