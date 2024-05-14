import { MdPersonAddAlt1 , MdViewList, MdDashboard, MdLock } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='w-2/4 lg:w-1/4 h-full bg-gray-200'>
      <div className="mx-2 lg:mx-10 p-4 flex flex-col lg:flex-row gap-2 lg:gap-4 items-center rounded-xl cursor-pointer">
        <img src="/admin.jpg" alt="" className="h-10 w-10 rounded-2xl" />
        <p className='text-lg font-medium'>Ali Raza</p>
      </div>


      <div className=' bg-gray-300 flex items-center h-12'>
        <p className='lg:mx-10 uppercase pl-4 font-medium'>REPORTS</p>
      </div>

      <div className='flex-1 flex-col gap-2 justify-start items-center h-28'>
        <Link to={"/admin/dashboard"} className=' cursor-pointer pl-4 flex gap-2 text-center items-center lg:mx-10 h-14 font-normal'><MdDashboard size={20} /> Dashboard</Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={""} className=' cursor-pointer pl-4 flex gap-2 items-center lg:mx-10 h-14 font-normal'><MdLock size={20}/> Vote</Link>
      </div>

      <div className=' bg-gray-300 flex items-center h-12'>
        <p className='lg:mx-10 uppercase pl-4 font-medium'>Manages</p>
      </div>

      <div className='flex-1 flex-col gap-2 justify-start items-center h-full'>
        <Link to={"/admin/voter"} className='pl-4 cursor-pointer flex gap-2 items-center lg:mx-10 h-14 font-normal'><MdPersonAddAlt1 size={20}/> <span>Add Voter</span></Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={"/admin/candidate"} className='pl-4 cursor-pointer flex gap-2 items-center lg:mx-10 h-14 font-normal'><MdPersonAddAlt1 size={20}/> <span>Add Candidate</span></Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={"/admin/seevoter"} className='pl-4 cursor-pointer flex  gap-2 items-center lg:mx-10 h-14 font-normal'><FaSearch size={20}/> <span>Search Voter</span> </Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={"/admin/seecandidate"} className='pl-4 cursor-pointer flex gap-2 items-center lg:mx-10 h-14 font-normal'><FaSearch size={20}/> <span>Search Candidate</span></Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={"/admin/allvoters"} className='pl-4 cursor-pointer flex gap-2 items-center lg:mx-10 h-14 font-normal'><MdViewList size={20} /> <span>List of Votes</span></Link>
        <div className='border-b-2 border-gray-400'></div>
        <Link to={"/admin/allcandidates"} className='pl-4 cursor-pointer flex gap-2 items-center lg:mx-10 h-14 font-normal'><MdViewList size={20} /> <span>List of Candidates</span></Link>
        <div className='bg-gray-200 h-32 lg:h-10'></div>
      </div>

    </div>
  )
}

export default Sidebar
