
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import WinnerDeclarationContent from "@/components/WinnerDeclarationContent";

const WinnerDeclaration = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Winner Declaration Content */}
        <main className="flex-1 p-8">
          <WinnerDeclarationContent />
        </main>
      </div>
    </div>
  );
};

export default WinnerDeclaration;
