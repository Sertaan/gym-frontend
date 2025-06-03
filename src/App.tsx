import {Routes, Route} from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import CourseList from "./Components/CourseList";
import RegisterCourse from "./Components/RegisterCourse";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/Courses" element={<CourseList/>}/>
            <Route path="/RegisterCourse" element={<RegisterCourse/>}/>
        </Routes>
    );
}

export default App;
