import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Typdefinition för en kurs
type Course = {
    id: string;
    name: string;
    description: string;
};

const CourseList = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>("");

    const handleDelete = async (courseId: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/courses/${courseId}`, {
                withCredentials: true,
            });
            setError(`Kurs med ID ${courseId} har raderats.`);
            setCourses((prev) => prev.filter((course) => course.id !== courseId));
        } catch (error) {
            console.error("Fel vid borttagning", error);
            setError("Kunde inte radera kursen. Kontrollera ID:t.");
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get<Course[]>("http://localhost:8080/api/courses", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setCourses(response.data);
        } catch (error) {
            setError("Kunde inte hämta kurserna.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Registrerade kurser</h2>
            {error && <p style={{ color: "green" }}>{error}</p>}
            <div>
                {courses.length === 0 ? (
                    <p>Inga kurser registrerade.</p>
                ) : (
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id} style={{ marginBottom: "10px" }}>
                                <h3>{course.name}</h3>
                                <p>{course.description}</p>
                                <p>
                                    A link with reference from:{" "}
                                    <a href="https://www.w3schools.com/css/css_examples.asp" target="_blank" rel="noopener noreferrer">
                                        W3Schools.com
                                    </a>
                                </p>
                                <button onClick={() => handleDelete(course.id)}>Ta bort kurs</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ul>
                <li>
                    <Link to="/Dashboard">Tillbaka till Dashboard</Link>
                </li>
                <li>
                    <Link to="/RegisterCourse">Registrera kurser</Link>
                </li>
            </ul>
        </div>
    );
};

export default CourseList;
