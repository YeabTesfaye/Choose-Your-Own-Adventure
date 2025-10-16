import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./components/home-page";
import LoginPage from "./components/Login-page";
import SignupPage from "./components/signup";
import GeneratePage from "./components/generate-page";
import ProfilePage from "./components/profile-page";
import Navbar from "./components/navbar";
import { AuthRedirectRoute, ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import StoryPage from "./components/story-page";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <AuthRedirectRoute>
                <LoginPage />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirectRoute>
                <SignupPage />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <GeneratePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <ProtectedRoute>
                <StoryPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
