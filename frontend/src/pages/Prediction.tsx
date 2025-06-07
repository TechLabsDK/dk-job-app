import { Link } from 'react-router-dom';
import dropdownArrow from '../assets/dropdown-arrow-black.svg';
import useLogout from '../hooks/useLogout';


import { useState } from 'react';

export default function PredictionForm() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = useLogout();

  return (
    <div className="relative w-full h-screen bg-cover bg-center text-black">
      {/* Header */}
      <div className="absolute top-6 left-8 text-3xl font-normal">
        BetterApply
      </div>
      {/* Dropdown button */}
      <div className="absolute top-6 right-8 z-50 text-2xl font-medium">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 cursor-pointer"
        >
          More <img src={dropdownArrow} alt="arrow" className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]" />
        </button>

        {/* Dropdown menu */}
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
        <form className="flex flex-col space-y-6 w-full max-w-md ml-70">
          <h2 className="text-4xl font-bold text-center mb-12">
            Put your information here!
          </h2>

          {/* Job Role */}
          <input
            type="text"
            placeholder="Job Role"
            className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl"
          />

          {/* Location */}
          <select className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl">
            <option disabled selected>Location</option>
            <option>Denmark</option>
            <option>Germany</option>
            <option>Sweden</option>
          </select>

          {/* Skills */}
          <select className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl">
            <option disabled selected>Skills</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Data Science</option>
          </select>

          {/* Language */}
          <input
            type="text"
            placeholder="Language"
            className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl"
          />

          {/* Visa Status */}
          <select className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl">
            <option disabled selected>Visa Status</option>
            <option>EU Citizen</option>
            <option>Non-EU, Work Visa</option>
            <option>Student Visa</option>
          </select>
        </form>

        {/* Right: CTA Button */}
        <div className="mt-10 lg:mt-70 mr-50 pr-70">
          <Link
            to="/results"
            className="bg-[#232A2B] text-white text-4xl font-medium px-10 py-5 rounded-full flex items-center gap-3 hover:bg-gray-800 transition"
          >
            See Scores <span className="pl-2 text-4xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
