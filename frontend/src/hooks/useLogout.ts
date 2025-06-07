import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
}
