import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dropdownArrow from '../assets/dropdown-arrow-black.svg';
import useLogout from '../hooks/useLogout';

export default function Prediction1() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const handleLogout = useLogout();

  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState<string>('');
  const [tool, setTool] = useState<string>('');
  const [educationLevel, setEducationLevel] = useState('');
  const [major, setMajor] = useState('');

  const handleNext = () => {
    navigate('/prediction2', { state: { jobRole, location, skill, tool, educationLevel, major } });
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center text-black">
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
        <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 col-span-full">Drop your information here</h2>

          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Job Role</option>
            <option>Backend</option>
            <option>Data</option>
            <option>Design</option>
            <option>Frontend</option>
            <option>Fullstack</option>
            <option>Other</option>
            <option>Non Tech</option>
            <option>IT Other</option>
            <option>Tech Other</option>
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Location of the Role</option>
            <option>Aarhus</option>
            <option>Copenhagen</option>
            <option>Hillerod</option>
            <option>Odense</option>
          </select>

          <select value={skill} onChange={(e) => setSkill(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Your Skills</option>
            <option>Python</option>
            <option>Insurance</option>
            <option>Quick Learner</option>
            <option>API Development</option>
            <option>SQL</option>
            <option>Vue</option>
            <option>Machine Learning</option>
            <option>Guidewire</option>
            <option>Java</option>
            <option>HTML</option>
            <option>Excel</option>
            <option>UX Design</option>
            <option>Figma</option>
            <option>Git</option>
            <option>Communication</option>
            <option>Data Analysis</option>
            <option>React</option>
            <option>JavaScript</option>
            {/* add more as needed */}
          </select>

          <select value={tool} onChange={(e) => setTool(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Your Tools</option>
            <option>Python</option>
            <option>Jupyter</option>
            <option>SQL</option>
            <option>Postman</option>
            <option>Tableau</option>
            <option>Power BI</option>
            <option>React</option>
            <option>VS Code</option>
            <option>Docker</option>
            <option>Figma</option>
            {/* add more as needed */}
          </select>

          <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Education Level</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </select>

          <select value={major} onChange={(e) => setMajor(e.target.value)} className="bg-gray-100 rounded-xl px-4 py-3 italic text-xl" required>
            <option disabled selected value="">Major</option>
            <option>IT</option>
            <option>Science</option>
            <option>Business</option>
            <option>Art</option>
            <option>Humanity</option>
            <option>Other</option>
          </select>
        </form>

        <div className="w-full flex justify-end mt-8 px-30">
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#232A2B] text-white text-3xl font-medium px-10 py-5 rounded-full flex items-center gap-3 hover:bg-gray-800 transition cursor-pointer"
          >
            Next <span className="pl-2 text-4xl">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}