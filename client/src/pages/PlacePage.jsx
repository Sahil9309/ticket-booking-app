import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function PlacePage () {
    const {id} = useParams ;
    const [place,setPlace] = useState(null) ;
    const [showAllPhotos,setshowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/api/places/${id}`).then(response => {
            setPlace(response.data);
        });
    },[id])

    if(!place) return '';

    if(showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-w-full m-h-screen bg-white text-blck">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button onClick={() => setshowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <                        path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                            Close photos
                            </button>
                    </div>
                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img src={'http://localhost:8000/uploads/'+photo} alt="" />
                    </div>
                ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {place.address}
            </a>
            <div className="relative]">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:8000/uploads/'+place.photos[0]} alt="" />
                        </div>     
                    )}
                </div>
                <div className="grid">
                {place.photos?.[1] && (
                    <div>
                        <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover relative top-2 cursor-pointer" src={'http://localhost:8000/uploads/'+place.photos[1]} alt="" />
                    </div>
                    )}
                    <div className="overflow-hidden">
                {place.photos?.[2] && (
                        <img onClick={() => setshowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:8000/uploads/'+place.photos[2]} alt="" />
                    )}  
                    </div>  
                </div>
            </div>
            <button onClick={() => setshowAllPhotos(true)}  
            className="flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounde-2xl shadow shadow-md shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
                Show more photos
            </button>
            </div>           
            <div className="mt-8 mb-8 grid gap-8 grid-clos-1 md:grid-cols-[2fr_1fr]">
                <div>
                  <div className="my-4">
                  <h2 className="font-semibold text-2xl ">Description</h2>
                    {place.description}
                </div> 
                Check-in: {place.checkIn}<br/>
                Check-out: {place.checkOut}<br/>
                Max number of people{place.maxPeople}<br/>               
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>           
            </div>
        </div>
    );
}