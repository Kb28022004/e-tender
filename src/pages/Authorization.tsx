import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import AuthorizationContent from "../components/AuthorizationContent";

const Authorization = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Authorization Content */}
        <main className="flex-1 p-8">
          <AuthorizationContent />
        </main>
      </div>
    </div>
  );
};

export default Authorization;
