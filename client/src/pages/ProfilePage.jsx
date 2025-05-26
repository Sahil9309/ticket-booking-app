import { useContext, useState } from "react";
import { UserContext } from "../UserContext.js";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { LogOut, User, Mail } from "lucide-react";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/api/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div className="text-center mt-12 text-gray-600 text-lg">Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mb-8">
        <AccountNav />
      </div>

      {subpage === "profile" && (
        <div className="max-w-2xl mx-auto mt-8 bg-gray-200 shadow-xl rounded-3xl p-10 border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
            Profile Overview
          </h2>

          <div className="space-y-6 text-gray-800">
            <div className="flex items-center gap-4 border-b pb-3">
              <User className="text-blue-800" />
              <div>
                <div className="text-sm text-gray-500">User Name</div>
                <div className="text-lg font-medium">{user.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b pb-3">
              <Mail className="text-blue-800" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-lg font-medium">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <User className="text-blue-800" />
              <div>
                <div className="text-sm text-gray-500">Logged in as</div>
                <div className="text-lg font-medium">{user.name} ({user.email})</div>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 mt-10 bg-blue-800 hover:bg-blue-900 transition-colors w-full py-3 cursor-pointer text-white rounded-xl font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
