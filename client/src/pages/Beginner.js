import React from "react";
import Header from "../Common Components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
// import Timer from "./Timer";
const Beginner = () => {
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/questions").then((Response) => {
            setQuestions(Response.data.questions);
        });
    }, []);
    return (
        <>
            <Header />
            {questions.map((q) => {

                return (<h1>{q}</h1>)


            })
            }
        </>
    )
};

export default Beginner;
