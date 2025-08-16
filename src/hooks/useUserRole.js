import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/users?email=${user.email}`)
        .then((res) => {
          setUserRole(res.data.role);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch user role', err);
          setError(err);
          setLoading(false);
        });
    } else {
      // No user yet, stop loading
      setLoading(false);
    }
  }, [user]);

  return { userRole, loading, error };
};

export default useUserRole;
 