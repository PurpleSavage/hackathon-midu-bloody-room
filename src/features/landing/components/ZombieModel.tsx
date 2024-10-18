'use client'
import { useLoader, useFrame } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader, MeshStandardMaterial } from 'three'

export default function ZombieModel() {
  // Load FBX model and texture
  const fbx = useLoader(FBXLoader, '/models/twist-dance-zombie.fbx')
  const texture = useLoader(TextureLoader, '/images/zombie-texture.png')
  const mixer = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    // Apply the texture to the model's mesh
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // child is a Mesh, apply texture
        child.material = new MeshStandardMaterial({
          map: texture, // Apply the texture here
        })
      }
    })

    // Check if the model has animations and play the first animation
    if (fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx)
      const action = mixer.current.clipAction(fbx.animations[0])
      action.play()
    }
  }, [fbx, texture])

  // Update animation on each frame
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta)
  })

  return (
    <primitive
      object={fbx}
      scale={[0.006, 0.006, 0.006]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  )
}
