import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/Login-page";
import SignupPage from "./components/signup";

import Navbar from "./components/navbar";
import { AuthRedirectRoute, ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/home-page";
import GeneratePage from "./pages/generate-page";
import ProfilePage from "./pages/profile-page";
import StoryPage from "./pages/story-page";

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
