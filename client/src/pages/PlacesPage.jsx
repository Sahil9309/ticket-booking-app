import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/api/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);

    return (
        <div>
            <AccountNav/>
                <div className="text-center"> 
                    <Link className="inline-flex gap-1 bg-[#1E3A8A] text-white rounded-full py-2 px-6"
                        to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
                <div className="mt-4">
    {places.length > 0 && places.map(place => (
        <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4">
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                    <img className="object-cover" src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="" />
                )}
            </div>
            <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
            </div>
        </Link>
    ))}
</div>
        </div>
    );
}