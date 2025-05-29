import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return ( 
    <div className="py-8 py-4 flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Outlet />
    </div>
  );
}