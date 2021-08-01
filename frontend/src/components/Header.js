import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { MdShoppingCart } from 'react-icons/md';

const Header = () => {
  return (
    <header>
      <Navbar
        className='navbar navbar-expand-lg navbar-dark bg-primary'
        expand='lg'
      >
        <Container>
          <Navbar.Brand href='/'>ddevtk Shop</Navbar.Brand>
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
              <Nav.Link href='/cart'>
                <MdShoppingCart style={{ margin: '-3px 3px 0 0' }} />
                Cart
              </Nav.Link>
              <Nav.Link href='/signin'>Sign in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
