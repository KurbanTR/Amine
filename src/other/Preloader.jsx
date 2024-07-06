import { Spinner } from '@chakra-ui/react'

const Preloader = () => {
    const h = window.innerHeight
  return (
    <div className={`relative w-full flex items-center justify-center bg-def-black`} style={{height: `${h}px`}}>
      {/* <h1 className="text-7xl font-bold 650res:text-5xl 650res:font-semibold">Loading</h1> */}
      <Spinner size='xl' thickness='4px' speed='0.65s'/>
    </div>
  )
}

export default Preloader
