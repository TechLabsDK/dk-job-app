import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }

      // Store the session
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/prediction');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#232A2B] text-white flex flex-col px-8 py-12">
      {/* Logo */}
      <div className="absolute top-6 left-8 text-3xl font-normal">BetterApply</div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center flex-1 space-y-6 w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
          className="italic w-[90%] max-w-md px-6 py-3 rounded-xl text-black text-xl bg-white placeholder-italic placeholder-gray-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          className="italic w-[90%] max-w-md px-6 py-3 rounded-xl text-black text-xl bg-white placeholder-italic placeholder-gray-500"
        />
        {/* Forgot password link */}
        <div className="w-full max-w-md text-right">
          <Link to="/forgot-password" className="italic underline text-lg">
            forgot password?
          </Link>
        </div>
        {/* Login button */}
        <button
          type="submit"
          className="mt-10 text-4xl hover:text-gray-300 transition"
        >
          Login
        </button>

        {error && (
          <p className="text-red-400 text-lg text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
