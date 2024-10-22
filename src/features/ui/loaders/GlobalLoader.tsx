'use client'
import { useProgress } from '@react-three/drei';
export default function GlobalLoader() {
    const { progress } = useProgress();
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <p>Loading resources... {Math.round(progress)}%</p>
      </div>
    </div>
  )
}
