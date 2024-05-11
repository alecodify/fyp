import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    
  return (
    <div className="my-14 lg:my-16 m-auto flex flex-col justify-center items-center">
      <h1 className="my-3 lg:my-5 font-bold text-2xl lg:text-5xl">Welcome Admin Dashboard</h1>  
     <div className={`grid grid-cols-2 text-sm lg:text-lg gap-2 text-center lg:grid-cols-4`}>
     <Link to="/admin/candidate" className="py-2 px-4 bg-red-500 text-white rounded-lg font-bold">Add New Candidate</Link>
     <Link to="/admin/allcandidates" className="py-2 px-4 bg-red-500 text-white rounded-lg font-bold">See All Candidates</Link>
     <Link to="/admin/voter" className="py-2 px-4 bg-red-500 text-white rounded-lg font-bold">Add New Voter</Link>
     <Link to="/admin/allvoters" className="py-2 px-4 bg-red-500 text-white rounded-lg font-bold">See All Voters</Link>
     </div>
     <Outlet />
  </div>
  )
}

export default Dashboard