import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dropdownArrow from '../assets/dropdown-arrow.svg';
import useLogout from '../hooks/useLogout';
import { useLocation, useNavigate } from 'react-router-dom';


type PredictionResult = {
  probability: number;
  prediction: string;
};

export default function ResultsPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [probability, setProbability] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<string>('');

  const handleLogout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state as PredictionResult | null;

  useEffect(() => {
    if (!result || typeof result.probability !== 'number') {
      // Redirect if no valid result
      navigate('/prediction');
      return;
    }

    setProbability(result.probability);
    setPrediction(result.prediction || '');
  }, [result, navigate]);


  const email = localStorage.getItem('email');
  const username = email ? email.split('@')[0] : 'there';


  return (
    <div className="min-h-screen bg-[#232A2B] text-white relative px-8 py-12">
      {/* Header */}
      <div className="absolute top-6 left-8 text-3xl font-normal">
        BetterApply
      </div>

      {/* Dropdown Button */}
      <div className="absolute top-6 right-8 z-50 text-white text-2xl font-medium">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 cursor-pointer"
        >
          More
          <img
            src={dropdownArrow}
            alt="arrow"
            className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]"
          />
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
      <div className="pt-50 mx-20 flex flex-col lg:flex-row justify-between items-start">
        {/* Left: Probability */}
        <div className="pt-10 pl-70 flex flex-col items-start gap-8 lg:w-1/2">
          <h2 className="text-5xl font-bold leading-snug">
            Hey, {username}! <br />
            This is your result:
          </h2>
          <div className="text-[10rem] font-bold leading-none mt-2">
            {probability !== null ? probability : '--'}
          </div>
          <div className="italic text-2xl mt-2">out of 100</div>
        </div>

        {/* Right: Prediction */}
        <div className="pt-25 flex flex-col items-center gap-15 lg:w-1/2">
          <h3 className="text-3xl font-semibold">It is recommended to:</h3>
          <div className="bg-white text-black px-10 py-8 rounded-[3rem] w-full max-w-xl">
            <p className="text-2xl">{prediction || 'Loading prediction...'}</p>
          </div>
          <div className="pt-40 pl-90">
           <Link
            to="/tracking"
            className="bg-transparent border border-white text-white text-4xl px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white hover:text-black transition"
          >
            Track your progress here <span className="text-4xl">→</span>
          </Link> 
          </div>
          
        </div>
      </div>
    </div>
  );
}
