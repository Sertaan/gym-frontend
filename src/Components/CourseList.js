import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

interface Course {
    id: number;
    name: string;
    description: string;
}

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>("");

    const handleDelete = async (courseId:number) => {

        console.log(courseId)

        try {
            await axios.delete(`http://localhost:8080/api/courses/${courseId}`, {
                withCredentials: true,
            });

            setError(`Kurs med ID ${courseId} har raderats.`);
        } catch (error) {
            console.error("Fel vid borttagning", error);
            setError("Kunde inte radera kursen. Kontrollera ID:t.");
        }
    };


    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/courses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}` // spara token i localStorage eller sessionStorage innan
                }
            });
            setCourses(response.data);
        } catch (error) {
            setError("Kunde inte hämta kurserna.");
            console.error(error);
        }
    };

    useEffect(() => {

        fetchCourses();
    }, []); // tom array betyyder att useEffect körs en gång näär komponenten laddas

    return (
        <div style={{textAlign: "center", marginTop: "2rem"}}>
            <h2>Registrerade kurser</h2>
            {error && <p style={{color: "green"}}>{error}</p>}
            <div>
                {courses.length === 0 ? (
                    <p>Inga kurser registrerade.</p>
                ) : (
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id} style={{marginBottom: "10px"}}>
                                <h3>{course.name}</h3>
                                <p>{course.description}</p>
                                <p>A link with reference from:
                                    <a href="https://www.w3schools.com/css/css_examples.asp">W3Schools.com</a>
                                </p>

                                <button onClick={() => handleDelete(course.id)}>
                                    ta bort kurs
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <li>
                <Link
                    to={"/Dashboard"}
                >
                    Tillbaka till Dashboard
                </Link>
            </li>
            <li>
                <Link
                    to={"/RegisterCourse"}
                >
                    Registrera kurser
                </Link>
            </li>


        </div>

    );
};

export default CourseList;
