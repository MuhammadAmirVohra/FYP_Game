import React from "react";
import Header from "../Common Components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container, Form } from "react-bootstrap";
import styled from 'styled-components';
import { useStopwatch } from 'react-timer-hook';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';


const Beginner = () => {
    const { id } = useParams();
    const history = useHistory();
    const [questions, setQuestions] = useState([]);
    const [images, setImages] = useState([]);
    // const [max, setMax] = useState(10)
    var max = 10;
    const min = 0
    const [scores, setscores] = useState(0);
    const [rand, setRandom] = useState(0);
    const [count, setcount] = useState(0);
    const [token, settoken]= useState(false);
    const [answers, setAnswers] = useState([]);
    const [textvalue, settextvalue] = useState("");
    const [incorrect, setIncorrect] = useState(0);
    const [randomnumber, setrn] = useState([0]);
    // const [module, setmodule] = useState(0);
    const [ans, setans] = useState("")


    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const {
        seconds,
        minutes,
        pause,
    } = useStopwatch({ autoStart: true });


    const shuffleWord = (word) => {
        if (word.length < 4) return word;
        const first = word.slice(0, 1);
        const middle = word.slice(1, -1);
        const last = word.slice(-1);
        const shuffled = middle
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("");
        return first + shuffled + last;
    };

    const processSentence = (sentence) => {
        return sentence
            .split(/("[^"]+"|[^"\s]+)/g)
            .map(shuffleWord)
            .join("");
    }


    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }


    const checkanswer = (user_ans) => {

        settextvalue("");

        if (user_ans == answers[rand]) {
            setscores(scores + 1);
            if (count <= max) {

                var temp = Math.floor(min + (Math.random() * (max - min)));;
                
                // if (!token)
                // while (randomnumber.includes(temp))
                //     temp = Math.floor(min + (Math.random() * (max - min)));

                setrn([...randomnumber, temp]);

                setRandom(temp);
                setcount(count + 1);
                if (answers[temp].includes(' '))
                    setans(processSentence(answers[temp]))

                else if (answers[temp] && answers[temp].length > 1) {
                
                    setans(shuffleWord(answers[temp]))
                }
                else
                    setans("")

            }
            else {
                settoken(true);
            }
        } else {
            setIncorrect(incorrect + 1);
        }


    }


    useEffect(() => {

        axios.get("http://localhost:5000/api/" + id + "/questions").then((Response) => {
            // console.log(Response.data.questions);
            setQuestions(Response.data.questions);
            setImages(Response.data.images);
            // setMax(Response.data.questions.length);
            // setmodule(2);
            setAnswers(Response.data.answers);
            if (answers[rand] && answers[rand].length > 1) {

                if (answers[rand].includes(' '))
                    setans(processSentence(answers[rand]))

                else
                    setans(shuffleWord(answers[rand]))
            }
            else
                setans("")
            // setRandom(Math.floor(min + (Math.random() * (max-min))))
        });


    }, []);


    function SubmitResults() {
        axios.post("http://localhost:5000/api/save_answers", {

            minutes: minutes,
            seconds: seconds,
            scores: scores,
            penalty: incorrect,
            moduleId: id

        }).then((res) => {

            console.log("saved");
            if (id < 8) {
                history.push('/beginner/' + (parseInt(id) + 1));
                window.location.reload(false);
            }
            else
                history.push('/intermediate/' + (parseInt(id) + 1));


        })

    }


    return (
        <>
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <Header />

            <Container>
                <CardStyle border='dark' className="float-left text-left">
                    <CardTitle >
                        <CardText> Timer : {minutes}:{seconds}</CardText>

                    </CardTitle>
                    <CardBody>
                        <h2><span style={{ marginRight: '30px' }}>Scores : {scores}</span><span>Penalties : {incorrect}</span></h2>

                    </CardBody>
                </CardStyle>

                {!token ?
                    
                    (
                        <>
                        <h1>Question No. {count+1}</h1>
                        <h1 >{questions[rand]}</h1>
                
                    <div>
                    {
                        images[rand] ?
                            (<><img src={"/images/" + images[rand]} alt=" "></img><br /></>)
                            : null
                    }
                    </div>

                    <div style={{ height: 150 + 'px', marginTop: '20px' }}>
                    {
                        images[rand] === "insert_tab.jpeg" ?

                            [...range(1, 11)].map((value) => {
                                return (
                                    <Button className="btn-lg" style={{ marginRight: '3px' }} onClick={() => checkanswer(value)}>{value}</Button>
                                )
                            })

                            : images[rand] === "home_tab.jpg" ?

                                [...range(1, 25)].map((value) => {
                                    return (
                                        <Button style={{ marginRight: '3px' }} onClick={() => checkanswer(value)}>{value}</Button>
                                    )
                                })
                                : images[rand] === "ribbon.png" ?

                                    [...range(1, 3)].map((value) => {
                                        return (
                                            <Button className="btn-lg" style={{ marginRight: '10px' }} onClick={() => checkanswer(value)}>{value}</Button>
                                        )
                                    }) :
                                    (<>
                                        <h4> Hint: {ans}</h4>
                                        <Form onSubmit={(e)=>{e.preventDefault()}}>
                                            <Form.Control type="text" value={textvalue} onChange={(e) => settextvalue(e.target.value)} placeholder="Your Answer" />
                                        </Form>
                                        <Btn onClick={() => { checkanswer(textvalue); }}  >Submit Answer</Btn>

                                    </>)

                    }

                
                    {/* <Btn onClick={() => {
                        if (count !== max) {
                            setRandom(Math.floor(min + (Math.random() * (max - min))));
                            setCount(count + 1);
                        }
                        else { setToken(true) }
                    }} disabled={token}>Submit</Btn> */}
                    <br />
                </div>
            </>
            ) : null

}
                <div style={{ height: 80 + 'px' }}>
                    <Btn variant="success" disabled={!token} onClick={() => { pause(); SubmitResults(); }}>Finish Test</Btn>
                </div>
            </Container>

        </>
    )
};

export default Beginner;
const Btn = styled(Button)`
float:right;
margin-right: 3px;
// margin-bottom:20px;
`;
const CardStyle = styled(Card)`
background: white;
box-shadow: 6px 5px 5px rgb(0 0 0 );
    width: 400px;
    // height: 350px;
   border: 2px solid black;
  padding:20px;
`;