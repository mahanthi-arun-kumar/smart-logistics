import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import Logo from "../../img/SL-Logo-Vertical.png";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  cursor:pointer;

  .logo {
    padding: 15px 0;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        <img src={Logo} style={{height: "4rem", marginTop: "-1.2rem", marginLeft: "2rem"}}/>
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar
