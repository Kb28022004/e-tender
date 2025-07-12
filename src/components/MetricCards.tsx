
import { 
  FileText, 
  FileX, 
  UserPlus, 
  DollarSign, 
  Receipt, 
  CreditCard,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { dashboardAPI, type DashboardResponse, type ApiError } from "@/services/api";

// Default/fallback metrics
const defaultMetrics = [
  {
    title: "Active Tenders",
    value: "0",
    icon: FileText,
    iconColor: "#FF914D"
  },
  {
    title: "Deactive Tenders", 
    value: "0",
    icon: FileX,
    iconColor: "#FF914D"
  },
  {
    title: "Registration",
    value: "0", 
    icon: UserPlus,
    iconColor: "#FF914D"
  },
  {
    title: "Earn Money Deposit",
    value: "₹0",
    icon: DollarSign,
    iconColor: "#FF914D"
  },
  {
    title: "GST Collection",
    value: "₹0",
    icon: Receipt,
    iconColor: "#FF914D"
  },
  {
    title: "Total Tender Fee",
    value: "₹0",
    icon: CreditCard,
    iconColor: "#FF914D"
  }
];

const MetricCards = () => {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await dashboardAPI.getDashboardData();
        console.log('Dashboard API response:', response);

        // Check if the API response has data
        if (response.data) {
          const apiData = response.data;
          
          // Update metrics with API data or fallback to default values
          const updatedMetrics = [
            {
              title: "Active Tenders",
              value: apiData.activeTenders?.toString() || "0",
              icon: FileText,
              iconColor: "#FF914D"
            },
            {
              title: "Deactive Tenders", 
              value: apiData.deactiveTenders?.toString() || "0",
              icon: FileX,
              iconColor: "#FF914D"
            },
            {
              title: "Registration",
              value: apiData.registration?.toString() || "0", 
              icon: UserPlus,
              iconColor: "#FF914D"
            },
            {
              title: "Earn Money Deposit",
              value: apiData.earnMoneyDeposit ? `₹${apiData.earnMoneyDeposit.toLocaleString()}` : "₹0",
              icon: DollarSign,
              iconColor: "#FF914D"
            },
            {
              title: "GST Collection",
              value: apiData.gstCollection ? `₹${apiData.gstCollection.toLocaleString()}` : "₹0",
              icon: Receipt,
              iconColor: "#FF914D"
            },
            {
              title: "Total Tender Fee",
              value: apiData.totalTenderFee ? `₹${apiData.totalTenderFee.toLocaleString()}` : "₹0",
              icon: CreditCard,
              iconColor: "#FF914D"
            }
          ];
          
          setMetrics(updatedMetrics);
        }
      } catch (err) {
        console.error('Dashboard API error:', err);
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to fetch dashboard data');
        // Keep default metrics on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700 font-medium mb-2">Failed to load dashboard data</p>
        <p className="text-red-600 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.iconColor}20` }}>
              <metric.icon className="w-6 h-6" style={{ color: metric.iconColor }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
