import React, { useState } from 'react';

function BookGymClass({ gymClass, username }) {
    const [message, setMessage] = useState('');

    const bookClass = () => {
        fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                gymClass: { id: gymClass.id },
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text);
                    });
                }
                return res.text();
            })
            .then((data) => setMessage(data))
            .catch((err) => setMessage(err.message));
    };

    return (
        <div>
            <button onClick={bookClass}>Boka {gymClass.name}</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default BookGymClass;
