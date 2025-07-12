import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import ApprovalConfirmationContent from "@/components/ApprovalConfirmation";

const ApprovalConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Approval Confirmation Content */}
        <main className="flex-1 p-8">
          <ApprovalConfirmationContent />
        </main>
      </div>
    </div>
  );
};

export default ApprovalConfirmationPage;
