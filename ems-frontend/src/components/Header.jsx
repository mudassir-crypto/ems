import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar variant="dark" bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary text-white">
      <Container>
        <Link to="/" className='text-decoration-none'><Navbar.Brand>EMS</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link to="/employees" className='text-decoration-none text-white text-center pt-2'>
              Home
            </Link> */}
            
          </Nav>
          <div className='d-flex'>
            <Link to="/departments" className='text-decoration-none text-white'>
              Department
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header