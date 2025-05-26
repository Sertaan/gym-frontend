import React, {useState, useEffect} from 'react';

function BookingList({username}) {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/bookings?username=${username}`)
            .then((res) => {
                if (!res.ok) throw new Error('Kunde inte hämta bokningar');
                return res.json();
            })
            .then((data) => setBookings(data))
            .catch((err) => setError(err.message));
    }, [username]);

    const cancelBooking = (id) => {
        fetch(`http://localhost:8080/api/bookings/${id}`, {method: 'DELETE'})
            .then((res) => {
                if (!res.ok) throw new Error('Kunde inte avboka');
                setBookings(bookings.filter((b) => b.id !== id));
            })
            .catch((err) => alert(err.message));
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Dina bokningar</h2>
            {bookings.length === 0 ? (
                <p>Inga bokningar.</p>
            ) : (
                <ul>
                    {bookings.map((b) => (
                        <li key={b.id}>
                            {b.gymClass?.name} - {new Date(b.gymClass?.dateTime).toLocaleString()}
                            <button onClick={() => cancelBooking(b.id)}>Avboka</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookingList;
