import React from 'react';

import { Container, Button } from 'react-bootstrap';
import Header from '../Common Components/Navbar';
import styled from 'styled-components';


const Main = () => {
    return (
        <>
            {/* <h1>WELCOME</h1> */}
            <Header />
            <Container>

                <a href='/beginner/2'><Btn variant='danger' className='mb-3' > BEGINNERS LEVEL </Btn></a><br />
                <Btn variant='warning' className='mb-3'> INTERMEDIATE LEVEL </Btn><br />
                <Btn variant='success' className='mb-3'> ADVANCED LEVEL </Btn>

            </Container>
        </>
    )
};

export default Main;


const Btn = styled(Button)`

margin-bottom:10px;
`;
