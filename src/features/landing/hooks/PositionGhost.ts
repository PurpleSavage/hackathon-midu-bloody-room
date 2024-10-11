import { useState, useEffect, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

export const useMouseMovement = (debounceTime: number = 200, threshold: number = 10) => {
    const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Usamos un ref para el temporizador
    const previousPosition = useRef<Position>({ x: 0, y: 0 }); // Para guardar la posición anterior

    const handleMouseMove = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        // Calcula la distancia entre la nueva posición y la anterior
        const distance = Math.sqrt(
            Math.pow(x - previousPosition.current.x, 2) +
            Math.pow(y - previousPosition.current.y, 2)
        );

        // Solo actualiza si la distancia supera el umbral
        if (distance > threshold) {
            setMousePosition({ x, y });
            setIsMoving(true); // Cambia a estado de movimiento al mover el mouse
            previousPosition.current = { x, y }; // Actualiza la posición anterior
        }

        // Limpiamos el temporizador anterior si existe
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Establecemos un nuevo temporizador
        timerRef.current = setTimeout(() => {
            setIsMoving(false); // Cambiamos a estado estático después de un tiempo
        }, debounceTime);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return { mousePosition, isMoving };
};


