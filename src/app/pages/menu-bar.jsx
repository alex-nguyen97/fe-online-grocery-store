import { React, useState } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import PersonalAvatar from './personal-avatar';
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from './search-bar';

const MenuBar = () => {
  const [cart, setCart] = useState([1, 2, 3, 4, 5]);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow" style={{ paddingTop: '12px' }}>
      <Container>
        <Navbar.Brand href="#">My Website</Navbar.Brand>
        <SearchBar />
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link href="#" active>Shop</Nav.Link>
            <Nav.Link href="#">Login</Nav.Link>
            <Nav.Link href="#cart" className="position-relative">
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>
            <PersonalAvatar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;