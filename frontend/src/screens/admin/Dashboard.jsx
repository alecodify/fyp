import { Link, Outlet } from "react-router-dom";
import { DashboardCard, DashboardSidebar, DashboardTopbar } from "../../components";
import { useEffect, useState } from "react";
import { BsMenuUp } from "react-icons/bs";
import { FaStamp, FaVoteYea } from "react-icons/fa";

const Dashboard = () => {

  const [totalVotes, setTotalVotes] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);

  useEffect(() => {
    const fetchTotalVotes = async () => {
      try {
        const response = await fetch(`/api/votes`);
        if (response.ok) {
          const responseData = await response.json();
          setTotalVotes(responseData.totalVotesCasted);
        } else {
          console.error("Failed to fetch total votes casted");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching votes.");
      }
    };
    
    const fetchTotalVoters = async () => {
      try {
        const response = await fetch(`/api/voters`);
        if (response.ok) {
          const responseData = await response.json();
          setTotalVoters(responseData.totalVoters);
        } else {
          console.error("Failed to fetch total voters");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching voters.");
      }
    };

    const fetchTotalCandidates = async () => {
      try {
        const response = await fetch(`/api/candidates`);
        if (response.ok) {
          const responseData = await response.json();
          setTotalCandidates(responseData.totalCandidates);
        } else {
          console.error("Failed to fetch total candidates");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching candidates.");
      }
    };

    fetchTotalVotes();
    fetchTotalVoters();
    fetchTotalCandidates();
  }, []);
  

  return (
    <div className="">
      <div className="w-full h-18">
        <DashboardTopbar />
      </div>

      <div className="flex gap-3">
        <DashboardSidebar />
        <div className="flex flex-col lg:flex-row gap-3 pr-6 pt-4 lg:pr-0 lg:p-10">
          <DashboardCard seats={totalCandidates} heading={"No of Candidates"} icon={<BsMenuUp className="text-5xl lg:text-8xl" />}/>
          <DashboardCard seats={totalVoters} heading={"No of Voters"} icon={<FaStamp className="text-5xl lg:text-8xl" />}/>
          <DashboardCard seats={totalVotes} heading={"Vote Casted"} icon={<FaVoteYea className="text-5xl lg:text-8xl" />}/>
        </div>
      </div>

      <div>
      </div>

    </div>
  )
}

export default Dashboard