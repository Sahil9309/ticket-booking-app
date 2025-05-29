import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      console.error('Registration failed:', e);
      alert('Registration failed. Please try again later');
    }
  }

 return (
  <div className="py-12 px-4 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
      <h1 className="text-3xl font-semibold text-center text-blue-900 mb-6">Register</h1>

      {/* Optional error message */}
      <div className="text-red-500 text-center mb-4">
        {/* Add error handling display here if needed */}
      </div>

      <form onSubmit={registerUser} className="space-y-5">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="w-full border border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full border border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full border border-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 transition-colors text-white py-3 rounded-xl font-semibold cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="text-center mt-6 text-gray-500">
        Already a user?{" "}
        <Link className="underline text-blue-800 font-medium" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  </div>
);
}