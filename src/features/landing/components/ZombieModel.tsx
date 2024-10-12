'use client'
import { useLoader, useFrame } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ZombieModel() {
  const fbx = useLoader(FBXLoader, '/models/twist-dance-zombie.fbx')
  const mixer = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    if (fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx)
      const action = mixer.current.clipAction(fbx.animations[0])
      action.play()
    }
  }, [fbx])

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta)
  })

  return (
    <primitive object={fbx} scale={[0.009, 0.009, 0.009]} position={[0, -4, 0]} rotation={[0, 0, 0]} />
  )
}
