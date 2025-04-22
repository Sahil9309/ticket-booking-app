import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/api/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-8 mx-16">
        {bookings?.length > 0 && bookings.map(booking => (
          booking.place ? ( // Check if booking.place exists
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex cursor-pointer gap-4 bg-gray-300 shadow-black p-4 rounded-2xl mb-4"
            >
              <div className="flex w-40 h-40 bg-gray-300 rounded-2xl">
                <PlaceImg place={booking.place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold">{booking.place.title}</h2>
                <div className="text-lg mt-2 text-gray-500">
                  <BookingDates booking={booking} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-lg font-semibold">
                    Total price: ₹{booking.price}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div key={booking._id} className="text-red-500">
              Booking data is incomplete.
            </div>
          )
        ))}
      </div>
    </div>
  );
}