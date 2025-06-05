import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#232A2B] text-white flex flex-col px-8 py-12">
      {/* Logo */}
      <div className="absolute top-6 left-8 text-3xl font-normal">BetterApply</div>

      {/* Centered form container */}
      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        <input
          type="email"
          placeholder="email"
          className="italic w-[90%] max-w-md px-6 py-3 rounded-xl text-black text-xl bg-white placeholder-italic placeholder-gray-500c"
        />
        <input
          type="password"
          placeholder="password or code"
          className="italic w-[90%] max-w-md px-6 py-3 rounded-xl text-black text-xl bg-white placeholder-italic placeholder-gray-500"
        />

        {/* Forgot password link */}
        <div className="w-full max-w-md text-right">
          <Link to="/forgot-password" className="italic underline text-lg">
            forgot password?
          </Link>
        </div>

        {/* Login button */}
        <Link
          to="/dashboard"
          className="mt-18 text-4xl hover:text-gray-300 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
