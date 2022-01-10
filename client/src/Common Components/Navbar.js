
import React from "react";
import styled from 'styled-components';
import { Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Nav className="fixed-top" >
                <Navbar.Brand href=''>

                </Navbar.Brand>
                <h2 className="d-inline-block ml-3 mt-2 " style={{ fontSize: 40 }}>WELCOME</h2>

            </Nav>
        </>
    )
}
export default Header;


const Nav = styled(Navbar)`

background: #1F386B;
color:white;
`;