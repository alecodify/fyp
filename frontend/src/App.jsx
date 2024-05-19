import React, { useState } from 'react'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AllCandidates, AllVoters, AssemblyVice, Ballot, Candidate, Contact, Dashboard, FourOhFour, HalkaVice, Home, SeeCandidate, SeeVoter, Signin, Vote, Voter } from "./screens";
import PrivateRoute from './PrivateRoute';
import { AdminNav } from './components';
import Layout from './Layout';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' >
        <Route path='' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='vote' element={<Vote />} />
          <Route path='contact' element={<Contact />} />
          <Route path='results/*' >
            <Route path='halkavice' element={<HalkaVice />} />
            <Route path='assemblyvice' element={<AssemblyVice />} />
            <Route path='*' element={<FourOhFour />} />
          </Route>
        </Route>

        <Route path='ballot' element={<Ballot />} />

        <Route path='admin/*' >
          <Route path='' element={<Signin onSignIn={() => setIsLoggedIn(true)} />} />
          <Route
            path='dashboard'
            element={<PrivateRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='candidate'
            element={<PrivateRoute element={<Candidate />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='allcandidates'
            element={<PrivateRoute element={<AllCandidates />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='seecandidate'
            element={<PrivateRoute element={<SeeCandidate />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='voter'
            element={<PrivateRoute element={<Voter />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='allvoters'
            element={<PrivateRoute element={<AllVoters />} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='seevoter'
            element={<PrivateRoute element={<SeeVoter />} isLoggedIn={isLoggedIn} />}
          />
          <Route path='results/*' >
            <Route
              path='halkavice'
              element={<PrivateRoute element={<HalkaVice adminNav={<AdminNav />} />} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path='assemblyvice'
              element={<PrivateRoute element={<AssemblyVice adminNav={<AdminNav />} />} isLoggedIn={isLoggedIn} />}
            />
            <Route path='*' element={<FourOhFour />} />
          </Route>
          
          <Route path='*' element={<FourOhFour />} />
        </Route>

        <Route path='*' element={<FourOhFour />} />
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