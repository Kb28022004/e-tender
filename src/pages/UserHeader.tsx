import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  Globe,
  Download,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const UserHeader = ({isDropdownOpen,setIsDropdownOpen}) => {

  const user = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      // Call logout API
      console.log("Calling logout API...");
      const response = await authAPI.logout();
      console.log("Logout API response:", response);

      if (response.success) {
        console.log("Logout successful:", response.message);
      }
    } catch (error) {
      // Log error but don't prevent logout
      console.error("Logout API error:", error);
    } finally {
      // Always clear localStorage and navigate (for security)
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      // Navigate to login page
      navigate("/login");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - can be empty or have additional branding */}
              <div></div>

              <div className="flex items-center space-x-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 w-80 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                  </Button>
                </div>

                {/* User Profile */}
                <div className="relative">
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-700 font-medium">
                        {user?.name || "User"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          Rahul Chandani
                        </div>
                        <div className="text-xs text-gray-500">User</div>
                      </div>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          // Add profile functionality here if needed
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
  )
}

export default UserHeader