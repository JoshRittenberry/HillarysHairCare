import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

function App() {
  return (
    <>
      <Navbar color="info" expand="md">
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Hair Sallon</NavbarBrand>
          <NavItem>
            <NavLink href="/appointments">Book Us</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
