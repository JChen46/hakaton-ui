import { Backdrop, Html, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from "react-three-fiber";
import { DoubleSide } from "three";

import "./style.css";

function GreenSquare({position, args}: {position:[number,number,number], args:[number,number]}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => (ref.current.rotation.z += 0.001))
  return (
    <mesh 
      ref = {ref}
      position = {position}
      rotation = {[Math.PI / 2, 0, 0]}
      scale = {[1, 1, 1]}
    >
    <planeBufferGeometry args={args}/>
    <meshBasicMaterial color="orange" side={DoubleSide} />
    </mesh>
  )
}

function ToolTip() {
  return (
    <Html center position = {[0, 0.5, 0]}>
      <p>Hakaton!</p>
    </Html>
  )
}

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera position={[10, 10, 10]} makeDefault />
      <GreenSquare position={[0, 0, 0]} args={[10, 10]}/>
      <ToolTip />

    </Canvas>
    
  )
}

