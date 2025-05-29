import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.js";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { email, password });
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      console.error('Error during login:', e); // Log the error for debugging
      alert('Login failed. Please check your credentials and try again.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
  <div className="py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
      <h1 className="text-3xl font-semibold text-center text-blue-900 mb-6">Login</h1>

      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 transition-colors text-white py-3 rounded-xl font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-6 text-gray-500">
        Don&apos;t have an account?{' '}
        <Link className="underline text-blue-800 font-medium" to={'/register'}>
          Register here
        </Link>
      </div>
    </div>
  </div>
);
}