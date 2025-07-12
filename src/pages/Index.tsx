
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import GreetingSection from "@/components/GreetingSection";
import MetricCards from "@/components/MetricCards";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Check if user is authenticated before rendering
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#EEF5FF' }}>
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {/* Greeting Section */}
          <GreetingSection />
          
          {/* Metric Cards */}
          <MetricCards />
        </main>
      </div>
    </div>
  );
};

export default Index;
