import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import RefundContent from "../components/RefundContent";

const Refund = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Refund Content */}
        <main className="flex-1 p-8">
          <RefundContent />
        </main>
      </div>
    </div>
  );
};

export default Refund;
