
import { Calendar } from "lucide-react";

const GreetingSection = () => {
  return (
    <div className="bg-gradient-to-r from-admin-blue-700 to-admin-blue-800 rounded-2xl p-8 text-white mb-8 relative overflow-hidden animate-fade-in">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-32 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-20 right-40 w-2 h-2 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl text-blue-100 mb-2">Good Morning,</h2>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Arjun Moorthi</h1>
          <p className="text-blue-100">Have a nice day at work</p>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">May 30, 2024</span>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden lg:block">
          <div className="w-48 h-32 flex items-center justify-center">
            <img 
              src="/pana.png" 
              alt="Welcome Illustration" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingSection;
