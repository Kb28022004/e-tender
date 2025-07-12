import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateTender from "../components/CreateTender";
import EditViewTender from "../components/EditViewTender";
import TenderModal from "../components/TenderModal";
import { Tender } from "@/services/api";

const ETender = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("create");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "view">("view");
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [onRefresh, setOnRefresh] = useState<(() => void) | null>(null);
  
  useEffect(() => {
    // Set the active tab based on the current route
    if (location.pathname.includes("/create")) {
      setActiveTab("create");
    } else if (location.pathname.includes("/edit-view")) {
      setActiveTab("edit-view");
    }
  }, [location.pathname]);
  
  const handleOpenModal = (type: "edit" | "view", tender: Tender, refreshCallback?: () => void) => {
    setModalType(type);
    setSelectedTender(tender);
    setOnRefresh(() => refreshCallback || null);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTender(null);
    setOnRefresh(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* E-Tender Content */}
        <main className="flex-1 p-8">
          {activeTab === "create" ? (
            <CreateTender />
          ) : (
            <EditViewTender onOpenModal={handleOpenModal} />
          )}
          
          {/* Modal for Edit/View Tender */}
          {showModal && selectedTender && (
            <TenderModal 
              isOpen={showModal} 
              onClose={handleCloseModal} 
              type={modalType} 
              tender={selectedTender}
              onRefresh={onRefresh}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ETender;
