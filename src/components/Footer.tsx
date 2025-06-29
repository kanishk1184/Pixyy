import type React from "react"
import { useEffect, useState } from "react";

type FooterProps = {
  props: {
    width: number;
    height: number;
    wSize: number;
    hSize: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    setWSize: React.Dispatch<React.SetStateAction<number>>;
    setHSize: React.Dispatch<React.SetStateAction<number>>;
    isDarkModeOn: boolean;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
  }
}

const Footer = ({props}: FooterProps ) => {
  const {width, height, wSize, hSize, setWidth, setHeight, setWSize, setHSize, isDarkModeOn, color, setColor} = props;
  const [tempWidth, setTempWidth] = useState(width);
  const [tempHeight, setTempHeight] = useState(height);
  const maxWidth = Math.floor((0.98*window.innerWidth)/wSize);
  const maxHeight = Math.floor((0.9*window.innerHeight)/hSize);

  useEffect(()=>{
    const timeoutHeight = setTimeout(() => {
      setHeight(tempHeight);
    }, 1000);

    return ()=> clearTimeout(timeoutHeight);
  }, [tempHeight])

  useEffect(()=>{
    const timeoutWidth = setTimeout(() => {
      setWidth(tempWidth);
    }, 1000);

    return ()=> clearTimeout(timeoutWidth);
  }, [tempWidth])

  useEffect(()=>{
    if (width > maxWidth){ 
      setWidth(maxWidth);
      setTempWidth(maxWidth);
    }
    else if (width === 0){
      setWidth(16);
      setTempWidth(16);
    }
  }, [maxWidth])

  useEffect(()=>{
    if (height > maxHeight){
      setHeight(maxHeight);
      setTempHeight(maxHeight);
    }
    else if (height === 0){
      setHeight(16);
      setTempHeight(16);
    }
  }, [maxHeight])

  const numInputsHandler: (name: string, e: React.ChangeEvent<HTMLInputElement>) =>void = (name, e) =>{
    let value: number = e.target.value ? parseInt(e.target.value): 0;
    if (value > maxWidth && name == "gWidth") value = maxWidth;
    else if (value > maxHeight && name == "gHeight") value = maxHeight;
    else if (value > 9999 && (name == "pWidth" || name == "pHeight")) value = 9999;

    if (name === "gHeight") setTempHeight(value);
    else if (name === "pHeight") setHSize(value);
    else if (name === "gWidth") setTempWidth(value);
    else if (name === "pWidth") setWSize(value);
  }

  return (
    <div className="flex justify-between p-8 items-center text-xl">

      <div className="gridDimension flex flex-col gap-3">
        <div className="gHeight flex gap-2 items-center">
          <label htmlFor="gHeight">Grid Height:</label>
          <input type="number" name="gHeight" id="gHeight" className={`px-2 py-1 w-20 hover:outline-1 focus:outline-2 rounded-lg  ${isDarkModeOn? "lightOutline": "darkOutline"}`} min={1} max={100} value={tempHeight} onChange={(e) => numInputsHandler("gHeight", e)}/>
        </div>
        <div className="gWidth flex gap-2 items-center">
          <label htmlFor="gWidth">Grid Width:</label>
          <input type="number" name="gWidth" id="gWidth" className={`px-2 py-1 w-20 hover:outline-1 focus:outline-2 rounded-lg  ${isDarkModeOn? "lightOutline": "darkOutline"}`} min={1} max={100} value={tempWidth} onChange={(e) => numInputsHandler("gWidth", e)}/>
        </div>
      </div>

      <input type="color" value={color} onChange={(e)=>setColor(e.target.value)}/>

      <div className="piexelDimension flex flex-col gap-3 text-right items-end">
        <div className="pHeight flex gap-2 items-center">
          <input type="number" name="pHeight" id="pHeight" className={`text-right px-2 py-1 w-20 hover:outline-1 focus:outline-2 rounded-lg  ${isDarkModeOn? "lightOutline": "darkOutline"}`} min={1} max={100} value={hSize} onChange={(e) => numInputsHandler("pHeight", e)}/>
          <label htmlFor="pHeight">:Pixel Height</label>
        </div>
        <div className="pWidth flex gap-2 items-center">
          <input type="number" name="pWidth" id="pWidth" className={`text-right px-2 py-1 w-20 hover:outline-1 focus:outline-2 rounded-lg  ${isDarkModeOn? "lightOutline": "darkOutline"}`} min={1} max={100} value={wSize} onChange={(e) => numInputsHandler("pWidth", e)}/>
          <label htmlFor="pWidth">:Pixel Width</label>
        </div>
      </div>
        
    </div>
  )
}

export default Footer
