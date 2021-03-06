import {
    Html,
    OrbitControls,
    PerspectiveCamera,
    Stars,
} from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TileData } from './classes/TileData'
import Tile from './components/Tile'

import './style.css'
import { callGetTestEndpoint } from './apiCalls/testEndpoint'

const MAP_WIDTH = 7

function ToolTip() {
    return (
        <Html center position={[0, 0, 0]}>
            <p>Hakaton!</p>
        </Html>
    )
}

// returns a list of the 2D array of Tiles that make up the Map
function Map(props: {
    tileDataList: TileData[]
    handleSelection: (tile: number) => void
}) {
    return (
        <>
            {props.tileDataList.map((tileData: TileData) => (
                <Tile
                    key={tileData.id}
                    tileData={tileData}
                    handleSelection={props.handleSelection}
                />
            ))}
        </>
    )
}

// TODO: Make a tile component that uses custom react hooks that are also clickable
// Consider using zustand or Recoil state management libraries to handle metadata of each tile
// Currently it renders all tiles when one is clicked, is there a way to only render the updated one using useEffect?
// Make API calls (eventually to colyseus api)

function Environment(props: { initialTileDataList: TileData[] }) {
    const [tileDataList, setTileDataList] = useState(props.initialTileDataList)

    useEffect(() => {
        // console.log('omg data color')
    }, [tileDataList])

    function handleSelection(tileId: number) {
        setTileDataList((currTileData: TileData[]) => {
            return currTileData.map((data) => {
                // console.log('handleSelection data: ', data)
                // console.log('handleSelection tile: ', tileId)
                if (data.id === tileId) {
                    // data.setTileDataColor(
                    //     data.color === 'orange' ? 'green' : 'orange'
                    // )
                    // console.log('the new colors is: ', data.color)
                    // return data
                    return data.color === 'orange'
                        ? { ...data, color: 'green' }
                        : { ...data, color: 'orange' }
                }
                return data
            })
        })

        //testCallApi from tile click
        callFetchApi()
    }

    function callFetchApi() {
        callGetTestEndpoint()
            .then((result) => {
                console.log(result)
            })
            .catch((e) => {
                console.log(`error: ${e}`)
            })
    }

    return (
        <>
            <button type="button" onClick={callFetchApi}>
                Click me!
            </button>
            <Canvas>
                <OrbitControls />
                <Stars />
                <color attach="background" args={['black']} />
                <ToolTip />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <PerspectiveCamera position={[5, 5, 5]} makeDefault />
                <Map
                    tileDataList={tileDataList}
                    handleSelection={handleSelection}
                />
            </Canvas>
        </>
    )
}

export default function App() {
    // const initialTileDataList = [
    //     new TileData(1, -0.5, 0, -0.5),
    //     new TileData(2, -0.5, 0, 0.5),
    //     new TileData(3, 0.5, 0, -0.5),
    //     new TileData(4, 0.5, 0, 0.5),
    // ]
    const tileOffset = MAP_WIDTH / 2 - 0.5
    const initialTileDataList = Array(MAP_WIDTH)
        .fill(0)
        .reduce(
            (acc, _, i) =>
                acc.concat(
                    Array(MAP_WIDTH)
                        .fill(0)
                        .map(
                            (_, j) =>
                                new TileData(
                                    10 * i + j,
                                    i - tileOffset,
                                    0,
                                    j - tileOffset
                                )
                        )
                ),
            []
        )
    return <Environment initialTileDataList={initialTileDataList} />
}
