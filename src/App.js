import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookGymClass from "./Components/BookGymClass";
import BookingList from "./Components/BookingList";


    function App() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<BookGymClass />} />
                    <Route path="/bookinglist" element={<BookingList />} />
                </Routes>
            </Router>
        );
    }


export default App;
