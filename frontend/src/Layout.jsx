import { Outlet, useParams } from "react-router-dom"
import { Navbar , Footer, Topbar } from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const Layout = () => {

  const [totalVotes, setTotalVotes] = useState("");

  useEffect(() => {
    const fetchTotalVotes = async () => {
      try {
        const response = await fetch(`/api/votes`);
        if (response.ok) {
          const responseData = await response.json();
          const totalVotesData = responseData.totalVotesCasted; 
          setTotalVotes(totalVotesData);
        } else {
          console.error("Failed to fetch total votes casted");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching votes.");
      }
    };
    
    fetchTotalVotes();
  }, [totalVotes]);
  
  
  return (
    <>
     <Navbar />
     <Topbar electionTimeRemaining={"Feb 08 2029 23:59:59 GMT+0500"} totalVotesCasted={totalVotes}/>
     <ToastContainer position="top-right" />
     <Outlet />
     <Footer />
    </>
  )
}

export default Layout