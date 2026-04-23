import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import ManageSkill from './Pages/ManageSkill'
import ManageTimeline from './Pages/ManageTimeline'
import ManageProject from './Pages/ManageProject'
import ViewProject from './Pages/ViewProject'
import UpadeteProjects from './Pages/UpadeteProjects'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { getUser } from './Store/slices/UserSlice'
import { getAllMessages } from './Store/slices/messegesSlice'
import { getAllTimeline } from './Store/slices/timelineSlice'
import { getAllSkills } from './Store/slices/addSkillSlice'
import {getAllSoftwareApplications} from './Store/slices/softwareApplicationSlice'
import { getAllProjects } from './Store/slices/ProjectSlice'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills())
     dispatch(getAllSoftwareApplications());
     dispatch(getAllProjects());
  }, [])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/password/forget' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />

        <Route path='/manage/skills' element={<ManageSkill />} />
        <Route path='/manage/timeline' element={<ManageTimeline />} />
        <Route path='/manage/projects' element={<ManageProject />} />

        <Route path='/view/project/:id' element={<ViewProject />} />
        <Route path='/update/project/:id' element={<UpadeteProjects />} />
      </Routes>

      <ToastContainer position='bottom-right' theme='dark' />
    </Router>
  )
}

export default App
