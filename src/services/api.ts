import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
  };
  data?: {
    token?: string;
    user?: {
      id?: string;
      email?: string;
      name?: string;
      role?: string;
    };
  };
  // Allow any additional properties
  [key: string]: unknown;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Dashboard data types
export interface DashboardMetric {
  title: string;
  value: string | number;
  iconType: string;
}

export interface DashboardResponse {
  success?: boolean;
  message?: string;
  data?: {
    activeTenders?: number;
    deactiveTenders?: number;
    registration?: number;
    earnMoneyDeposit?: number;
    gstCollection?: number;
    totalTenderFee?: number;
    metrics?: DashboardMetric[];
  };
  [key: string]: unknown;
}

// Logout response interface
export interface LogoutResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

// Tender API types
export interface CreateTenderRequest {
  tender: {
    title: string;
    description: string;
    budget: number;
    deposit: number;
    tender_fee: number;
    status: string;
    open_date: string;
    close_date: string;
    contact_info: string;
    gst_number: string;
    tender_file?: string;
    supporting_docs?: string;
    department_id: number;
  };
}

export interface CreateTenderResponse {
  success?: boolean;
  message?: string;
  data?: {
    tender?: {
      id?: number;
      title?: string;
      description?: string;
      budget?: number;
      deposit?: number;
      tender_fee?: number;
      status?: string;
      open_date?: string;
      close_date?: string;
      contact_info?: string;
      gst_number?: string;
      tender_file?: string;
      supporting_docs?: string;
      department_id?: number;
    };
  };
  [key: string]: unknown;
}

// Get all tenders types
export interface Tender {
  id: number;
  title: string;
  description?: string;
  budget: number;
  deposit: number;
  tender_fee: number;
  status: string;
  open_date: string;
  close_date: string;
  contact_info?: string;
  gst_number?: string;
  tender_file?: string;
  supporting_docs?: string;
  department_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GetTendersResponse {
  success?: boolean;
  message?: string;
  data?: {
    tenders?: Tender[];
    total?: number;
    page?: number;
    limit?: number;
  };
  [key: string]: unknown;
}

// Auth API methods
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Login failed',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Login failed',
        status: 500,
      } as ApiError;
    }
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Logout failed',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Logout failed',
        status: 500,
      } as ApiError;
    }
  },
};

// Dashboard API methods
export const dashboardAPI = {
  getDashboardData: async (): Promise<DashboardResponse> => {
    try {
      const response = await api.get('/dashboard/dashboard');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Failed to fetch dashboard data',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Failed to fetch dashboard data',
        status: 500,
      } as ApiError;
    }
  },
};

// Tender API methods
export const tenderAPI = {
  createTender: async (tenderData: CreateTenderRequest): Promise<CreateTenderResponse> => {
    try {
      const response = await api.post('/tender/tenders', tenderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Failed to create tender',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Failed to create tender',
        status: 500,
      } as ApiError;
    }
  },

  getAllTenders: async (): Promise<GetTendersResponse> => {
    try {
      const response = await api.get('/tender/tenders');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Failed to fetch tenders',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Failed to fetch tenders',
        status: 500,
      } as ApiError;
    }
  },

  updateTender: async (id: number, tenderData: CreateTenderRequest): Promise<CreateTenderResponse> => {
    try {
      const response = await api.put(`/tender/tenders/${id}`, tenderData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Failed to update tender',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Failed to update tender',
        status: 500,
      } as ApiError;
    }
  },

  deleteTender: async (id: number): Promise<{ success?: boolean; message?: string }> => {
    try {
      const response = await api.delete(`/tender/tenders/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || 'Failed to delete tender',
          status: error.response?.status,
        } as ApiError;
      }
      throw {
        message: 'Failed to delete tender',
        status: 500,
      } as ApiError;
    }
  },
};

export default api; 