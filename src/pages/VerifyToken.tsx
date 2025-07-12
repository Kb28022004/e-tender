import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import VerifyToken from "@/components/VerifyToken";

const VerifyTokenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Verify Token Content */}
        <main className="flex-1 p-8">
          <VerifyToken />
        </main>
      </div>
    </div>
  );
};

export default VerifyTokenPage;
