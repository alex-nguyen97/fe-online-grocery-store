import { React, useState } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import PersonalAvatar from './personal-avatar';
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from './search-bar';
import { useDispatch } from 'react-redux';
import { setShoppingCartToggle } from '../storeSlice';

const MenuBar = () => {
  const [cart, setCart] = useState([1, 2, 3, 4, 5]);
  const [hover, setHover] = useState(false);

  const cartIconStyle = {
    marginLeft: "8px",
    transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
  };

  const cartIconHoverStyle = {
    color: "darkgreen",
  };

  const dispatch = useDispatch();
  const handleOpenShoppingCart = () => {
    dispatch(setShoppingCartToggle(true));
  }
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow" style={{ paddingTop: '12px' }}>
      <Container fluid style={{ maxWidth: "100%", paddingLeft: "20px", paddingRight: "20px" }}>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Navbar.Brand href="#" style={{ fontSize: '20px' }}>
            My Website
          </Navbar.Brand>
          <SearchBar />
          <div className="d-flex align-items-center">
            <Nav className="d-flex">
              <Nav.Link href="#" active>Shop</Nav.Link>
              <Nav.Link href="#">Login</Nav.Link>
              <div className="position-relative d-flex align-items-center" style={{ cursor: "pointer" }} onClick={handleOpenShoppingCart}>
                <FaShoppingCart size={24} className="ms-2" style={hover ? { ...cartIconStyle, ...cartIconHoverStyle } : cartIconStyle}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)} />
                {cart.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cart.length}
                  </Badge>
                )}
              </div>

            </Nav>
            <PersonalAvatar />
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default MenuBar;