import {
    Html,
    OrbitControls,
    PerspectiveCamera,
    Stars,
} from '@react-three/drei'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { Position } from './classes/Position'

import './style.css'

function ToolTip() {
    return (
        <Html center position={[0, 0, -0.5]}>
            <p>Hakaton!</p>
        </Html>
    )
}

function Map() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ref = useRef<THREE.Mesh>(null!)
    const [position, setPosition] = useState([0, 0, 0])
    useFrame(() => (ref.current.rotation.z += 0.001))
    console.log(position)
    return (
        <>
            <mesh
                ref={ref}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 1, 1]}
                onPointerDown={() => {
                    console.log('aaaa', position);
                    setPosition(position.map((value) => value + 1))
                    }
                }
                position={position as [number, number, number]}
            >
                <boxBufferGeometry args={[10, 10]} />
                <meshBasicMaterial color="orange" side={DoubleSide} />
            </mesh>
        </>
    )
}

// TODO: Make a tile component that uses custom react hooks that are also clickable
// Consider using zustand or Recoil state management libraries to handle metadata of each tile

function Environment() {
    // function ExecuteSomething() {
    //     console.log('Executed Something!')
    //     setPosition(position.map((value) => value + 1))

    // }

    const test = new Position(10, 10, 10);

    return (
        <>
            <button type="button" >
                Click me!
            </button>
            <Canvas>
                <OrbitControls />
                <Stars />
                <color attach="background" args={['black']} />
                <ToolTip />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <PerspectiveCamera
                    position={test.getPosition() as [number, number, number]}
                    makeDefault
                />
                <Map />
            </Canvas>
        </>
    )
}

export default function App() {
    return <Environment />
}
