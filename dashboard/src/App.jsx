
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProject from './pages/ManageProject';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import HomePage from './pages/HomePage';
import { getAllMessages } from './store/slices/massageSlice';
import { getAllSkills } from './store/slices/skillSlice';
import { getAllSoftwareApplication } from './store/slices/softwareApplicationSlice';
import { getAllProjects } from './store/slices/projectSlice';
import { getAllTimeline } from './store/slices/timelineSlice';


const App = () => {
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getUser());
  dispatch(getAllMessages());
  dispatch(getAllSkills());
  dispatch(getAllSoftwareApplication());
  dispatch(getAllProjects());
  dispatch(getAllTimeline());
  
},[]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/password/forgot" element={< ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/project" element={<ManageProject/>} />
        <Route path="/view/project/:id" element={<ViewProject/>} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
      </Routes> 
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  );
};

export default App;
