import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Grid from "./components/Grid";

function App() {
  const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(true);
  const [height, setHeight] = useState(16);
  const [width, setWidth] = useState(16);
  const [wSize, setWSize] = useState(30);
  const [hSize, setHSize] = useState(30);
  const [color, setColor] = useState("#ff0000");
  const [pixelColor, setPixelColor] = useState<string[][]>(Array(32).fill(Array(32).fill("")));
  const canRenderGrid: boolean = height !== 0 && width !== 0;
  
  
  useEffect(() => {
    if (isDarkModeOn){
      
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    else{
      
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkModeOn])
  
  useEffect(()=>{
    const theme: string | null = localStorage.getItem("theme");
    if (theme) document.body.classList.add(theme);
    document.body.classList.add("transition-all", "duration-300", "ease-out");
    
  }, []);
  
  useEffect(()=>{
    const setNewGrid: ()=> void = ()=>{
      const newGrid: string[][] = [];
      for (let i=0; i<height; i++){
        const row: string[] = [];
        for (let j=0; j<width; j++) row.push(pixelColor[i]?.[j] ? pixelColor[i][j]: "");
        newGrid.push(row);
      }
  
      setPixelColor(newGrid);
    }

    setNewGrid();
    
  }, [height, width])
  
  const handleThemeChange: () =>void = ()=>{
    setIsDarkModeOn(!isDarkModeOn);
  }
  const handleReset: () =>void = ()=>{
    setPixelColor(Array(height).fill(Array(width).fill("")));
  }
  const handleColorChange: (row: number, col: number)=> void = (row: number, col: number) =>{
    console.log(row, col);
    if (color){
      const newPixelColor = pixelColor.map((row) => [...row]);
      newPixelColor[row][col] = color;
      setPixelColor(newPixelColor);
    }
  }

  return (
    <>
      <div className="flex justify-between flex-col min-h-screen relative">
        <Navbar isDarkModeOn = {isDarkModeOn} handleReset={handleReset} handleThemeChange={handleThemeChange}/>
        <AnimatePresence>
          {canRenderGrid && <motion.div className="flex justify-center max-md:max-w-[90%] overflow-hidden min-w-full"  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <Grid width={width} height={height} hSize={hSize} wSize={wSize} handleColorChange={handleColorChange} pixelColor={pixelColor}/>
          </motion.div>}
        </AnimatePresence>
        <Footer props={{width, height, wSize, hSize, setWidth, setHeight, setWSize, setHSize, isDarkModeOn, color, setColor}}/>
      </div>
    </>
  )
}

export default App
