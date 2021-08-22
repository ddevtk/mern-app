import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  NavDropdown,
} from 'react-bootstrap';
import { MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../redux/actions/user.action';

const Header = () => {
  const { user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className='navbar navbar-expand-lg navbar-dark bg-primary'
        expand='lg'
      >
        <Container>
          <a href='/'>
            <Navbar.Brand>ddevtk Shop</Navbar.Brand>
          </a>
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
              style={{ maxHeight: '100px', alignItems: 'center' }}
            >
              <Link
                to='/cart'
                style={{
                  marginRight: '10px',
                  color: 'rgb(255 255 255 / 55%)',
                  textDecoration: 'none',
                }}
                className='cart-title'
              >
                <MdShoppingCart style={{ margin: '-3px 3px 0 0' }} />
                Cart
              </Link>
              {user.name ? (
                <NavDropdown title={user.name}>
                  <NavDropdown.Item>
                    <Link className='product-title' to='/profile'>
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className='product-title' to='/order'>
                      My Order
                    </Link>
                  </NavDropdown.Item>

                  {user.name && user.isAdmin && (
                    <>
                      <NavDropdown.Item>
                        <Link className='product-title' to='/admin/user-list'>
                          All User
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          className='product-title'
                          to='/product/product-list'
                        >
                          All Product
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link className='product-title' to='/order/order-list'>
                          All Order
                        </Link>
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    <Link className='product-title'>Logout</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link
                  to='/login'
                  className='cart-title'
                  style={{
                    textDecoration: 'none',
                    color: 'rgb(255 255 255 / 55%)',
                  }}
                >
                  Sign in
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
