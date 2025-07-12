
import { 
  LayoutDashboard, 
  Trophy, 
  FileText, 
  RefreshCw, 
  Shield,
  Globe,
  ChevronDown,
  Plus,
  Edit
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  },
  {
    title: "Winner Declaration",
    icon: Trophy,
    path: "/winner-declaration"
  },
  {
    title: "E-Tender",
    icon: FileText,
    path: "/e-tender",
    hasSubmenu: true,
    submenu: [
      {
        title: "Create Tender",
        icon: Plus,
        path: "/e-tender/create"
      },
      {
        title: "Edit / View Tender",
        icon: Edit,
        path: "/e-tender/edit-view"
      }
    ]
  },
  {
    title: "Refund",
    icon: RefreshCw,
    path: "/refund"
  },
  {
    title: "Authorization",
    icon: Shield,
    path: "/authorization"
  }
];

const AdminSidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-admin-blue-800 to-admin-blue-900 text-white flex flex-col animate-slide-in">
      {/* Logo Section */}
      <div className="p-6 border-b border-admin-blue-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
            <Globe className="w-5 h-5 text-admin-blue-800" />
          </div>
          <Logo width={120} height={21} className="h-5" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.hasSubmenu ? (
                <div>
                  <div 
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-admin-blue-700 cursor-pointer ${
                      location.pathname.startsWith(item.path)
                        ? 'bg-admin-blue-700 shadow-lg' 
                        : 'hover:translate-x-1'
                    }`}
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMenus.includes(item.title) ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Submenu */}
                  {expandedMenus.includes(item.title) && item.submenu && (
                    <ul className="mt-1 ml-4 space-y-1 border-l border-admin-blue-700 pl-4">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.path}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-admin-blue-700 ${
                              location.pathname === subItem.path
                                ? 'bg-admin-blue-700 shadow-lg' 
                                : 'hover:translate-x-1'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{subItem.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-admin-blue-700 ${
                    location.pathname === item.path
                      ? 'bg-admin-blue-700 shadow-lg' 
                      : 'hover:translate-x-1'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-4">
        <div className="bg-admin-blue-700 rounded-xl p-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl"></div>
          <div className="relative z-10">
            <img 
              src="/Group (6).png" 
              alt="Help Support" 
              className="w-full h-auto max-w-32 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
