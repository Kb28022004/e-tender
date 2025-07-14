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
import Logo from "@/components/Logo";

const UserSidebar = () => {
  return (
   <div
          className="w-60 flex flex-col"
          style={{ backgroundColor: "#194E7E" }}
        >
          {/* Logo Section */}
          <div className="p-6 border-b border-opacity-30 border-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5" style={{ color: "#194E7E" }} />
              </div>
              <Logo width={120} height={21} className="h-5" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-white bg-white bg-opacity-20 rounded-lg p-3">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Tender</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default UserSidebar