import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>
                Välkommen till Dashboard
            </h1>
            <li>
                <Link
                    to={"/RegisterCourse.tsx"}
                >
                    Registrera ny kurs
                </Link>
            </li>
            <li>
                <Link
                    to={"/CourseList.tsx"}
                >
                    Visa alla kurser
                </Link>
            </li>
            <li>
                <Link
                    to="/?logout=true"
                >
                    Logga ut
                </Link>
            </li>

        </div>
    );
};

export default Dashboard;
