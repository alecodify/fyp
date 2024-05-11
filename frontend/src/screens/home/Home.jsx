import { Link } from "react-router-dom";
import { ComplaintBox, GuidesCard, PersonalityCard } from "../../components";
import { VoterData, candidateData } from "./data";
import { useEffect, useState } from "react";
import { BGCOLOR } from "../../theme/theme";

const Home = () => {
  const [showVoteButton, setShowVoteButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setShowVoteButton(false);
      } else {
        setShowVoteButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="mt-10 my-4">

        {showVoteButton && (
          <div className="relative w-full">
            <div className="absolute left-6 top-[-10px] lg:left-20 lg:top-10">
              <Link to={"/vote"} className={`py-2 px-4 ${BGCOLOR.red} text-white rounded-md`}>Vote</Link>
            </div>
          </div>
        )}


      <div className="mt-20 lg:mt-0">
        <img src="images/pakistan.jpg" alt="" />
      </div>

      <PersonalityCard
        name={"Quaid-e-Azam Muhammad Ali Jinnah"}
        title={"Founder of Pakistan"}
        text={" The first thing that I want to tell you is this, that you should not be influenced by any political pressure, by any political party or individual politician. If you want to raise the prestige and greatness of Pakistan, you must not fall a victim to any pressure, but do your duty as servants to the people and the State, fearlessly and honestly."}
        source={"/images/quaideazam.png"}
      />

      <div className="flex flex-col lg:flex-row mt-4 mx-8 lg:mx-56 rounded-lg p-2 lg:p-4 gap-4">
        <GuidesCard title={"Guides For Voter"} data={VoterData} />
        <GuidesCard title={"Guides For Candidate"} data={candidateData} />
      </div>

      <ComplaintBox email={"info@ecp.gov.pk"} pageLink={true} />

    </div>
  )
}

export default Home