import React from 'react'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AllCandidates, AllVoters, AssemblyVice, Ballot, Candidate, Contact, Dashboard, FourOhFour, HalkaVice, Home, SeeCandidate, SeeVoter, Signin, Vote, Voter } from "./screens";
import { AdminNav } from './components';
import Layout from './Layout';

const App = () => {

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' >
          <Route path='' element={<Layout/>}>
              <Route path='' element={<Home />} />
              <Route path='vote' element={<Vote />} />
              <Route path='contact' element={<Contact />} />
              <Route path='ballot' element={<Ballot />} />
              <Route path='results/*' >
                <Route path='halkavice' element={<HalkaVice />}/>
                <Route path='assemblyvice' element={<AssemblyVice />}/>
                <Route path='*' element={<FourOhFour />}/>
              </Route>
          </Route>

          <Route path='admin/*' >
              <Route path='' element={<Signin />}/>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='candidate' element={<Candidate />} />
              <Route path='allcandidates' element={<AllCandidates />} />
              <Route path='seecandidate' element={<SeeCandidate />} />
              <Route path='voter' element={<Voter />} />
              <Route path='allvoters' element={<AllVoters />} />
              <Route path='seevoter' element={<SeeVoter />} />
              <Route path='results/*' >
                <Route path='halkavice' element={<HalkaVice adminNav={<AdminNav />} />}/>
                <Route path='assemblyvice' element={<AssemblyVice  adminNav={<AdminNav />} />}/>
                <Route path='*' element={<FourOhFour />}/>
              </Route>
              <Route path='*' element={<FourOhFour />}/>
          </Route>
        
          <Route path='*' element={<FourOhFour />}/>
        </Route>
      )
    );
  
    return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
}

export default App