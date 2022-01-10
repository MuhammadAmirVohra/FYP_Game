import React from "react";
import Header from "../Common Components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import Timer from "./Timer";

const Beginner = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/questions").then((Response) => {
            console.log(Response.data.questions);
            setQuestions(Response.data.questions);
        });
    }, []);


    return (
        <>
            <Header />
            <Timer initialMinute={2} initialSeconds={59} />
            {questions.map((q, idx) => {

                return (
                    <h1 key={idx}>{q}</h1>

                )


            })
            }
        </>
    )
};

export default Beginner;
