import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookGymClass from "./Components/BookGymClass";
import BookingList from "./Components/CourseList";
import Login from "./Components/Login";

function App() {
    const [username, setUsername] = useState(null);

    const handleLogin = (username) => {
        setUsername(username);
    };

    const handleLogout = () => {
        setUsername(null);
        // här kan du också göra fetch mot backend för att logga ut sessionen om du har sådan
    };

    if (!username) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Router>
            <div>
                <button onClick={handleLogout}>Logga ut</button>
                <Routes>
                    <Route path="/" element={<BookGymClass username={username} />} />
                    <Route path="/bookinglist" element={<BookingList username={username} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
