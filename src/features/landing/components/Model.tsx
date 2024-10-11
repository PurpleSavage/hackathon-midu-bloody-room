'use client'

import { useLoader } from "@react-three/fiber"

import { FBXLoader } from "three/examples/jsm/Addons.js";
export default function Model() {
    const obj = useLoader(FBXLoader , '/models/calabaza.fbx'); 
  
  return (
    <primitive object={obj} scale={[0.03, 0.03, 0.03]} position={[0, -1, 0]} rotation={[-Math.PI/ 10,Math.PI / 4, 0]} />
  )
}
