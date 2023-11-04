import { useEffect, useState } from 'react';
import config from '../utils/config';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const logout = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/user/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.status === 200) {
        setToken(null);
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        window.location.href = '/login'
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  return { token, isAuthenticated, logout };
};

export default useAuth;
