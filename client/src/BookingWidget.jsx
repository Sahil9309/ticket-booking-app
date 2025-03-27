export default function BookingWidget({place}) {
    return(
        <div className="bg-white shadow shadow  p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ₹{place.price} / per night                     
                </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                            <label>Check in:</label>
                            <input type="date"/>
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check out:</label>
                            <input type="date"/>
                        </div>
                        </div> 
                        <div>
                        <div className="py-3 px-4 border-t">
                        <label>Number of People:</label>
                        <input type="number value={1}"/>
                    </div>
                </div>                       
            </div>
            <button className="bg-[#1E3A8A] p-2 w-full text-white rounded-2xl cursor-pointer mt-4"></button>
        </div>
    );
}