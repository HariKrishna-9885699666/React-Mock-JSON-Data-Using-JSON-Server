import React from "react";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { Navbar, Button, Badge, Nav } from "react-bootstrap";

const Navigationbar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          <HouseFill />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content">
        <Nav>
          <Nav.Link href="/">Mock JSON Data using JSON SERVER</Nav.Link>
        </Nav>
        <Navbar.Text className="ml-auto">
          <Link to="/myOrders" className="btn">
            <Button variant="success">My Orders</Button>
          </Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
