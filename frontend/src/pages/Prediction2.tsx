import { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import dropdownArrow from '../assets/dropdown-arrow-black.svg';
import useLogout from '../hooks/useLogout';

export default function Prediction2() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const locationHook = useLocation();
  const handleLogout = useLogout();

  const [visaStatus, setVisaStatus] = useState('');
  const [danishProficiency, setDanishProficiency] = useState('');
  const [englishProficiency, setEnglishProficiency] = useState('');
  const [localExperience, setLocalExperience] = useState('');
  const [liveInDenmark, setLiveInDenmark] = useState('');
  const [error, setError] = useState('');

  const { jobRole, location, skill, tool, educationLevel, major } = locationHook.state || {};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobRole,
          location,
          skill,
          tool,
          educationLevel,
          major,
          visaStatus,
          danishProficiency,
          englishProficiency,
          localExperience,
          liveInDenmark,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Prediction failed');
      }

      const data = await res.json();
      console.log('Prediction result:', data);
      navigate('/results', { state: data });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center text-black">
      <div className="absolute top-6 left-8 text-3xl font-normal">BetterApply</div>

      <div className="absolute top-6 right-8 z-50 text-2xl font-medium">
        <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1 cursor-pointer">
          More <img src={dropdownArrow} alt="arrow" className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]" />
        </button>
        {dropdownOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-md absolute right-0 w-40 py-2 text-base">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
          </div>
        )}
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 col-span-full">Drop your information here</h2>

          <select value={danishProficiency} onChange={(e) => setDanishProficiency(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled value="">Danish Proficiency</option>
            {[0, 1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select>

          <select value={englishProficiency} onChange={(e) => setEnglishProficiency(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled value="">English Proficiency</option>
            {[0, 1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select>

          <select value={localExperience} onChange={(e) => setLocalExperience(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled value="">Local Work Experience</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select value={visaStatus} onChange={(e) => setVisaStatus(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled value="">Visa Status</option>
            <option>Job Seeker Visa</option>
            <option>Residence Permit</option>
            <option>Student Visa</option>
          </select>

          <div className="col-span-full flex items-center gap-15 text-xl italic mt-4">
            <span className="whitespace-nowrap">Do you currently live in Denmark?</span>
            <label className="flex items-center gap-3 text-xl">
                <input
                type="radio"
                value="Yes"
                checked={liveInDenmark === 'Yes'}
                onChange={(e) => setLiveInDenmark(e.target.value)}
                className="w-5 h-5 appearance-none border-2 border-black rounded-sm checked:bg-black checked:border-black"
                />
                Yes
            </label>
            <label className="flex items-center gap-3 text-xl">
                <input
                type="radio"
                value="No"
                checked={liveInDenmark === 'No'}
                onChange={(e) => setLiveInDenmark(e.target.value)}
                className="w-5 h-5 appearance-none border-2 border-black rounded-sm checked:bg-black checked:border-black"
                />
                No
            </label>
        </div>


          {error && <p className="text-red-500 mt-4 text-lg col-span-full text-center">{error}</p>}
        </form>

        <div className="w-full flex justify-end mt-8 gap-7 px-30">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-black text-3xl font-medium px-10 py-5 rounded-full hover:bg-gray-400 transition cursor-pointer"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            className="bg-[#232A2B] text-white text-3xl font-medium px-10 py-5 rounded-full flex items-center gap-3 hover:bg-gray-800 transition cursor-pointer"
          >
            Score <span className="pl-2 text-3xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
