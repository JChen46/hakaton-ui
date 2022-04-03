import { Html, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";

import "./style.css";

function ToolTip() {
  return (
    <Html center position = {[0, 0, -0.5]}>
      <p>Hakaton!</p>
    </Html>
  )
}

function Map({position, args}: {position:[number,number,number], args:[number,number]}) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => (ref.current.rotation.z += 0.001))
  console.log(position)
  return (
    <>
    <mesh 
      ref = {ref}
      rotation = {[Math.PI / 2, 0, 0]}
      scale = {[1, 1, 1]}
      position={position}
    >
      <boxBufferGeometry args={args}/>
      <meshBasicMaterial color="orange" side={DoubleSide} />
      </mesh>
    </>
  )

}



function Environment() {
  function ExecuteSomething() {
    console.log('Executed Something!')
    setPosition(position.map(value => value+1))
  }
  const [position, setPosition] = useState([0, 0, 0])

  return (
    <>
      <button type="button" onClick={ExecuteSomething}>Click me!</button>
      <Canvas>
        <OrbitControls />
        <Stars />
        <color attach="background" args={['black']} />
        <ToolTip />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera position={[10, 10, 10]} makeDefault />
        <Map position={[position[0], position[1], position[2]]} args={[10, 10]}/>

      </Canvas>
    </>
  )
}

export default function App() {
  return (
    <Environment />
  )
}
