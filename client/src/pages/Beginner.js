import React from "react";
import Header from "../Common Components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
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
            <table>
                {questions.forEach((question) => {
                    <>
                        <h1>question</h1><br />
                    </>
                })
                }
            </table>
        </>
    )
};

export default Beginner;
