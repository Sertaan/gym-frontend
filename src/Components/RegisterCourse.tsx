import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// Typdefinition för formulärdata
type CourseFormValues = {
    name: string;
    description: string;
    deleteId?: string;
};

const RegisterCourse: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<CourseFormValues>();

    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
        setSuccess("");

        try {
            await axios.post("http://localhost:8080/api/courses", data, {
                withCredentials: true,
            });
            setSuccess("Kurs registrerad!");
            reset(); // Rensa formuläret
        } catch (error) {
            console.error("Fel vid registrering", error);
        }
    };

    return (
        <div style={{textAlign: "center", marginTop: "2rem"}}>
            <h2>Registrera en ny kurs</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <input
                    type="text"
                    placeholder="Kursnamn"
                    {...register("name", {required: "Kursnamn är obligatoriskt"})}
                    style={{width: "50%", padding: "8px"}}
                />
                {errors.name && <p style={{color: "red"}}>{errors.name.message}</p>}

                <textarea
                    placeholder="Beskrivning"
                    {...register("description", {
                        required: "Beskrivning är obligatorisk",
                        minLength: {value: 5, message: "Minst 5 tecken krävs"},
                    })}
                    style={{width: "55%", padding: "8px"}}
                />
                {errors.description && (
                    <p style={{color: "red"}}>{errors.description.message}</p>
                )}

                <button
                    type="submit"
                    style={{padding: "10px 15px", marginTop: "10px"}}
                >
                    Registrera kurs
                </button>
            </form>

            <button onClick={() => navigate("/courses")}>Visa alla kurser</button>
            <button onClick={() => navigate("/dashboard")}>
                Tillbaka till Dashboard
            </button>

            {success && <p style={{color: "green"}}>{success}</p>}
        </div>
    );
};

export default RegisterCourse;
