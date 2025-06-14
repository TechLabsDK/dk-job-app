import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dropdownArrow from '../assets/dropdown-arrow-black.svg';
import useLogout from '../hooks/useLogout';

export default function PredictionForm() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const handleLogout = useLogout();

  const [jobRole, setJobRole] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [skill, setSkill] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [visaStatus, setVisaStatus] = useState<string>('');
  const [error, setError] = useState<string>('');


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
          language,
          visaStatus,
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
    <div className="relative w-full h-screen bg-cover bg-center text-black">
      {/* Header */}
      <div className="absolute top-6 left-8 text-3xl font-normal">BetterApply</div>

      {/* Dropdown */}
      <div className="absolute top-6 right-8 z-50 text-2xl font-medium">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 cursor-pointer"
        >
          More <img src={dropdownArrow} alt="arrow" className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]" />
        </button>
        {dropdownOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-md absolute right-0 w-40 py-2 text-base">
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

      {/* Main content */}
      <div className="pt-60 px-12 flex flex-col lg:flex-row justify-between items-center lg:items-start">
        {/* Left: Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 w-full max-w-md ml-70"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Put your information here!
          </h2>

          <input
            type="text"
            placeholder="Job Role"
            required
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl"
          />

          <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" 
              required
          >
            <option disabled selected value="">Location</option>
            <option>Denmark</option>
            <option>Germany</option>
            <option>Sweden</option>
          </select>

          <select 
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" 
              required
          >
            <option disabled selected value="">Skills</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Data Science</option>
          </select>

          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl"
          />

          <select 
              value={visaStatus}
              onChange={(e) => setVisaStatus(e.target.value)}
              className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" 
              required
          >
            <option disabled selected value="">Visa Status</option>
            <option>EU Citizen</option>
            <option>Non-EU, Work Visa</option>
            <option>Student Visa</option>
          </select>
        </form>

        {/* Right: Submit Button triggers the form */}
        <div className="mt-10 lg:mt-70 mr-50 pr-70">
          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            className="bg-[#232A2B] text-white text-4xl font-medium px-10 py-5 rounded-full flex items-center gap-3 hover:bg-gray-800 transition cursor-pointer"
          >
            See Scores <span className="pl-2 text-4xl">→</span>
          </button>
          {error && <p className="text-red-500 mt-4 text-lg text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
