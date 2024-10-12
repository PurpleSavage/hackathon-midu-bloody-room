'use client'
import { Canvas} from "@react-three/fiber";
import { OrbitControls} from '@react-three/drei';
import { Suspense } from "react";
import dynamic from 'next/dynamic';
const ZombieModel =dynamic(() => import('../components/ZombieModel'), {
    ssr: false,
  })

export default function Members() {
  return (
    <div className="w-full h-[600px] ">
      <Canvas fallback={<div>Sorry, no WebGL supported!</div>} frameloop="always"
          shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [5, 5, 5], fov: 50, near: 0.1, far: 100 }}>
          <ambientLight intensity={1} />
          <spotLight position={[0,100, 100]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Suspense fallback={<p>Cargando...</p>}>
            <ZombieModel/>
          </Suspense>
          <OrbitControls  enableZoom={false}/>   
      </Canvas>
    </div> 
  )
}
