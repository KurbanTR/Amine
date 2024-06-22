

const BioMenu = ({ bio, active, setActive }) => {
  return (
    <div className={`w-full p-4 fixed top-20 z-[1] ${!active && 'hidden'} 850res:p-6 700res:p-4`}>
      <div className="
        p-4 bg-[#1c1c1c] rounded-xl mx-auto
        1650res:max-w-4xl 1480res:max-w-3xl 1320res:max-w-2xl 
        1200res:max-w-xl 1000res:max-w-lg 850res:max-w-md 
        600res:max-w-sm
      ">
        <h2 className="text-white/70 mt-4">{bio}</h2>
        <div className='btn-base bg-def-gray mt-3' onClick={() => setActive(false)}>
          <span className="relative top-[-2px] cursor-pointer text-white">Close</span>
        </div>
      </div>
    </div>
  );
};

export default BioMenu;
