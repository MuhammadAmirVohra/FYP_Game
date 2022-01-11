
import React from "react";
import styled from 'styled-components';
import { Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <Nav className="fixed-top" >
                <Navbar.Brand href=''>

                </Navbar.Brand>
                <a href="/" style={{textDecoration: 'none', pointerEvents: 'none', color: 'white'}}><h2 className="d-inline-block ml-3 mt-2 " style={{ fontSize: 40 }}>WELCOME</h2></a>

            </Nav>
        </>
    )
}
export default Header;


const Nav = styled(Navbar)`

background: #1F386B;
color:white;
`;