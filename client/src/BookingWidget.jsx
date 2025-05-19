import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";


export default function BookingWidget({place}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfPeople,setNumberOfPeople] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Always clamp numberOfPeople to allowed range for display and backend
  let numberOfPeopleDisplay = Math.max(1, Math.min(Number(numberOfPeople), place.maxPeople));
  const peopleLabel = numberOfPeopleDisplay === 1 ? "person" : "persons";

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post('/api/bookings', {
        checkIn,
        checkOut,
        numberOfPeople: numberOfPeopleDisplay, // <-- this must be present and correct
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price * numberOfPeopleDisplay,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking the place:", error);
      alert("Failed to book the place. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl mt-4">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="font-bold">Check in:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label className="font-bold">Check out:</label>
            <input type="date" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="font-bold rounded-2xl">Number of persons: </label>
          <input
            type="number"
            min={1}
            max={place.maxPeople}
            value={numberOfPeople}
            onChange={ev => setNumberOfPeople(ev.target.value)}
          />
          {/* Show the display value for clarity */}
          <span className="ml-2 text-gray-500">
            ({numberOfPeopleDisplay} {peopleLabel})
          </span>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className="font-bold">Your full name: </label>
            <input type="text"
                   value={name || ''}
                   onChange={ev => setName(ev.target.value)}/>
            <div className="mt-2">
              <label className="font-bold">Phone number: </label>
              <input type="text"
                     value={phone || ''}
                     onChange={ev => setPhone(ev.target.value)}/>
            </div>
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="bg-[#1E3A8A] p-2 w-full text-white rounded-2xl cursor-pointer mt-4 font-bold">
        Book this place
        {numberOfNights > 0 && (
          <span> ₹{numberOfNights * place.price * numberOfPeople}</span>
        )}
      </button>
    </div>
  );
}