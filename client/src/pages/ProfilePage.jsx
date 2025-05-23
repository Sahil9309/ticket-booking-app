import {useContext, useState} from "react";
import {UserContext} from "../UserContext.js";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/api/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <AccountNav />
      </div>
      {subpage === 'profile' && (
        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-gray-200 shadow-lg rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-8">
            </div>
            <div className="space-y-2">
              <div className="flex items-center border-b pb-2">
                <span className="font-bold w-23">User Name:</span>
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center border-b pb-2">
                <span className="font-bold w-12">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center pb-2">
                <span className="font-bold w-26">Logged in as:</span>
                <span className="text-gray-900">{user.name} ({user.email})</span>
              </div>
            </div>
            <button 
              onClick={logout} 
              className="bg-[#1E3A8A] hover:bg-[#152a61] transition-colors p-2.5 w-full text-white rounded-xl cursor-pointer mt-8 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}