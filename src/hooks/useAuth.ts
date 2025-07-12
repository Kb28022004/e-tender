import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token) {
        setIsAuthenticated(true);
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: Record<string, unknown>) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Call logout API
      console.log('Calling logout API...');
      const response = await authAPI.logout();
      console.log('Logout API response:', response);
      
      if (response.success) {
        console.log('Logout successful:', response.message);
      }
    } catch (error) {
      // Log error but don't prevent logout
      console.error('Logout API error:', error);
    } finally {
      // Always clear localStorage and navigate (for security)
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    }
  };

  const requireAuth = () => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    requireAuth
  };
}; 