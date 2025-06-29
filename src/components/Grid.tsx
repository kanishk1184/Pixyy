import { useEffect, useState } from "react";

type GridProps = {
    pixelColor: string[][];
    handleColorChange: (row: number, col: number) => void;
    height: number;
    width: number;
    hSize: number;
    wSize: number;
}

const Grid = ({ pixelColor, height, width, hSize, wSize, handleColorChange }: GridProps) => {
    const [isDrawing, setIsDrawing] = useState(false);
    
    useEffect(() => {
        const stopDrawing = () => setIsDrawing(false);

        window.addEventListener("mouseup", stopDrawing);
        window.addEventListener("touchend", stopDrawing);

        return () => {
            window.removeEventListener("mouseup", stopDrawing);
            window.removeEventListener("touchend", stopDrawing);
        };
    }, []);

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && isDrawing) {
            e.preventDefault();
            // Single finger: draw only
            const target = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );
            if (target && target instanceof HTMLDivElement) {
                const [r, c] = target.dataset.cell?.split("-") || [];
                if (r && c) handleColorChange(Number(r), Number(c));
            }
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            // Single finger: start drawing
            setIsDrawing(true);
            const target = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            );
            if (target && target instanceof HTMLDivElement) {
                const [r, c] = target.dataset.cell?.split("-") || [];
                if (r && c) handleColorChange(Number(r), Number(c));
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDrawing(true);
        
        const target = e.target as HTMLDivElement;
        if (target && target.dataset.cell) {
            const [r, c] = target.dataset.cell.split("-");
            if (r && c) handleColorChange(Number(r), Number(c));
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDrawing) {
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target instanceof HTMLDivElement) {
                const [r, c] = target.dataset.cell?.split("-") || [];
                if (r && c) handleColorChange(Number(r), Number(c));
            }
        }
    };

    return (
        <div 
            className={`grid border-l border-t`} 
            style={{ 
                gridTemplateRows: `repeat(${height}, ${hSize}px)`, 
                gridTemplateColumns: `repeat(${width}, ${wSize}px)`, 
                touchAction: "none",
                userSelect: "none" 
            }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
                {pixelColor.map((row, rowIdx) => (
                    row.map((col, colIdx) => (
                        <div
                            key={(rowIdx * width) + colIdx}   
                            data-cell={`${rowIdx}-${colIdx}`} 
                            style={{ backgroundColor: col }} 
                            className="border-r border-b transition-all duration-300"
                        />
                    ))
                ))}
        </div>
    );
};

export default Grid;