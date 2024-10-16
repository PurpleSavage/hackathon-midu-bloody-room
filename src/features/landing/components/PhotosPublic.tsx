'use client'
import { PhotosPublicI } from "@/interfaces/photospublicInterface"
import { useEffect, useState } from "react"

export default function PhotosPublic() {
    const [allPhotos,setAllPhotos]=useState<PhotosPublicI[]>([])
    useEffect(()=>{
        const allPhotosPublic =async()=>{
            const response=await fetch('/api/photospublic')
            if(!response.ok) return
            const data =await response.json()
            const {photos}=data
            setAllPhotos(photos)
        }
        allPhotosPublic()
    },[])
  return (
    <div className="flex flex-wrap">
        {
            allPhotos.length !== 0 ? 
            allPhotos.map((photo,index)=>(
                <img
                    width={300}
                    height={300}
                    key={photo.id}
                    src={photo.photourl}
                    className={` ${index % 2===0 ? "size-[400px]":"size-[600px]"}`}
                    alt='Horror image'
                />
            ))
            :null
        }
    </div>
  )
}
