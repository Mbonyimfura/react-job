import MainLayout from "./layouts/MainLayout"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage,{jobLoader} from './pages/JobPage';
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"
import { useState } from "react"
function App() {
  const [jobs, setJobs] = useState([]);
  //Add a new job
 const addJob = async(newJob) => {
   const res =  await fetch('api/jobs', { 
   method: 'POST',
   headers: {
    'Content-Type':'application/json'
   },
    body: JSON.stringify(newJob)
   })
   return;
 }

 // Delete a job
 const deleteJob = async (id) => {
  try {
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    setJobs(jobs.filter((job) => job.id !== id));
  } catch (error) {
    console.error('Failed to delete the job:', error);
  }
};
// Edit a job
const editJob = async (job) => {
  try {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    const data = await res.json();
    setJobs(jobs.map((job) => (job.id === data.id ? data : job)));  
  }
  catch (error) {
    console.error('Failed to update the job:', error);
  }
}

   return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
      <Route  index element={<HomePage/>}/>
      <Route  path="/jobs" element={<JobsPage/>}/>
      <Route  path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route  path="/edit-job/:id" element={<EditJobPage  updateJobSubmit={editJob}/>} loader={jobLoader}/>
      <Route  path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
