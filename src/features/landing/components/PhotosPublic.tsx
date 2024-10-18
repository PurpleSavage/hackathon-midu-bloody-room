'use client'
import { PhotosPublicI } from "@/interfaces/photospublicInterface"
import { useEffect, useState } from "react"

const gridClasses = [
    { rowSpan: "row-span-5", colSpan: "col-span-1" }, // Imagen 1
    { rowSpan: "row-span-3", colSpan: "col-span-1" }, // Imagen 2
    { rowSpan: "row-span-2", colStart: "col-start-2", rowStart: "row-start-4" }, // Imagen 3
    { rowSpan: "row-span-2", colStart: "col-start-3", rowStart: "row-start-1" }, // Imagen 4
    { rowSpan: "row-span-3", colStart: "col-start-3", rowStart: "row-start-3" }, // Imagen 5
    { rowSpan: "row-span-5", colStart: "col-start-4" }, // Imagen 6
];
export default function PhotosPublic() {
    const [allPhotos, setAllPhotos] = useState<PhotosPublicI[]>([])
    useEffect(() => {
        const allPhotosPublic = async () => {
            const response = await fetch('/api/photospublic')
            if (!response.ok) return
            const data = await response.json()
            const { photos } = data
            setAllPhotos(photos)
        }
        allPhotosPublic()
    }, [])
    return (
        <div className="overflow-auto w-full p-4  shadow-inner rounded-lg"> {/* Sombra interna y fondo */}
    <div className="grid grid-cols-4 gap-8">
        {allPhotos.length !== 0 ? (
            [...allPhotos, ...allPhotos].slice(0, 6).map((photo, index) => {
                const gridClass =
                    index === 0 ? "row-span-5 col-span-1" :
                    index === 1 ? "row-span-3 col-span-1" :
                    index === 2 ? "row-span-2 col-start-2 row-start-4" :
                    index === 3 ? "row-span-2 col-start-3 row-start-1" :
                    index === 4 ? "row-span-3 col-start-3 row-start-3" :
                    index === 5 ? "row-span-5 col-start-4" :
                    index === 6 ? "row-span-5 col-span-1" :
                    index === 7 ? "row-span-3 col-span-1" :
                    index === 8 ? "row-span-2 col-start-2 row-start-4" :
                    index === 9 ? "row-span-2 col-start-3 row-start-1" :
                    index === 10 ? "row-span-3 col-start-3 row-start-3" :
                    index === 11 ? "row-span-5 col-start-4" :
                    "";

                return (
                    <div key={photo.id} className={`${gridClass}`}>
                        <img
                            src={photo.photourl}
                            alt='Image description'
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                );
            })
        ) : null}
    </div>
</div>

    )
}
