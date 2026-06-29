import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";
import RecruiterRoute from "./routes/RecruiterRoute";
import CandidateRoute from "./routes/CandidateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";
import EditProfile from "./pages/EditProfile";
import CandidateProfile from "./pages/CandidateProfile";



function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route
            path="/applications"
            element={
              <CandidateRoute>
                <MyApplications />
              </CandidateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />


          <Route
            path="/create-job"
            element={
              <RecruiterRoute>
                <CreateJob />
              </RecruiterRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
                <RecruiterRoute>
                    <MyJobs />
                </RecruiterRoute>
            }
          />

          <Route
            path="/jobs/edit/:id"
            element={
                <RecruiterRoute>
                    <EditJob />
                </RecruiterRoute>
            }
          />

          <Route
              path="/jobs/:id/applicants"
              element={<Applicants />}
          />

          <Route
              path="/profile/edit"
              element={
                  <ProtectedRoute>
                      <EditProfile />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/candidate/:id"
              element={
                  <ProtectedRoute>
                      <CandidateProfile />
                  </ProtectedRoute>
              }
          />

        </Routes>
        
      </main>

      <Footer />
    </div>

  );
}

export default App;