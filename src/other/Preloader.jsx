
const Preloader = () => {
    const h = window.innerHeight
  return (
    <div className={`relative w-full flex items-center justify-center bg-def-black`} style={{height: `${h}px`}}>
      <h1 className="text-7xl font-bold 650res:text-5xl 650res:font-semibold">Loading</h1>      
    </div>
  )
}

export default Preloader
