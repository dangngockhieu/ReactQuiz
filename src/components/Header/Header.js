import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavDropDown from 'react-bootstrap/NavDropdown';
const Header = () => {
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  
  const navigate = useNavigate();
  const handleShowLogin =()=>{
    navigate('/login');
  }
  const handleShowSignUp = () => {
    navigate('/signup');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: "2rem", fontWeight: 600 }}>Typeform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" style={{ fontSize: "1.5rem", fontWeight: 600}}>Home</NavLink>
            <NavLink to="/users" className="nav-link" style={{ fontSize: "1.5rem", fontWeight: 600}}>User</NavLink>
            <NavLink to="/admins" className="nav-link" style={{ fontSize: "1.5rem", fontWeight: 600}}>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ===false ?
              <>
               <button className='btn-login' style={{background: "#ccc"}} onClick={()=>handleShowLogin()}>Log in</button>
              <button className='btn-signup' onClick={()=>handleShowSignUp()}>Sign up</button>
              </>
            :
            <NavDropDown style={{ fontSize: "1.5rem", fontWeight: 600, color:"black"}} title="Setting" id="basic-nav-dropdown">
              <NavDropDown.Item>Logout</NavDropDown.Item>
              <NavDropDown.Item>Profile</NavDropDown.Item>
            </NavDropDown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;