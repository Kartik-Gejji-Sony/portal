import { Home } from './components/Home/Home';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { NavBar } from './components/NavBar';
// import { Project } from './components/Projects/Project';
import { Users } from './components/Users/Users';
import { Roles } from './components/Roles/Roles';
// import { DashBoard } from './components/Events/DashBoard';
// import { Aboute } from './components/About/Aboute';
import { ProjectDetails } from './components/Projects/ProjectDetails';
import { Member } from './components/Members/Member';
import { ProjectTab } from './components/Projects/ProjectTab';
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import { useNavigate } from "react-router-dom"
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/Login';

const oktaAuth = new OktaAuth({
  issuer: `${process.env.REACT_APP_OKTA_ISUSER}`,
  clientId: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
  redirectUri: window.location.origin + "/login/callback",
});
function App() {
  const navigate = useNavigate();
  const customAuthHandler = (oktaAuth) => {
    navigate('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='border'>
      <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<PrivateRoute Component={Home} />} />
          <Route path='/projectstab' element={<PrivateRoute Component={ProjectTab} />} />
          {/* <Route path='/projects' element={<PrivateRoute Component={Project} />} /> */}
          <Route path='/projectdetails' element={<PrivateRoute Component={ProjectDetails} />} />
          <Route path='/members' element={<PrivateRoute Component={Member} />} />
          <Route path='/users' element={<PrivateRoute Component={Users} />} />
          <Route path='/roles' element={<PrivateRoute Component={Roles} />} />
          {/* <Route path='/dashboard' element={<PrivateRoute Component={DashBoard} />} /> */}
          {/* <Route path='/about' element={<PrivateRoute Component={Aboute} />} /> */}
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>



    </div>
  );
}


const AppWithRouterAccess = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouterAccess;
