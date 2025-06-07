import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  return () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    localStorage.clear(); // clears everything at once

    navigate('/login');
  };
}
