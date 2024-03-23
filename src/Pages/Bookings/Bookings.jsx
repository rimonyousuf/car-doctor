import { useEffect, useState } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
import Booking from "./Booking";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Bookings = () => {

    // const { user } = useContext(AuthContext);
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    // const url = `https://car-doctor-server-ten-iota.vercel.app/bookings?email=${user?.email}`;
    const url = `/bookings?email=${user?.email}`
    useEffect(() => {
        // axios.get(url,{withCredentials: true})
        axiosSecure.get(url)
            .then(res => setBookings(res.data))
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [axiosSecure, url]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://car-doctor-server-ten-iota.vercel.app/bookings/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Successfully deleted",
                                    icon: "success"
                                });
                                const remaining = bookings.filter(booking => booking._id !== id)
                                setBookings(remaining);
                            }
                        })
                }
            });
    }

    const handleConfirmButton = id => {
        fetch(`https://car-doctor-server-ten-iota.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }

    return (
        <div>
            <h2>Total Booking: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <Booking
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleConfirmButton={handleConfirmButton}
                            ></Booking>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;