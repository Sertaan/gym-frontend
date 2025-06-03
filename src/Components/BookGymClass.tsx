import React, { useState } from 'react';

type GymClass = {
    id: string;
    name: string;
};

type BookGymClassProps = {
    gymClass?: GymClass;
    username: string;
};

const BookGymClass: React.FC<BookGymClassProps> = ({ gymClass, username }) => {
    const [message, setMessage] = useState<string>("");

    if (!gymClass) return <p>Inga tillgängliga klasser just nu.</p>;

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
};

export default BookGymClass;
