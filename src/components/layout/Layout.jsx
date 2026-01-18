import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect } from "react";
import CallDetailModal from "../shared/CallDetailModal";
import { useUI } from "../../context/UIContext";
import { useSelector } from "react-redux";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode, selectedCall, handleCloseModal } = useUI();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated and trying to access protected routes
  useEffect(() => {
    const publicRoutes = ['/login', '/signup'];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    
    // If user is not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      navigate('/login');
    }
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (isAuthenticated && isPublicRoute) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Updated title mapping to reflect new terminology
  const getTitle = (pathname) => {
    const titleMap = {
      "/": "Dashboard",
      "/dashboard": "Dashboard",
      "/agents": "Agent Models",
      "/live-calls": "Live Calls",
      "/call-logs": "Call Logs",
      "/analytics": "Analytics",
      "/conversations": "Conversations",
      "/knowledgebase": "Knowledgebase",
      "/usage-billing": "Usage & Billing",
      "/api-keys": "API Keys",
      "/security": "Security",
      "/settings": "Settings"
    };
    
    return titleMap[pathname] || pathname.replace("/", "").replace("-", " ") || "Dashboard";
  };

  const headerTitle = getTitle(location.pathname);

  // Apply dark mode to <html> when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Don't show layout for auth pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return <Outlet />;
  }

  return (
    <div className="font-sans">
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            title={headerTitle}
            isDarkMode={isDarkMode}
            setIsDarkMode={toggleDarkMode}
          />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>  

        {/* Call Modal */}
        <CallDetailModal
          call={selectedCall}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}