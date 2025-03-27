
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import LoadingPage from "./pages/LoadingPage";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Subscribe from "./pages/Subscribe";
import Learn from "./pages/Learn";
import VideoPlayer from "./pages/VideoPlayer";
import AIHelp from "./pages/AIHelp";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Initial loading page */}
              <Route path="/index" element={<LoadingPage />} />
              
              {/* Public routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Auth required routes */}
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscribe" 
                element={
                  <ProtectedRoute>
                    <Subscribe />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected routes requiring subscription */}
              <Route 
                path="/learn" 
                element={
                  <ProtectedRoute requireSubscription requireOnboarding>
                    <Learn />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/video/:moduleId/:videoId" 
                element={
                  <ProtectedRoute requireSubscription requireOnboarding>
                    <VideoPlayer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-help" 
                element={
                  <ProtectedRoute requireSubscription requireOnboarding>
                    <AIHelp />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <ProtectedRoute requireSubscription requireOnboarding>
                    <Support />
                  </ProtectedRoute>
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
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
