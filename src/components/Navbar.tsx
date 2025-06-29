
const Navbar = ({ isDarkModeOn, handleReset, handleThemeChange}: {isDarkModeOn: boolean, handleReset: ()=>void, handleThemeChange: ()=>void}) => {
  return (
    <div className="flex items-center justify-between p-8">
      <button onClick={handleReset} className="p-1 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
        Reset
      </button>
      
      <button onClick={handleThemeChange} className="p-1 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
        {isDarkModeOn? "Go Light":"Go Dark"}
      </button>
    </div>
  )
}

export default Navbar
