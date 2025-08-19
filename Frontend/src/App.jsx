import { Route, Routes, Navigate } from 'react-router-dom'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast';

import LogIn from './components/Login';
import { useAuth } from "./Context/AuthProvider";
import DonorList from './components/DonorList';


function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div>
        <Routes>
          <Route path="/register" element={authUser ? <Navigate to="/donor_list" /> : <Register />} />
          <Route path="/" element={authUser ? <Navigate to="/donor_list" /> : <LogIn />} />
          <Route path="/donor_list" element={authUser ? <DonorList /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster />
    </>
  )
}

export default App