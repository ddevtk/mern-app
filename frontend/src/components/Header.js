import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Navbar
        className='navbar navbar-expand-lg navbar-dark bg-primary'
        expand='lg'
      >
        <Container>
          <Link to='/'>
            <Navbar.Brand>ddevtk Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Form className='d-flex'>
              <FormControl
                style={{ borderRadius: '2px' }}
                type='search'
                placeholder='Search product...'
                className='mr-2'
                aria-label='Search'
              />
            </Form>
            <Nav
              className='mr-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
            >
              <Link to='/cart' style={{ textDecoration: 'none' }}>
                <Nav.Link>
                  <MdShoppingCart style={{ margin: '-3px 3px 0 0' }} />
                  Cart
                </Nav.Link>
              </Link>
              <Link to='/singin' style={{ textDecoration: 'none' }}>
                <Nav.Link>Sign in</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
