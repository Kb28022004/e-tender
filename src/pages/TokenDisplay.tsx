import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import TokenDisplay from "@/components/TokenDisplay";

const TokenDisplayPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Token Display Content */}
        <main className="flex-1 p-8">
          <TokenDisplay />
        </main>
      </div>
    </div>
  );
};

export default TokenDisplayPage;
