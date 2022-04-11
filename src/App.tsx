import {
    Html,
    OrbitControls,
    PerspectiveCamera,
    Stars,
} from '@react-three/drei'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TileData } from './classes/TileData'
import Tile from './components/Tile'

import './style.css'

function ToolTip() {
    return (
        <Html center position={[0, 0, 0]}>
            <p>Hakaton!</p>
        </Html>
    )
}

// returns a list of the 2D array of Tiles that make up the Map
function Map(props: { tileDataList: TileData[]; handleSelection: any }) {
    console.log('tileDataList: ', props.tileDataList)
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

function Environment(initialTileDataList: any) {
    // props: {initialTileDataList: TileData[]}) {
    console.log('environment ', initialTileDataList.initialTileDataList)
    const [tileDataList, setTileDataList] = useState(
        initialTileDataList.initialTileDataList
    )
    // const [selectedTile, setSelectedTile] = useState()

    function handleSelection(tile: number) {
        setTileDataList((currTileData: TileData[]) => {
            return currTileData.map((data) => {
                console.log('handleSelection data: ', data)
                console.log('handleSelection tile: ', tile)
                if (data.id === tile) {
                    return data.color === 'orange'
                        ? { ...data, color: 'green' }
                        : { ...data, color: 'orange' }
                }
                return data
            })
        })
    }

    return (
        <>
            <button type="button">Click me!</button>
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
    const initialTileDataList = [
        new TileData(1, -0.5, 0, -0.5),
        new TileData(2, -0.5, 0, 0.5),
        new TileData(3, 0.5, 0, -0.5),
        new TileData(4, 0.5, 0, 0.5),
    ]
    return <Environment initialTileDataList={initialTileDataList} />
}
