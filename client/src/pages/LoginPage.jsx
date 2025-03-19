import {Link, Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/api/login',{email,password}); // Corrected API endpoint
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      setError(e.response?.data || 'Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
              <h1 className="text-4xl text-center mb-4">Login</h1>
              {error && <div className="text-red-500 text-center mb-4">{error}</div>}
              <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input type="email" 
              placeholder="email" 
              className="w-full border my-1 py-2 px-3 rounded-2xl" 
              value={email} 
              onChange={ev => setEmail(ev.target.value)} />
              <input type="password" 
              placeholder="password"
              className="w-full border my-1 py-2 px-3 rounded-2xl" 
              value={password} 
              onChange={ev => setPassword(ev.target.value)}/>
              <button className="bg-[#1E3A8A] p-2 w-full text-white rounded-2xl">Login</button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account? <Link className="underline text-black" to={'/register'}>Register here</Link>
              </div>
              </form>
            </div>  
            
        </div>
    )
}