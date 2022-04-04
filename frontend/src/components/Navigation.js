import React, { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosConfig from '../api/AxiosConfig';
import UserContext from '../context/UserContext';

const navBrand = {
  color: 'white',
  textTransform: 'uppercase',
  fontSize: '2rem',
  letterSpacing: '2px'
}

const navLinks = {
  textDecoration: 'none',
  color: 'white',
  margin: '20px 20px',
  fontSize: '1.5rem',
}

const Navigation = () => {

  const { user } = useContext(UserContext);
  const logOut = async () => {
    try {
      const response = await AxiosConfig.post('/api/auth/logout')
      if (response && response.status === 204) {
        localStorage.clear();
        setTimeout(window.location.reload(), 1500);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand style={navBrand}>SATELLITE-APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link style={navLinks} to="/satellites" >
              Moje Satelity
            </Link>
            <Link style={navLinks} to="/addsatellite" >
              Dodaj satelitę
            </Link>
          </Nav>
          <Nav style={navLinks}>
            <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Nav.Link as={Link} to={"/profile"}>
                  Profil
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to="/" onClick={logOut}>
                  Wyloguj
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation