'use client'
import { Canvas} from "@react-three/fiber";
import { OrbitControls} from '@react-three/drei';

import dynamic from 'next/dynamic';
import { Suspense } from "react";

const Model =dynamic(() => import('../components/Model'), {
  ssr: false,
})
export default function Scene() {
  return (
   
    <div className="w-full h-[300px]">
      <Canvas fallback={<div>Sorry, no WebGL supported!</div>} frameloop="always"
          shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [5, 5, 5], fov: 50, near: 0.1, far: 100 }}>
            <ambientLight intensity={1} />
            <spotLight position={[0,100, 100]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Suspense fallback={<p>Cargando...</p>}>
              <Model/> 
            </Suspense>
            <OrbitControls  enableZoom={false} />   
        </Canvas>
    </div> 
    
  )
}
