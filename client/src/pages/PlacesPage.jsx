import { useState } from "react";
import { Link,useParams} from "react-router-dom";
import Perks from "../Perks";
import axios from 'axios' ;

export default function PlacesPage() {
    const {action} = useParams();
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [addedPhotos,setAddedPhotos] = useState([])
    const [photoLink,setPhotoLink] = useState('')
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([])
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIin,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [maxPeople,setMaxPeople] = useState(1)

    function inputHeader (text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/api/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => [...prev, filename]);
        setPhotoLink('');
    }

    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-[#1E3A8A] text-white rounded-full py-2 px-6" 
                to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                add new place
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title','add title for your place')}
                        <input type="text" 
                        value={title} onChange={ev => setTitle(ev.target.value)}
                        placeholder="e.g. Cozy Coastal Cottage Steps from the Sand"
                        className="w-full border my-1 py-2 px-3 rounded-2xl" />
                        {preInput('Address','add address of your place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} 
                        placeholder="address" 
                        className="w-full border my-1 py-2 px-3 rounded-2xl" />  
                        {preInput('Photos','add photos of the place')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
                            placeholder="add using a link" 
                            className="w-full border my-1 py-2 px-3 rounded-2xl"/>
                            <button 
                            className="bg-gray-200 px-4 rounded-2xl"
                            onClick={addPhotoByLink}
                            >Add&nbsp;photo</button>
                        </div>
                        {addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div key={link}>
                                {link}
                            </div>
                        ))}
                        <div className="mt-2 flex gap-2">
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                             Upload
                            </button>
                        </div>
                        {preInput('Description','add description of the place')}
                            <textarea
                            value={description} onChange={ev => setDescription(ev.target.value)} 
                            className="w-full border my-1 py-2 rounded-2xl" placeholder="add description of the place"/>
                        {preInput('Perks','select perks of your place')}
                            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                                <Perks selected={perks} onChange={setPerks}/>
                            </div>
                            {preInput('Extra info','add rules to be followed at your place')}
                            <textarea
                            value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} 
                            className="w-full border my-1 py-2 rounded-2xl" placeholder="add description of the place"/>
                            {preInput('Chek in&out','max people')}
                            <div className="grid gap-2 sm:grid-cols-3">
                                <div>
                                    <h3 className="mt-2 -mb-1">Check in time</h3>
                                    <input type="text" 
                                    value={checkIin} onChange={ev => setCheckIn(ev.target.value)}
                                    className="border p-1 rounded-xl" placeholder="12:00 pm" />
                                </div>
                                <div>
                                    <h3>Check out time</h3>
                                    <input type="text" 
                                    value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                                    className="border p-1 rounded-xl" placeholder="12.00pm" />
                                </div>
                                <div>
                                    <h3>max people</h3>
                                    <input type="number" 
                                    value={maxPeople} onChange={ev => setMaxPeople(ev.target.value)}
                                    className="border p-1 rounded-xl" placeholder="0"/>
                                </div>
                            </div>
                            <button className="bg-[#1E3A8A] p-2 my-4 w-xl justify-center text-white rounded-2xl flex items-center mx-auto"
                            >Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}