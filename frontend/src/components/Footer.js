import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className='text-center py-3'>
          <Col>
            Copyright &copy;{' '}
            <a
              target='_blank'
              href='http://github.com/ddevtk/mern-app'
              className='product-title'
              rel='noreferrer'
            >
              ddevtk
            </a>
            Shop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
