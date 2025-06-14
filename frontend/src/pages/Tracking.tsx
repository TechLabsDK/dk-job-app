import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/group_positive_ppl.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';
import useLogout from '../hooks/useLogout';

type Application = {
  position: string;
  score: number;
};

export default function TrakingDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');
  const handleLogout = useLogout();

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in.');
        return;
      }

      try {
        const res = await fetch('http://localhost:4000/applications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to fetch applications');
        }

        const data = await res.json();
        setApplications(data.applications || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute top-6 left-8 text-3xl font-normal">BetterApply</div>

      {/* Dropdown */}
      <div className="absolute top-6 right-8 z-50 text-2xl font-medium">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 cursor-pointer"
        >
          More
          <img src={dropdownArrow} alt="arrow" className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]" />
        </button>
        {dropdownOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-md absolute right-0 w-40 py-2 text-base text-black">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-40 mx-60 flex flex-col items-start">
        <div className="mt-10">
          <h2 className="text-2xl md:text-5xl font-bold">You did a great job by keep trying!</h2>
          <p className="text-5xl mt-2">Here is your application tracking:</p>
        </div>

        <div className="mt-30 w-full max-w-4xl">
          <div className="grid grid-cols-2 text-4xl font-bold border-b pb-4 mb-7 gap-15">
            <div>Position</div>
            <div>Score</div>
          </div>

          {error && <p className="text-red-400 text-lg">{error}</p>}

          {applications.length > 0 ? (
            applications.map((app, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-20 items-center mb-5 text-black text-2xl"
              >
                <div className="bg-white rounded-full px-4 py-2">{app.position}</div>
                <div className="bg-white rounded-full px-4 py-2 text-center">{app.score}</div>
              </div>
            ))
          ) : (
            <p className="text-xl italic">No applications to show yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
