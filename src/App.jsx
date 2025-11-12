import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import AuthContext, { AuthProvider } from './COMPONENTS/OAUTH-COMPONENTS/OAUTH-DIRECT-LOGIN/useAuthDirect'
import OauthLoginForm from './COMPONENTS/OAUTH-COMPONENTS/OAUT2-FLOW/OauthLoginForm'
import Dashboard from './COMPONENTS/PUBLIC-COMPONENETS/Dashborad'
import CallBack from './COMPONENTS/OAUTH-COMPONENTS/OAUT2-FLOW/CallBack'
import AuthLogin from './COMPONENTS/OAUTH-COMPONENTS/OAUTH-DIRECT-LOGIN/AuthLogin'




function App() {

  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if we have a continue parameter
  //   const urlParams = new URLSearchParams(location.search);
  //   const continueUrl = urlParams.get('continue');

  //   if (continueUrl) {
  //     // Remove the continue parameter and redirect
  //     const newUrl = window.location.pathname + window.location.hash;
  //     window.history.replaceState({}, '', newUrl);

  //     // Navigate to dashboard or appropriate page
  //     navigate('/dashboard');
  //   }
  // }, [location, navigate]);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* OAUTH-DIRECT-FLOW */}
          <Route path="/" element={<AuthLogin />} />
          <Route path='/dashboard' element={<Dashboard />} />


          {/* OAUTH2-FLOW */}
          {/* <Route path="/" element={<OauthLoginForm />} /> */}
          {/* <Route path='/callback' element={<CallBack />} /> */}
          {/* <Route path='/userlogin' element={<TraditionalLoginForm />} />          */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
