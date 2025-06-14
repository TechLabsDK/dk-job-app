import { Link } from 'react-router-dom';
import background from '../assets/group_positive_ppl.svg';
import dropdownArrow from '../assets/dropdown-arrow.svg';

import { useState } from 'react';


export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute top-6 left-8 text-3xl font-normal">
        BetterApply
      </div>
      <Link
        to="/login"
        className="absolute top-6 right-8 z-20 text-white text-2xl font-medium flex items-center transition duration-150 cursor-pointer"
      >
        Login
        <img src={dropdownArrow} alt="arrow" className="ml-2 w-9 h-9 object-contain self-end relative top-[3px]" />
      </Link>

      <div className="relative z-10 flex flex-col pt-80 h-full px-8 md:px-40">
        {/* Heading and Paragraph */}
        <div className="pl-6 md:pl-30">
          <h1 className="text-3xl md:text-6xl font-bold max-w-2xl">
            For internationals, <br /> chasing opportunities
          </h1>
          <p className="mt-5 text-3xl max-w-sm">
            Predict your chances, get recommendation, and track every step of your job hunt!
          </p>
        </div>

        {/* Start Now Button */}
        < StartNowButton />
      </div>
    </div>
  );
}


function StartNowButton() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('Submitted at:', email);

    try {
      const res = await fetch('http://localhost:4000/auth/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to request code');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="mt-16 ml-auto mr-4 md:mr-20">
      {showInput ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white text-black rounded-full px-4 py-3 w-[300px] md:w-[400px] transition-all duration-1500"
        >
          {submitted ? (
            <span className="mx-auto text-2xl">Get login code at your email!</span>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-grow bg-transparent outline-none text-xl pl-2"
              />
              <button type="submit" className="ml-3 text-3xl cursor-pointer">→</button>
            </>
          )}
        </form>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="px-6 py-3 bg-gray-800 text-white rounded-full text-4xl flex items-center w-fit hover:bg-gray-700 transition duration-200 cursor-pointer"
        >
          Start now
          <span className="ml-6 text-4xl">→</span>
        </button>
      )}

      {/* Error message (if any) */}
      {error && (
        <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}

